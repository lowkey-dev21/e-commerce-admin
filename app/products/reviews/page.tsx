"use client";
import { useState } from "react";

const REVIEWS = [
  { id: 1, product: "Apple iPhone 14 Pro",   customer: "Sarah Johnson",   rating: 5, comment: "Absolutely love this phone! Camera quality is incredible.", date: "25 Mar 2026", status: "Approved" },
  { id: 2, product: "Samsung Galaxy S23",     customer: "Michael Chen",    rating: 4, comment: "Great device but battery could be better.", date: "24 Mar 2026", status: "Approved" },
  { id: 3, product: "Sony WH-1000XM5",        customer: "Emma Davis",      rating: 5, comment: "Best noise cancelling headphones I've ever used!", date: "23 Mar 2026", status: "Approved" },
  { id: 4, product: "Nike Air Max 270",       customer: "James Wilson",    rating: 3, comment: "Decent shoes but sizing runs small.", date: "22 Mar 2026", status: "Pending"  },
  { id: 5, product: "iPad Air M1",            customer: "Olivia Martinez", rating: 5, comment: "Perfect for work and entertainment. Worth every penny.", date: "21 Mar 2026", status: "Approved" },
  { id: 6, product: "Dyson V15 Detect",       customer: "Liam Thompson",   rating: 4, comment: "Powerful suction but quite heavy.", date: "20 Mar 2026", status: "Approved" },
  { id: 7, product: "Apple iPhone 14 Pro",    customer: "Ava Anderson",    rating: 2, comment: "Overpriced for what you get. Disappointed.", date: "19 Mar 2026", status: "Flagged"  },
  { id: 8, product: "Adidas Ultraboost 23",   customer: "Noah Garcia",     rating: 5, comment: "Super comfortable for long runs!", date: "18 Mar 2026", status: "Approved" },
  { id: 9, product: "MacBook Pro 14",         customer: "Sophia Brown",    rating: 4, comment: "Blazing fast but MagSafe cable frays quickly.", date: "17 Mar 2026", status: "Pending"  },
  { id: 10, product: "AirPods Pro 2nd Gen",   customer: "William Jones",   rating: 5, comment: "Transparency mode is game changing.", date: "16 Mar 2026", status: "Approved" },
];

const STATUS_STYLES: Record<string, string> = {
  Approved: "bg-emerald-50 text-emerald-600",
  Pending:  "bg-orange-50 text-orange-500",
  Flagged:  "bg-red-50 text-red-500",
};

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i <= count ? "text-yellow-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductReviewsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = REVIEWS.filter((r) => {
    const matchSearch = r.product.toLowerCase().includes(search.toLowerCase()) || r.customer.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || r.status === filter;
    return matchSearch && matchFilter;
  });

  const avg = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Product Reviews</h2>
          <p className="text-sm text-slate-400 mt-0.5">{REVIEWS.length} reviews total</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Total Reviews</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">{REVIEWS.length}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Avg. Rating</p>
          <div className="flex items-end gap-2 mt-1">
            <p className="text-2xl font-bold text-yellow-500">{avg}</p>
            <span className="text-yellow-400 text-xl mb-0.5">★</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Pending Review</p>
          <p className="text-2xl font-bold text-orange-500 mt-1">{REVIEWS.filter((r) => r.status === "Pending").length}</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Flagged</p>
          <p className="text-2xl font-bold text-red-500 mt-1">{REVIEWS.filter((r) => r.status === "Flagged").length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search product or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]"
        >
          {["All", "Approved", "Pending", "Flagged"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["Product", "Customer", "Rating", "Review", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-slate-800 max-w-[160px]">
                    <p className="truncate text-xs">{r.product}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-600 text-sm font-medium">{r.customer}</td>
                  <td className="px-5 py-3.5"><Stars count={r.rating} /></td>
                  <td className="px-5 py-3.5 max-w-[240px]">
                    <p className="text-xs text-slate-600 line-clamp-2">{r.comment}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-400 text-xs whitespace-nowrap">{r.date}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <button className="text-xs px-2.5 py-1 text-emerald-600 bg-emerald-50 rounded-lg font-semibold hover:bg-emerald-100 transition">Approve</button>
                      <button className="text-xs px-2.5 py-1 text-red-500 bg-red-50 rounded-lg font-semibold hover:bg-red-100 transition">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
