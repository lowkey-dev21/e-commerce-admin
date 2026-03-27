"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { productApi, Product } from "@/lib/api";
import ProductModal from "@/components/ProductModal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

const CATEGORIES = ["All", "Electronics", "Clothing", "Home", "Sports", "Books"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await productApi.getAll({
        search: search || undefined,
        category: category !== "All" ? category : undefined,
      });
      setProducts(res.data.data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category]);

  const handleSave = async (data: Partial<Product>) => {
    try {
      if (editProduct) {
        await productApi.update(editProduct._id, data);
        toast.success("Product updated!");
      } else {
        await productApi.create(data);
        toast.success("Product created!");
      }
      setShowModal(false);
      setEditProduct(null);
      fetchProducts();
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Failed to save product");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await productApi.delete(deleteId);
      toast.success("Product deleted");
      setDeleteId(null);
      fetchProducts();
    } catch {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Products</h2>
          <p className="text-slate-500 mt-1">{products.length} products total</p>
        </div>
        <button
          onClick={() => { setEditProduct(null); setShowModal(true); }}
          className="bg-[#6C63FF] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#5a52d5] transition-colors flex items-center gap-2"
        >
          <span>+</span> Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 focus:border-[#6C63FF]"
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 focus:border-[#6C63FF]"
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-4xl animate-pulse">📦</div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <span className="text-4xl">😔</span>
            <p className="text-slate-500 font-medium">No products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-4 font-semibold text-slate-600">Product</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-600">Category</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-600">Price</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-600">Stock</th>
                  <th className="text-left px-6 py-4 font-semibold text-slate-600">Rating</th>
                  <th className="text-right px-6 py-4 font-semibold text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                        />
                        <div>
                          <p className="font-medium text-slate-800 max-w-xs truncate">{p.name}</p>
                          <p className="text-xs text-slate-400 max-w-xs truncate">{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-[#6C63FF]/10 text-[#6C63FF] rounded-full text-xs font-semibold">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-800">${p.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        p.stock === 0
                          ? "bg-red-100 text-red-600"
                          : p.stock < 20
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}>
                        {p.stock === 0 ? "Out of Stock" : `${p.stock} in stock`}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-yellow-500">★</span>{" "}
                      <span className="font-medium text-slate-700">{p.rating.toFixed(1)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setEditProduct(p); setShowModal(true); }}
                          className="px-3 py-1.5 text-xs font-semibold text-[#6C63FF] bg-[#6C63FF]/10 rounded-lg hover:bg-[#6C63FF]/20 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteId(p._id)}
                          className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
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
        <DeleteConfirmModal
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
