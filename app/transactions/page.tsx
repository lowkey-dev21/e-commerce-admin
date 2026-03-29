"use client";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const TRANSACTIONS = [
  { id: "TXN-9901", order: "#ORD-8821", customer: "Sarah Johnson",   method: "Credit Card", bank: "Visa ****4242",     date: "28 Mar 2026 11:29", amount: "$245.00", status: "Success" },
  { id: "TXN-9900", order: "#ORD-8820", customer: "Michael Chen",    method: "PayPal",      bank: "m.chen@email.com",  date: "28 Mar 2026 10:14", amount: "$999.00", status: "Success" },
  { id: "TXN-9899", order: "#ORD-8819", customer: "Emma Davis",      method: "Credit Card", bank: "MC ****8823",       date: "27 Mar 2026 16:05", amount: "$132.50", status: "Success" },
  { id: "TXN-9898", order: "#ORD-8818", customer: "James Wilson",    method: "Debit Card",  bank: "Visa ****1111",     date: "27 Mar 2026 09:42", amount: "$89.00",  status: "Refunded"},
  { id: "TXN-9897", order: "#ORD-8817", customer: "Olivia Martinez", method: "PayPal",      bank: "olivia@email.com",  date: "26 Mar 2026 14:30", amount: "$342.00", status: "Success" },
  { id: "TXN-9896", order: "#ORD-8816", customer: "Liam Thompson",   method: "Credit Card", bank: "Amex ****3344",     date: "26 Mar 2026 11:00", amount: "$49.99",  status: "Pending" },
  { id: "TXN-9895", order: "#ORD-8815", customer: "Ava Anderson",    method: "Credit Card", bank: "Visa ****5566",     date: "25 Mar 2026 17:22", amount: "$560.00", status: "Success" },
  { id: "TXN-9894", order: "#ORD-8814", customer: "Noah Garcia",     method: "PayPal",      bank: "noah.g@email.com",  date: "25 Mar 2026 13:10", amount: "$178.00", status: "Success" },
  { id: "TXN-9893", order: "#ORD-8813", customer: "Sophia Brown",    method: "Debit Card",  bank: "MC ****7788",       date: "24 Mar 2026 10:55", amount: "$215.00", status: "Pending" },
  { id: "TXN-9892", order: "#ORD-8812", customer: "William Jones",   method: "Credit Card", bank: "Visa ****9900",     date: "24 Mar 2026 08:30", amount: "$65.00",  status: "Failed"  },
];

const CHART_DATA = [
  { day: "Sun", amount: 1200 },
  { day: "Mon", amount: 3400 },
  { day: "Tue", amount: 2800 },
  { day: "Wed", amount: 4200 },
  { day: "Thu", amount: 3800 },
  { day: "Fri", amount: 5100 },
  { day: "Sat", amount: 2200 },
];

const STATUS_STYLES: Record<string, string> = {
  Success:  "bg-emerald-50 text-emerald-600",
  Pending:  "bg-orange-50 text-orange-500",
  Refunded: "bg-blue-50 text-blue-600",
  Failed:   "bg-red-50 text-red-500",
};

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = TRANSACTIONS.filter((t) => {
    const matchSearch = t.id.toLowerCase().includes(search.toLowerCase()) || t.customer.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || t.status === filter;
    return matchSearch && matchFilter;
  });

  const total = TRANSACTIONS.reduce((sum, t) => sum + parseFloat(t.amount.replace("$", "").replace(",", "")), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-800">Transaction</h2>
        <p className="text-sm text-slate-400 mt-0.5">{TRANSACTIONS.length} transactions</p>
      </div>

      {/* Stats + Chart */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Revenue",  value: `$${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: "text-slate-800"   },
          { label: "Successful",     value: "7",   color: "text-emerald-600" },
          { label: "Pending",        value: "2",   color: "text-orange-500"  },
          { label: "Refunded/Failed","value": "2", color: "text-red-500"     },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <p className="text-xs text-slate-400 font-medium">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Revenue — Last 7 Days</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={CHART_DATA} barSize={28} margin={{ top: 0, right: 0, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}`} />
            <Tooltip
              contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 12 }}
              formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]}
            />
            <Bar dataKey="amount" fill="#4AB7B6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search transaction ID or customer..."
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
          {["All", "Success", "Pending", "Refunded", "Failed"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["Transaction ID", "Order", "Customer", "Method", "Date", "Amount", "Status"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-[#4AB7B6]">{t.id}</td>
                  <td className="px-5 py-3.5 text-slate-600 text-xs font-medium">{t.order}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-800">{t.customer}</td>
                  <td className="px-5 py-3.5">
                    <p className="text-xs text-slate-700 font-medium">{t.method}</p>
                    <p className="text-[10px] text-slate-400">{t.bank}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs">{t.date}</td>
                  <td className="px-5 py-3.5 font-bold text-slate-800">{t.amount}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[t.status]}`}>
                      {t.status}
                    </span>
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
