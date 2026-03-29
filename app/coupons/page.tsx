"use client";
import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import FilterSelect from "@/components/ui/FilterSelect";
import StatusBadge from "@/components/ui/StatusBadge";
import StatCard from "@/components/ui/StatCard";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

type Coupon = { code: string; type: "Percentage" | "Fixed"; discount: string; minOrder: string; used: number; limit: number; expiry: string; status: "Active" | "Expired" };

const INIT_COUPONS: Coupon[] = [
  { code: "SAVE10",    type: "Percentage", discount: "10%",  minOrder: "$50",  used: 124, limit: 500,  expiry: "30 Apr 2026", status: "Active"  },
  { code: "WELCOME20", type: "Percentage", discount: "20%",  minOrder: "$30",  used: 80,  limit: 200,  expiry: "31 Dec 2026", status: "Active"  },
  { code: "FLAT15",    type: "Fixed",      discount: "$15",  minOrder: "$100", used: 45,  limit: 100,  expiry: "15 Apr 2026", status: "Active"  },
  { code: "SUMMER50",  type: "Fixed",      discount: "$50",  minOrder: "$200", used: 200, limit: 200,  expiry: "01 Sep 2025", status: "Expired" },
  { code: "TECH5",     type: "Percentage", discount: "5%",   minOrder: "$0",   used: 310, limit: 999,  expiry: "31 Mar 2026", status: "Active"  },
  { code: "FLASH30",   type: "Percentage", discount: "30%",  minOrder: "$80",  used: 50,  limit: 50,   expiry: "28 Mar 2026", status: "Expired" },
  { code: "LOYAL25",   type: "Percentage", discount: "25%",  minOrder: "$150", used: 12,  limit: 300,  expiry: "31 Dec 2026", status: "Active"  },
  { code: "NEWUSER",   type: "Fixed",      discount: "$10",  minOrder: "$0",   used: 420, limit: 1000, expiry: "31 Dec 2026", status: "Active"  },
];

const INPUT = "w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]";

type FormState = { code: string; type: "Percentage" | "Fixed"; discount: string; minOrder: string; limit: string; expiry: string };
const EMPTY_FORM: FormState = { code: "", type: "Percentage", discount: "", minOrder: "", limit: "", expiry: "" };

export default function CouponsPage() {
  const [coupons, setCoupons]     = useState<Coupon[]>(INIT_COUPONS);
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("All");
  const [showForm, setShowForm]   = useState(false);
  const [editCode, setEditCode]   = useState<string | null>(null);
  const [deleteCode, setDeleteCode] = useState<string | null>(null);
  const [form, setForm]           = useState<FormState>(EMPTY_FORM);

  const filtered = coupons.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase())
    && (filter === "All" || c.status === filter)
  );

  const totalUsed = coupons.reduce((s, c) => s + c.used, 0);

  function openCreate() {
    setEditCode(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(c: Coupon) {
    setEditCode(c.code);
    setForm({ code: c.code, type: c.type, discount: c.discount.replace(/[%$]/g, ""), minOrder: c.minOrder.replace("$", ""), limit: String(c.limit), expiry: c.expiry });
    setShowForm(true);
  }

  function handleSave() {
    if (!form.code.trim() || !form.discount || !form.limit) return;
    const discountStr = form.type === "Percentage" ? `${form.discount}%` : `$${form.discount}`;
    const minOrderStr = form.minOrder ? `$${form.minOrder}` : "$0";
    const updated: Coupon = { code: form.code.toUpperCase(), type: form.type, discount: discountStr, minOrder: minOrderStr, used: 0, limit: Number(form.limit), expiry: form.expiry || "—", status: "Active" };
    if (editCode) {
      setCoupons((prev) => prev.map((c) => c.code === editCode ? { ...updated, used: c.used } : c));
    } else {
      setCoupons((prev) => [updated, ...prev]);
    }
    setShowForm(false);
  }

  function handleDelete() {
    if (!deleteCode) return;
    setCoupons((prev) => prev.filter((c) => c.code !== deleteCode));
    setDeleteCode(null);
  }

  const set = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Coupon Code"
        subtitle={`${coupons.length} coupons total`}
        action={{ label: "Create Coupon", onClick: openCreate }}
      />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Coupons" value={coupons.length} />
        <StatCard label="Active"        value={coupons.filter((c) => c.status === "Active").length}   valueClassName="text-emerald-600" />
        <StatCard label="Expired"       value={coupons.filter((c) => c.status === "Expired").length}  valueClassName="text-red-500" />
        <StatCard label="Total Used"    value={totalUsed.toLocaleString()}                             valueClassName="text-[#4AB7B6]" />
      </div>

      <div className="flex gap-3 mb-5">
        <SearchInput value={search} onChange={setSearch} placeholder="Search coupon code..." className="flex-1 max-w-sm" />
        <FilterSelect value={filter} onChange={setFilter} options={["All", "Active", "Expired"]} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["Code", "Type", "Discount", "Min Order", "Usage", "Expiry", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.code} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-lg text-xs">{c.code}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.type === "Percentage" ? "bg-blue-50 text-blue-600" : "bg-[#E6F7F7] text-[#4AB7B6]"}`}>
                      {c.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-bold text-slate-800">{c.discount}</td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs">{c.minOrder}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#4AB7B6] rounded-full" style={{ width: `${Math.min(100, (c.used / c.limit) * 100)}%` }} />
                      </div>
                      <span className="text-xs text-slate-500">{c.used}/{c.limit}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs">{c.expiry}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(c)} className="text-xs px-2.5 py-1 text-[#4AB7B6] bg-[#E6F7F7] rounded-lg font-semibold hover:bg-[#4AB7B6]/20 transition">Edit</button>
                      <button onClick={() => setDeleteCode(c.code)} className="text-xs px-2.5 py-1 text-red-500 bg-red-50 rounded-lg font-semibold hover:bg-red-100 transition">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <EmptyState icon={<svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>} message="No coupons found" />}
      </div>

      {showForm && (
        <Modal
          title={editCode ? "Edit Coupon" : "Create Coupon"}
          onClose={() => setShowForm(false)}
          footer={
            <>
              <button onClick={() => setShowForm(false)} className="px-5 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition">Cancel</button>
              <button onClick={handleSave} className="px-5 py-2 text-sm font-semibold text-white bg-[#4AB7B6] rounded-xl hover:bg-[#3aa3a2] transition">{editCode ? "Save Changes" : "Create"}</button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Coupon Code</label>
              <input type="text" value={form.code} onChange={(e) => set("code", e.target.value)} placeholder="e.g. SAVE10" className={INPUT} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Discount Type</label>
              <select value={form.type} onChange={(e) => set("type", e.target.value as "Percentage" | "Fixed")} className={INPUT + " bg-white"}>
                <option value="Percentage">Percentage</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Discount Value</label>
              <input type="number" value={form.discount} onChange={(e) => set("discount", e.target.value)} placeholder="e.g. 10" className={INPUT} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Minimum Order ($)</label>
              <input type="number" value={form.minOrder} onChange={(e) => set("minOrder", e.target.value)} placeholder="e.g. 50" className={INPUT} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Usage Limit</label>
              <input type="number" value={form.limit} onChange={(e) => set("limit", e.target.value)} placeholder="e.g. 500" className={INPUT} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Expiry Date</label>
              <input type="date" value={form.expiry} onChange={(e) => set("expiry", e.target.value)} className={INPUT} />
            </div>
          </div>
        </Modal>
      )}

      {deleteCode && <DeleteConfirmModal onConfirm={handleDelete} onCancel={() => setDeleteCode(null)} />}
    </div>
  );
}
