"use client";
import { useState, useRef } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import StatusBadge from "@/components/ui/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";

const CATEGORIES = [
  { id: 1,  name: "Electronics",    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=80", products: 142, active: true,  slug: "electronics",  description: "Phones, laptops, gadgets and more"  },
  { id: 2,  name: "Clothing",       image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=80", products: 98,  active: true,  slug: "clothing",     description: "Men, women and kids fashion"         },
  { id: 3,  name: "Home & Living",  image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80", products: 75,  active: true,  slug: "home-living",  description: "Furniture, decor and kitchen"        },
  { id: 4,  name: "Sports",         image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=80", products: 56,  active: true,  slug: "sports",       description: "Equipment and sportswear"            },
  { id: 5,  name: "Books",          image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=80", products: 210, active: true,  slug: "books",        description: "Fiction, non-fiction and textbooks"  },
  { id: 6,  name: "Beauty",         image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80", products: 63,  active: true,  slug: "beauty",       description: "Skincare, makeup and fragrances"     },
  { id: 7,  name: "Toys & Games",   image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=80", products: 44,  active: false, slug: "toys-games",   description: "Kids toys and board games"           },
  { id: 8,  name: "Automotive",     image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=80", products: 38,  active: false, slug: "automotive",   description: "Car accessories and tools"           },
  { id: 9,  name: "Health",         image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80", products: 87,  active: true,  slug: "health",       description: "Supplements and medical devices"     },
  { id: 10, name: "Food & Drinks",  image: "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=80", products: 120, active: true,  slug: "food-drinks",  description: "Snacks, beverages and organic food"  },
];

const INPUT = "w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]";

export default function CategoriesPage() {
  const [search, setSearch]         = useState("");
  const [view, setView]             = useState<"grid" | "list">("grid");
  const [showForm, setShowForm]     = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setImagePreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Categories"
        subtitle={`${CATEGORIES.length} categories`}
        action={{ label: "Add Category", onClick: () => setShowForm(true) }}
        extra={viewToggle}
      />

      <SearchInput value={search} onChange={setSearch} placeholder="Search categories..." className="max-w-sm mb-6" />

      {filtered.length === 0 ? (
        <EmptyState icon={<svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" /></svg>} message="No categories found" />
      ) : view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.name} className="w-10 h-10 rounded-lg object-cover bg-slate-100 shrink-0" />
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
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.image} alt={c.name} className="w-8 h-8 rounded-lg object-cover bg-slate-100 shrink-0" />
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
          onClose={handleCloseForm}
          footer={
            <>
              <button onClick={handleCloseForm} className="px-5 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition">Cancel</button>
              <button onClick={handleCloseForm} className="px-5 py-2 text-sm font-semibold text-white bg-[#4AB7B6] rounded-xl hover:bg-[#3aa3a2] transition">Add</button>
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
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Category Image</label>
              <div
                onClick={() => fileRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-200 rounded-xl cursor-pointer transition hover:border-[#4AB7B6] hover:bg-[#4AB7B6]/5"
              >
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-xl pointer-events-none" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 gap-2 text-slate-400">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <p className="text-sm font-medium">Click to upload image</p>
                  </div>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              {imagePreview && (
                <button type="button" onClick={() => { setImagePreview(""); if (fileRef.current) fileRef.current.value = ""; }} className="mt-1.5 text-xs text-red-500 hover:underline">
                  Remove image
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
