"use client";
import { useState, useEffect } from "react";
import { Product } from "@/lib/api";
import Modal from "@/components/ui/Modal";

const CATEGORIES = ["Electronics", "Clothing", "Home", "Sports", "Books"];
const INPUT = "w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]";

type Props = { product: Product | null; onSave: (data: Partial<Product>) => void; onClose: () => void };
type FormData = { name: string; description: string; price: string; category: string; image: string; stock: string; rating: string };

export default function ProductModal({ product, onSave, onClose }: Props) {
  const [form, setForm] = useState<FormData>({ name: "", description: "", price: "", category: "Electronics", image: "", stock: "", rating: "0" });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (product) {
      setForm({ name: product.name, description: product.description, price: String(product.price), category: product.category, image: product.image, stock: String(product.stock), rating: String(product.rating) });
    }
  }, [product]);

  const set = (key: keyof FormData, val: string) => setForm((f) => ({ ...f, [key]: val }));

  const validate = () => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim())                                            errs.name = "Required";
    if (!form.description.trim())                                     errs.description = "Required";
    if (!form.price || isNaN(Number(form.price)) || +form.price < 0) errs.price = "Valid price required";
    if (!form.image.trim())                                           errs.image = "Required";
    if (!form.stock || isNaN(Number(form.stock)) || +form.stock < 0) errs.stock = "Valid stock required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ name: form.name.trim(), description: form.description.trim(), price: +form.price, category: form.category, image: form.image.trim(), stock: +form.stock, rating: +form.rating });
  };

  const Field = ({ label, name, type = "text", textarea = false }: { label: string; name: keyof FormData; type?: string; textarea?: boolean }) => (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
      {textarea ? (
        <textarea value={form[name]} onChange={(e) => set(name, e.target.value)} rows={3} className={`${INPUT} resize-none ${errors[name] ? "border-red-400" : "border-slate-200"}`} />
      ) : (
        <input type={type} value={form[name]} onChange={(e) => set(name, e.target.value)} className={`${INPUT} ${errors[name] ? "border-red-400" : "border-slate-200"}`} />
      )}
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

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
          <button form="product-form" type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-[#4AB7B6] rounded-xl hover:bg-[#3aa3a2] transition">
            {product ? "Save Changes" : "Create Product"}
          </button>
        </>
      }
    >
      <form id="product-form" onSubmit={handleSubmit} className="space-y-4">
        <Field label="Product Name" name="name" />
        <Field label="Description" name="description" textarea />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Price ($)" name="price" type="number" />
          <Field label="Stock" name="stock" type="number" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">Category</label>
          <select value={form.category} onChange={(e) => set("category", e.target.value)} className={`${INPUT} border-slate-200 bg-white`}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <Field label="Image URL" name="image" />
        {form.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={form.image} alt="Preview" className="w-full h-40 object-cover rounded-xl border border-slate-100" />
        )}
        <Field label="Rating (0–5)" name="rating" type="number" />
      </form>
    </Modal>
  );
}
