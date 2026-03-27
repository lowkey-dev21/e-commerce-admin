"use client";
import { useState, useEffect } from "react";
import { Product } from "@/lib/api";

const CATEGORIES = ["Electronics", "Clothing", "Home", "Sports", "Books"];

type Props = {
  product: Product | null;
  onSave: (data: Partial<Product>) => void;
  onClose: () => void;
};

type FormData = {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  stock: string;
  rating: string;
};

export default function ProductModal({ product, onSave, onClose }: Props) {
  const [form, setForm] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    category: "Electronics",
    image: "",
    stock: "",
    rating: "0",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: String(product.price),
        category: product.category,
        image: product.image,
        stock: String(product.stock),
        rating: String(product.rating),
      });
    }
  }, [product]);

  const validate = () => {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.description.trim()) errs.description = "Required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0) errs.price = "Valid price required";
    if (!form.image.trim()) errs.image = "Required";
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0) errs.stock = "Valid stock required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      category: form.category,
      image: form.image.trim(),
      stock: Number(form.stock),
      rating: Number(form.rating),
    });
  };

  const Field = ({ label, name, type = "text", textarea = false }: { label: string; name: keyof FormData; type?: string; textarea?: boolean }) => (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          value={form[name]}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          rows={3}
          className={`w-full px-3 py-2.5 border rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 focus:border-[#6C63FF] ${errors[name] ? "border-red-400" : "border-slate-200"}`}
        />
      ) : (
        <input
          type={type}
          value={form[name]}
          onChange={(e) => setForm((f) => ({ ...f, [name]: e.target.value }))}
          className={`w-full px-3 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 focus:border-[#6C63FF] ${errors[name] ? "border-red-400" : "border-slate-200"}`}
        />
      )}
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-800">
            {product ? "Edit Product" : "Add New Product"}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-xl transition-colors">✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-4">
            <Field label="Product Name" name="name" />
            <Field label="Description" name="description" textarea />
            <div className="grid grid-cols-2 gap-4">
              <Field label="Price ($)" name="price" type="number" />
              <Field label="Stock" name="stock" type="number" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 focus:border-[#6C63FF]"
              >
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <Field label="Image URL" name="image" />
            {form.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.image} alt="Preview" className="w-full h-40 object-cover rounded-xl border border-slate-200" />
            )}
            <Field label="Rating (0-5)" name="rating" type="number" />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#6C63FF] rounded-xl hover:bg-[#5a52d5] transition-colors"
            >
              {product ? "Save Changes" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
