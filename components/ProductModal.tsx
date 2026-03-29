"use client";
import { useState, useEffect, useRef } from "react";
import { Product } from "@/lib/api";
import Modal from "@/components/ui/Modal";

const CATEGORIES = ["Electronics", "Clothing", "Home", "Sports", "Books"];
const INPUT = "w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]";

type Props = { product: Product | null; onSave: (data: Partial<Product>) => void; onClose: () => void };
type FormData = { name: string; description: string; price: string; category: string; imageFile: File | null; imagePreview: string; stock: string; rating: string };
type Errors = Partial<Record<string, string>>;

// Defined outside component — prevents remount on every keystroke
function Field({ label, name, type = "text", textarea = false, value, error, onChange }: {
  label: string; name: string; type?: string; textarea?: boolean;
  value: string; error?: string; onChange: (name: string, val: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={(e) => onChange(name, e.target.value)} rows={3} className={`${INPUT} resize-none ${error ? "border-red-400" : "border-slate-200"}`} />
      ) : (
        <input type={type} value={value} onChange={(e) => onChange(name, e.target.value)} className={`${INPUT} ${error ? "border-red-400" : "border-slate-200"}`} />
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default function ProductModal({ product, onSave, onClose }: Props) {
  const [form, setForm] = useState<FormData>({ name: "", description: "", price: "", category: "Electronics", imageFile: null, imagePreview: "", stock: "", rating: "0" });
  const [errors, setErrors] = useState<Errors>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (product) {
      setForm({ name: product.name, description: product.description, price: String(product.price), category: product.category, imageFile: null, imagePreview: product.image, stock: String(product.stock), rating: String(product.rating) });
    } else {
      setForm({ name: "", description: "", price: "", category: "Electronics", imageFile: null, imagePreview: "", stock: "", rating: "0" });
    }
    setErrors({});
  }, [product]);

  const set = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setForm((f) => ({ ...f, imageFile: file, imagePreview: preview }));
    setErrors((e) => ({ ...e, image: undefined }));
  };

  const validate = () => {
    const errs: Errors = {};
    if (!form.name.trim())                                            errs.name = "Required";
    if (!form.description.trim())                                     errs.description = "Required";
    if (!form.price || isNaN(Number(form.price)) || +form.price < 0) errs.price = "Valid price required";
    if (!form.imagePreview)                                           errs.image = "Image required";
    if (!form.stock || isNaN(Number(form.stock)) || +form.stock < 0) errs.stock = "Valid stock required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ name: form.name.trim(), description: form.description.trim(), price: +form.price, category: form.category, image: form.imagePreview, stock: +form.stock, rating: +form.rating });
  };

  const removeImage = () => {
    setForm((f) => ({ ...f, imageFile: null, imagePreview: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <Modal
      title={product ? "Edit Product" : "Add New Product"}
      onClose={onClose}
      maxWidth="max-w-2xl"
      footer={
        <>
          <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
            Cancel
          </button>
          <button
            type="button"
            onClick={() => formRef.current?.requestSubmit()}
            className="px-5 py-2 text-sm font-semibold text-white bg-[#4AB7B6] rounded-xl hover:bg-[#3aa3a2] transition"
          >
            {product ? "Save Changes" : "Create Product"}
          </button>
        </>
      }
    >
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <Field label="Product Name" name="name" value={form.name} error={errors.name} onChange={set} />
        <Field label="Description" name="description" textarea value={form.description} error={errors.description} onChange={set} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Price ($)" name="price" type="number" value={form.price} error={errors.price} onChange={set} />
          <Field label="Stock" name="stock" type="number" value={form.stock} error={errors.stock} onChange={set} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Category</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className={`${INPUT} border-slate-200 bg-white`}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Product Image</label>
          <div
            onClick={() => fileRef.current?.click()}
            className={`w-full border-2 border-dashed rounded-xl cursor-pointer transition hover:border-[#4AB7B6] hover:bg-[#4AB7B6]/5 ${errors.image ? "border-red-400" : "border-slate-200"}`}
          >
            {form.imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-xl pointer-events-none" />
            ) : (
              <div className="flex flex-col items-center justify-center h-40 gap-2 text-slate-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-sm font-medium">Click to upload image</p>
                <p className="text-xs">PNG, JPG, WEBP</p>
              </div>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          {form.imagePreview && (
            <button type="button" onClick={removeImage} className="mt-1.5 text-xs text-red-500 hover:underline">
              Remove image
            </button>
          )}
          {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>

        <Field label="Rating (0–5)" name="rating" type="number" value={form.rating} error={errors.rating} onChange={set} />
      </form>
    </Modal>
  );
}
