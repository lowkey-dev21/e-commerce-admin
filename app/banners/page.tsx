"use client";
import { useState, useRef } from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import EmptyState from "@/components/ui/EmptyState";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

type Banner = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  active: boolean;
};

const INITIAL_BANNERS: Banner[] = [
  { id: "1", tag: "Happy Weekend",  title: "25% OFF", subtitle: "For All Menus",    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400", active: true  },
  { id: "2", tag: "Flash Sale",     title: "40% OFF", subtitle: "On Electronics",   imageUrl: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400", active: true  },
  { id: "3", tag: "Special Offer",  title: "15% OFF", subtitle: "On Furniture",     imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400", active: false },
];

const INPUT = "w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]";

function BannerModal({ banner, onSave, onClose }: { banner: Banner | null; onSave: (b: Banner) => void; onClose: () => void }) {
  const [form, setForm] = useState<Banner>(
    banner ?? { id: Date.now().toString(), tag: "", title: "", subtitle: "", imageUrl: "", active: true }
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof Banner, v: string | boolean) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    set("imageUrl", URL.createObjectURL(file));
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800">{banner ? "Edit Banner" : "New Banner"}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition text-slate-400 hover:text-slate-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {(["tag", "title", "subtitle"] as const).map((field) => (
            <div key={field}>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 capitalize">{field}</label>
              <input type="text" value={form[field]} onChange={(e) => set(field, e.target.value)} className={INPUT} />
            </div>
          ))}

          {/* Image Upload */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Banner Image</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-slate-200 rounded-xl cursor-pointer transition hover:border-[#4AB7B6] hover:bg-[#4AB7B6]/5"
            >
              {form.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.imageUrl} alt="Preview" className="w-full h-36 object-cover rounded-xl pointer-events-none" />
              ) : (
                <div className="flex flex-col items-center justify-center h-36 gap-2 text-slate-400">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <p className="text-sm font-medium">Click to upload image</p>
                  <p className="text-xs">PNG, JPG, WEBP</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            {form.imageUrl && (
              <button type="button" onClick={() => { set("imageUrl", ""); if (fileRef.current) fileRef.current.value = ""; }} className="mt-1.5 text-xs text-red-500 hover:underline">
                Remove image
              </button>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input type="checkbox" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="w-4 h-4 accent-[#4AB7B6]" />
            Active (visible on mobile)
          </label>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">
            Cancel
          </button>
          <button onClick={() => onSave(form)} className="flex-1 px-4 py-2 bg-[#4AB7B6] text-white rounded-xl text-sm font-semibold hover:bg-[#3aa3a2] transition">
            {banner ? "Save Changes" : "Add Banner"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BannersPage() {
  const [banners, setBanners]   = useState<Banner[]>(INITIAL_BANNERS);
  const [editing, setEditing]   = useState<Banner | null | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSave = (b: Banner) => {
    setBanners((prev) => editing ? prev.map((x) => (x.id === b.id ? b : x)) : [...prev, b]);
    setEditing(undefined);
  };

  const handleDelete = () => {
    if (!deleteId) return;
    setBanners((prev) => prev.filter((b) => b.id !== deleteId));
    setDeleteId(null);
  };

  const toggleActive = (id: string) =>
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b)));

  const active = banners.filter((b) => b.active).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Banner Management"
        subtitle="Manage home screen carousel banners shown in the mobile app"
        action={{ label: "Add Banner", onClick: () => setEditing(null) }}
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Banners" value={banners.length} />
        <StatCard label="Active"        value={active}                    valueClassName="text-emerald-600" />
        <StatCard label="Inactive"      value={banners.length - active}   valueClassName="text-slate-400" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {banners.length === 0 ? (
          <EmptyState icon={<svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} message="No banners yet" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Preview", "Tag", "Title", "Subtitle", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {banners.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      {b.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={b.imageUrl} alt={b.title} className="w-20 h-12 rounded-lg object-cover bg-slate-100" />
                      ) : (
                        <div className="w-20 h-12 rounded-lg bg-slate-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">{b.tag}</td>
                    <td className="px-5 py-3.5 font-bold text-slate-800 text-base">{b.title}</td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">{b.subtitle}</td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => toggleActive(b.id)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full transition ${b.active ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
                      >
                        {b.active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
                        <button onClick={() => setEditing(b)} className="text-xs px-2.5 py-1 text-[#4AB7B6] bg-[#E6F7F7] rounded-lg font-semibold hover:bg-[#4AB7B6]/20 transition">
                          Edit
                        </button>
                        <button onClick={() => setDeleteId(b.id)} className="text-xs px-2.5 py-1 text-red-500 bg-red-50 rounded-lg font-semibold hover:bg-red-100 transition">
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

      {editing !== undefined && (
        <BannerModal banner={editing} onSave={handleSave} onClose={() => setEditing(undefined)} />
      )}

      {deleteId && <DeleteConfirmModal onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
