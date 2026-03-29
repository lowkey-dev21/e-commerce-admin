"use client";
import { useState } from "react";
import { type Product } from "@/lib/api";
import ProductModal from "@/components/ProductModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

const CATEGORIES = ["All", "Electronics", "Clothing", "Home", "Sports", "Books"];

let nextId = 100;

const INIT_PRODUCTS: Product[] = [
  { _id: "1", name: "AirPods Pro Max",      description: "Premium wireless headphones with active noise cancellation.",  price: 299.99, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200", stock: 42,  rating: 4.8, reviewCount: 284, createdAt: "2025-01-10" },
  { _id: "2", name: "Nike Air Force 1",     description: "Classic low-top sneaker with clean leather upper.",            price: 129.99, category: "Clothing",    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200", stock: 130, rating: 4.6, reviewCount: 512, createdAt: "2025-01-15" },
  { _id: "3", name: "MacBook Pro 14\"",     description: "Apple M3 chip, 18‑hour battery, Liquid Retina XDR display.",  price: 1999.00,category: "Electronics", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200", stock: 18,  rating: 4.9, reviewCount: 96,  createdAt: "2025-02-01" },
  { _id: "4", name: "Samsung 4K Monitor",   description: "27-inch UHD monitor with HDR10 support and 144Hz refresh.",  price: 299.99, category: "Electronics", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200", stock: 74,  rating: 4.5, reviewCount: 178, createdAt: "2025-02-10" },
  { _id: "5", name: "Levi's 501 Jeans",    description: "Original straight fit denim. Iconic since 1873.",             price: 69.99,  category: "Clothing",    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=200", stock: 195, rating: 4.4, reviewCount: 631, createdAt: "2025-02-15" },
  { _id: "6", name: "Coffee Maker Pro",     description: "12-cup programmable coffee maker with thermal carafe.",       price: 89.99,  category: "Home",        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200", stock: 63,  rating: 4.3, reviewCount: 245, createdAt: "2025-03-01" },
  { _id: "7", name: "Yoga Mat Premium",     description: "6mm non-slip yoga mat with alignment lines, eco-friendly.",  price: 49.99,  category: "Sports",      image: "https://images.unsplash.com/photo-1601925228254-c89cad858ced?w=200", stock: 0,   rating: 4.7, reviewCount: 389, createdAt: "2025-03-05" },
  { _id: "8", name: "Atomic Habits",        description: "Tiny changes, remarkable results by James Clear.",            price: 18.99,  category: "Books",       image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=200", stock: 312, rating: 4.9, reviewCount: 2140,createdAt: "2025-03-10" },
  { _id: "9", name: "Wireless Keyboard",    description: "Compact Bluetooth keyboard with backlight and 3-device sync.",price: 79.99, category: "Electronics", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200", stock: 88,  rating: 4.5, reviewCount: 312, createdAt: "2025-03-12" },
  { _id:"10", name: "Running Shoes X3",    description: "Lightweight mesh upper with responsive cushioning sole.",      price: 139.99, category: "Sports",      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=200", stock: 14,  rating: 4.6, reviewCount: 447, createdAt: "2025-03-15" },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(INIT_PRODUCTS);
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showModal, setShowModal]     = useState(false);
  const [deleteId, setDeleteId]       = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchCat    = category === "All" || p.category === category;
    return matchSearch && matchCat;
  });

  function handleSave(data: Partial<Product>) {
    if (editProduct) {
      setProducts((prev) => prev.map((p) => p._id === editProduct._id ? { ...p, ...data } : p));
    } else {
      const newProduct: Product = {
        _id: String(nextId++),
        name: data.name ?? "",
        description: data.description ?? "",
        price: data.price ?? 0,
        category: data.category ?? "Electronics",
        image: data.image ?? "",
        stock: data.stock ?? 0,
        rating: data.rating ?? 0,
        reviewCount: 0,
        createdAt: new Date().toISOString(),
      };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setShowModal(false);
    setEditProduct(null);
  }

  function handleDelete() {
    if (!deleteId) return;
    setProducts((prev) => prev.filter((p) => p._id !== deleteId));
    setDeleteId(null);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Products</h2>
          <p className="text-slate-500 mt-0.5 text-sm">{products.length} products total</p>
        </div>
        <button
          onClick={() => { setEditProduct(null); setShowModal(true); }}
          className="bg-[#4AB7B6] text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#3aa3a2] transition flex items-center gap-2"
        >
          <span>+</span>
          <span className="hidden sm:inline">Add Product</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]"
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            <p className="text-slate-500 font-medium">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 sm:px-6 py-4 font-semibold text-slate-600">Product</th>
                  <th className="text-left px-4 sm:px-6 py-4 font-semibold text-slate-600 hidden sm:table-cell">Category</th>
                  <th className="text-left px-4 sm:px-6 py-4 font-semibold text-slate-600">Price</th>
                  <th className="text-left px-4 sm:px-6 py-4 font-semibold text-slate-600 hidden md:table-cell">Stock</th>
                  <th className="text-left px-4 sm:px-6 py-4 font-semibold text-slate-600 hidden lg:table-cell">Rating</th>
                  <th className="text-right px-4 sm:px-6 py-4 font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 truncate max-w-[140px] sm:max-w-xs">{p.name}</p>
                          <p className="text-xs text-slate-400 truncate max-w-[140px] sm:max-w-xs hidden sm:block">{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                      <span className="px-2.5 py-1 bg-[#4AB7B6]/10 text-[#4AB7B6] rounded-full text-xs font-semibold">{p.category}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 font-semibold text-slate-800">${p.price.toFixed(2)}</td>
                    <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        p.stock === 0 ? "bg-red-100 text-red-600" : p.stock < 20 ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                      }`}>
                        {p.stock === 0 ? "Out of Stock" : `${p.stock} in stock`}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                      <svg className="inline w-3.5 h-3.5 text-yellow-400 fill-yellow-400 mb-0.5" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>{" "}
                      <span className="font-medium text-slate-700">{p.rating.toFixed(1)}</span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setEditProduct(p); setShowModal(true); }}
                          className="px-2.5 py-1.5 text-xs font-semibold text-[#4AB7B6] bg-[#4AB7B6]/10 rounded-lg hover:bg-[#4AB7B6]/20 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(p._id)}
                          className="px-2.5 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <ProductModal
          product={editProduct}
          onSave={handleSave}
          onClose={() => { setShowModal(false); setEditProduct(null); }}
        />
      )}

      {deleteId && (
        <DeleteConfirmModal onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />
      )}
    </div>
  );
}
