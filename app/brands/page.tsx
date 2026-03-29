"use client";
import { useState } from "react";

const BRANDS = [
  { id: 1, name: "Apple",     letter: "A", color: "#E6F7F7", products: 24, country: "USA",     website: "apple.com",     status: "Active",   since: "Jan 2024" },
  { id: 2, name: "Samsung",   letter: "S", color: "#FFF3E4", products: 38, country: "South Korea", website: "samsung.com", status: "Active",   since: "Jan 2024" },
  { id: 3, name: "Sony",      letter: "S", color: "#F0F4FF", products: 15, country: "Japan",   website: "sony.com",      status: "Active",   since: "Feb 2024" },
  { id: 4, name: "Nike",      letter: "N", color: "#FFF0F0", products: 52, country: "USA",     website: "nike.com",      status: "Active",   since: "Mar 2024" },
  { id: 5, name: "Adidas",    letter: "A", color: "#F5F0FF", products: 47, country: "Germany", website: "adidas.com",    status: "Active",   since: "Mar 2024" },
  { id: 6, name: "Zara",      letter: "Z", color: "#F0FFF4", products: 31, country: "Spain",   website: "zara.com",      status: "Active",   since: "Apr 2024" },
  { id: 7, name: "LG",        letter: "L", color: "#FFF9E6", products: 19, country: "South Korea", website: "lg.com",    status: "Inactive", since: "May 2024" },
  { id: 8, name: "IKEA",      letter: "I", color: "#E6F3FF", products: 63, country: "Sweden",  website: "ikea.com",      status: "Active",   since: "Jun 2024" },
  { id: 9, name: "Logitech",  letter: "L", color: "#FFE6F0", products: 22, country: "Switzerland", website: "logitech.com", status: "Active", since: "Jun 2024" },
  { id: 10, name: "Dyson",    letter: "D", color: "#E6FFE6", products: 11, country: "UK",      website: "dyson.com",     status: "Inactive", since: "Jul 2024" },
];

export default function BrandsPage() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = BRANDS.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Brand</h2>
          <p className="text-sm text-slate-400 mt-0.5">{BRANDS.length} brands registered</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-[#4AB7B6] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#3aa3a2] transition flex items-center gap-2"
        >
          <span>+</span> Add Brand
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Total Brands</p>
          <p className="text-2xl font-bold text-slate-800 mt-1">10</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Active Brands</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">8</p>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-400 font-medium">Total Products</p>
          <p className="text-2xl font-bold text-[#4AB7B6] mt-1">322</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search brand or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filtered.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold"
                style={{ backgroundColor: b.color, color: "#4AB7B6" }}
              >
                {b.letter}
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${b.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"}`}>
                {b.status}
              </span>
            </div>
            <p className="font-bold text-slate-800 text-sm">{b.name}</p>
            <p className="text-xs text-slate-400">{b.country}</p>
            <p className="text-xs text-slate-400 mt-1">{b.website}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
              <span className="text-xs text-[#4AB7B6] font-semibold">{b.products} products</span>
              <span className="text-[10px] text-slate-400">{b.since}</span>
            </div>
            <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition">
              <button className="flex-1 text-xs py-1 text-[#4AB7B6] border border-[#4AB7B6] rounded-lg font-semibold hover:bg-[#E6F7F7] transition">Edit</button>
              <button className="flex-1 text-xs py-1 text-red-500 border border-red-200 rounded-lg font-semibold hover:bg-red-50 transition">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Brand Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-800">Add Brand</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-slate-100 rounded-lg transition text-slate-400">✕</button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Brand Name", placeholder: "e.g. Apple" },
                { label: "Country", placeholder: "e.g. USA" },
                { label: "Website", placeholder: "e.g. brand.com" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{f.label}</label>
                  <input type="text" placeholder={f.placeholder} className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 bg-[#4AB7B6] text-white rounded-xl text-sm font-semibold hover:bg-[#3aa3a2] transition">Add Brand</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
