"use client";
import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import FilterSelect from "@/components/ui/FilterSelect";
import StatusBadge from "@/components/ui/StatusBadge";
import StatCard from "@/components/ui/StatCard";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";

const COUPONS = [
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

export default function CouponsPage() {
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("All");
  const [showForm, setShowForm] = useState(false);

  const filtered = COUPONS.filter((c) =>
    c.code.toLowerCase().includes(search.toLowerCase())
    && (filter === "All" || c.status === filter)
  );

  const totalUsed = COUPONS.reduce((s, c) => s + c.used, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Coupon Code"
        subtitle={`${COUPONS.length} coupons total`}
        action={{ label: "Create Coupon", onClick: () => setShowForm(true) }}
      />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Coupons" value={COUPONS.length} />
        <StatCard label="Active"        value={COUPONS.filter((c) => c.status === "Active").length}   valueClassName="text-emerald-600" />
        <StatCard label="Expired"       value={COUPONS.filter((c) => c.status === "Expired").length}  valueClassName="text-red-500" />
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
                      <button className="text-xs px-2.5 py-1 text-[#4AB7B6] bg-[#E6F7F7] rounded-lg font-semibold hover:bg-[#4AB7B6]/20 transition">Edit</button>
                      <button className="text-xs px-2.5 py-1 text-red-500 bg-red-50 rounded-lg font-semibold hover:bg-red-100 transition">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <EmptyState icon="🏷️" message="No coupons found" />}
      </div>

      {showForm && (
        <Modal
          title="Create Coupon"
          onClose={() => setShowForm(false)}
          footer={
            <>
              <button onClick={() => setShowForm(false)} className="px-5 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition">Cancel</button>
              <button onClick={() => setShowForm(false)} className="px-5 py-2 text-sm font-semibold text-white bg-[#4AB7B6] rounded-xl hover:bg-[#3aa3a2] transition">Create</button>
            </>
          }
        >
          <div className="space-y-4">
            {[
              { label: "Coupon Code",       placeholder: "e.g. SAVE10",  type: "text"   },
              { label: "Discount Value",    placeholder: "e.g. 10",      type: "number" },
              { label: "Minimum Order ($)", placeholder: "e.g. 50",      type: "number" },
              { label: "Usage Limit",       placeholder: "e.g. 500",     type: "number" },
              { label: "Expiry Date",       placeholder: "",             type: "date"   },
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} className={INPUT} />
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Discount Type</label>
              <select className={INPUT + " bg-white"}>
                <option>Percentage</option>
                <option>Fixed</option>
              </select>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
