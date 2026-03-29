"use client";
import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import EmptyState from "@/components/ui/EmptyState";

type Banner = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  active: boolean;
};

const INITIAL_BANNERS: Banner[] = [
  { id: "1", tag: "Happy Weekend",  title: "25% OFF", subtitle: "*for All Menus",      imageUrl: "/banner1.png", active: true  },
  { id: "2", tag: "Flash Sale",     title: "40% OFF", subtitle: "*on Electronics",     imageUrl: "/banner2.png", active: true  },
  { id: "3", tag: "Special Offer",  title: "15% OFF", subtitle: "*on Furniture",       imageUrl: "/banner3.png", active: false },
];

const EMPTY: Banner = { id: "", tag: "", title: "", subtitle: "", imageUrl: "", active: true };

function BannerModal({
  banner,
  onSave,
  onClose,
}: {
  banner: Banner | null;
  onSave: (b: Banner) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<Banner>(banner ?? { ...EMPTY, id: Date.now().toString() });

  const set = (k: keyof Banner, v: string | boolean) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-5">
          {banner ? "Edit Banner" : "New Banner"}
        </h3>
        <div className="space-y-3">
          {(["tag", "title", "subtitle", "imageUrl"] as const).map((field) => (
            <div key={field}>
              <label className="block text-xs font-semibold text-slate-500 mb-1 capitalize">
                {field === "imageUrl" ? "Image URL" : field}
              </label>
              <input
                type="text"
                value={form[field] as string}
                onChange={(e) => set(field, e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]"
              />
            </div>
          ))}
          <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => set("active", e.target.checked)}
              className="w-4 h-4 accent-[#4AB7B6]"
            />
            Active (visible on mobile)
          </label>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            className="flex-1 px-4 py-2 bg-[#4AB7B6] text-white rounded-xl text-sm font-semibold hover:bg-[#3aa3a2] transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(INITIAL_BANNERS);
  const [editing, setEditing] = useState<Banner | null | undefined>(undefined);

  const handleSave = (b: Banner) => {
    setBanners((prev) =>
      editing ? prev.map((x) => (x.id === b.id ? b : x)) : [...prev, b]
    );
    setEditing(undefined);
  };

  const handleDelete = (id: string) =>
    setBanners((prev) => prev.filter((b) => b.id !== id));

  const toggleActive = (id: string) =>
    setBanners((prev) =>
      prev.map((b) => (b.id === id ? { ...b, active: !b.active } : b))
    );

  const active = banners.filter((b) => b.active).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Banner Management"
        subtitle="Manage home screen carousel banners shown in the mobile app"
        action={{ label: "Add Banner", onClick: () => setEditing(null) }}
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Banners" value={banners.length} />
        <StatCard label="Active" value={active} valueClassName="text-emerald-600" />
        <StatCard label="Inactive" value={banners.length - active} valueClassName="text-slate-400" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {banners.length === 0 ? (
          <EmptyState icon="🖼️" message="No banners yet" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Preview", "Tag", "Title", "Subtitle", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {banners.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="w-16 h-10 rounded-lg bg-gradient-to-r from-[#4AB7B6]/20 to-[#4AB7B6]/10 flex items-center justify-center text-xs text-[#4AB7B6] font-bold">
                        IMG
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">{b.tag}</td>
                    <td className="px-5 py-3.5 font-bold text-slate-800 text-base">{b.title}</td>
                    <td className="px-5 py-3.5 text-slate-500 text-xs">{b.subtitle}</td>
                    <td className="px-5 py-3.5">
                      <button
                        onClick={() => toggleActive(b.id)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full transition ${
                          b.active
                            ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-400 hover:bg-slate-200"
                        }`}
                      >
                        {b.active ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditing(b)}
                          className="text-xs px-2.5 py-1 text-[#4AB7B6] bg-[#E6F7F7] rounded-lg font-semibold hover:bg-[#4AB7B6]/20 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="text-xs px-2.5 py-1 text-red-500 bg-red-50 rounded-lg font-semibold hover:bg-red-100 transition"
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

      {editing !== undefined && (
        <BannerModal
          banner={editing}
          onSave={handleSave}
          onClose={() => setEditing(undefined)}
        />
      )}
    </div>
  );
}
