"use client";
import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";

const CATEGORIES = [
  { id: 1,  name: "Electronics",    icon: "💻", products: 142, active: true,  slug: "electronics",  description: "Phones, laptops, gadgets and more"  },
  { id: 2,  name: "Clothing",       icon: "👗", products: 98,  active: true,  slug: "clothing",     description: "Men, women and kids fashion"         },
  { id: 3,  name: "Home & Living",  icon: "🏠", products: 75,  active: true,  slug: "home-living",  description: "Furniture, decor and kitchen"        },
  { id: 4,  name: "Sports",         icon: "⚽", products: 56,  active: true,  slug: "sports",       description: "Equipment and sportswear"            },
  { id: 5,  name: "Books",          icon: "📚", products: 210, active: true,  slug: "books",        description: "Fiction, non-fiction and textbooks"  },
  { id: 6,  name: "Beauty",         icon: "💄", products: 63,  active: true,  slug: "beauty",       description: "Skincare, makeup and fragrances"     },
  { id: 7,  name: "Toys & Games",   icon: "🎮", products: 44,  active: false, slug: "toys-games",   description: "Kids toys and board games"           },
  { id: 8,  name: "Automotive",     icon: "🚗", products: 38,  active: false, slug: "automotive",   description: "Car accessories and tools"           },
  { id: 9,  name: "Health",         icon: "💊", products: 87,  active: true,  slug: "health",       description: "Supplements and medical devices"     },
  { id: 10, name: "Food & Drinks",  icon: "🍎", products: 120, active: true,  slug: "food-drinks",  description: "Snacks, beverages and organic food"  },
];

const INPUT = "w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]";

export default function CategoriesPage() {
  const [search, setSearch]     = useState("");
  const [view, setView]         = useState<"grid" | "list">("grid");
  const [showForm, setShowForm] = useState(false);

  const filtered = CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const viewToggle = (
    <div className="flex rounded-xl bg-slate-100 p-0.5">
      {(["grid", "list"] as const).map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition capitalize ${view === v ? "bg-white text-slate-800 shadow-sm" : "text-slate-500"}`}
        >
          {v}
        </button>
      ))}
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Categories"
        subtitle={`${CATEGORIES.length} categories`}
        action={{ label: "Add Category", onClick: () => setShowForm(true) }}
        extra={viewToggle}
      />

      <SearchInput value={search} onChange={setSearch} placeholder="Search categories..." className="max-w-sm mb-6" />

      {filtered.length === 0 ? (
        <EmptyState icon="📂" message="No categories found" />
      ) : view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{c.icon}</span>
                <StatusBadge status={c.active ? "Active" : "Hidden"} />
              </div>
              <p className="font-bold text-slate-800 text-sm mb-1">{c.name}</p>
              <p className="text-xs text-slate-400 mb-3 line-clamp-2">{c.description}</p>
              <p className="text-xs text-[#4AB7B6] font-semibold">{c.products} products</p>
              <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition">
                <button className="flex-1 text-xs py-1 text-[#4AB7B6] border border-[#4AB7B6] rounded-lg font-semibold hover:bg-[#E6F7F7] transition">Edit</button>
                <button className="flex-1 text-xs py-1 text-red-500 border border-red-200 rounded-lg font-semibold hover:bg-red-50 transition">Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["Category", "Slug", "Products", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{c.icon}</span>
                      <div>
                        <p className="font-semibold text-slate-800">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{c.slug}</td>
                  <td className="px-5 py-3.5 font-semibold text-slate-700">{c.products}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={c.active ? "Active" : "Hidden"} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <button className="text-xs px-2.5 py-1 text-[#4AB7B6] bg-[#E6F7F7] rounded-lg font-semibold hover:bg-[#4AB7B6]/20 transition">Edit</button>
                      <button className="text-xs px-2.5 py-1 text-red-500 bg-red-50 rounded-lg font-semibold hover:bg-red-100 transition">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <Modal
          title="Add Category"
          onClose={() => setShowForm(false)}
          footer={
            <>
              <button onClick={() => setShowForm(false)} className="px-5 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition">Cancel</button>
              <button onClick={() => setShowForm(false)} className="px-5 py-2 text-sm font-semibold text-white bg-[#4AB7B6] rounded-xl hover:bg-[#3aa3a2] transition">Add</button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Category Name</label>
              <input type="text" placeholder="e.g. Electronics" className={INPUT} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description</label>
              <textarea rows={2} placeholder="Short description..." className={INPUT + " resize-none"} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Icon (emoji)</label>
              <input type="text" placeholder="e.g. 💻" className={INPUT} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
