"use client";
import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import FilterSelect from "@/components/ui/FilterSelect";
import StatusBadge from "@/components/ui/StatusBadge";
import StatCard from "@/components/ui/StatCard";
import EmptyState from "@/components/ui/EmptyState";

const ORDERS = [
  { id: "#ORD-8821", customer: "Sarah Johnson",   email: "sarah@email.com",    date: "28 Mar 2026", items: 3, total: "$245.00", status: "Delivered",  payment: "Credit Card" },
  { id: "#ORD-8820", customer: "Michael Chen",    email: "m.chen@email.com",   date: "28 Mar 2026", items: 1, total: "$999.00", status: "Processing", payment: "PayPal"      },
  { id: "#ORD-8819", customer: "Emma Davis",      email: "emma.d@email.com",   date: "27 Mar 2026", items: 5, total: "$132.50", status: "Shipped",    payment: "Credit Card" },
  { id: "#ORD-8818", customer: "James Wilson",    email: "j.wilson@email.com", date: "27 Mar 2026", items: 2, total: "$89.00",  status: "Canceled",   payment: "Debit Card"  },
  { id: "#ORD-8817", customer: "Olivia Martinez", email: "olivia@email.com",   date: "26 Mar 2026", items: 4, total: "$342.00", status: "Delivered",  payment: "PayPal"      },
  { id: "#ORD-8816", customer: "Liam Thompson",   email: "liam.t@email.com",   date: "26 Mar 2026", items: 1, total: "$49.99",  status: "Pending",    payment: "Credit Card" },
  { id: "#ORD-8815", customer: "Ava Anderson",    email: "ava.a@email.com",    date: "25 Mar 2026", items: 7, total: "$560.00", status: "Delivered",  payment: "Credit Card" },
  { id: "#ORD-8814", customer: "Noah Garcia",     email: "noah.g@email.com",   date: "25 Mar 2026", items: 2, total: "$178.00", status: "Shipped",    payment: "PayPal"      },
  { id: "#ORD-8813", customer: "Sophia Brown",    email: "sophia.b@email.com", date: "24 Mar 2026", items: 3, total: "$215.00", status: "Processing", payment: "Debit Card"  },
  { id: "#ORD-8812", customer: "William Jones",   email: "will.j@email.com",   date: "24 Mar 2026", items: 1, total: "$65.00",  status: "Pending",    payment: "Credit Card" },
];

const STATUSES = ["All", "Delivered", "Shipped", "Processing", "Pending", "Canceled"];

export default function OrdersPage() {
  const [search, setSearch]   = useState("");
  const [status, setStatus]   = useState("All");

  const filtered = ORDERS.filter((o) => {
    const q = search.toLowerCase();
    return (o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q))
      && (status === "All" || o.status === status);
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Order Management"
        subtitle={`${ORDERS.length} orders total`}
        action={{ label: "New Order", onClick: () => {} }}
      />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Orders"  value={ORDERS.length} />
        <StatCard label="Delivered"     value={ORDERS.filter((o) => o.status === "Delivered").length}  valueClassName="text-emerald-600" />
        <StatCard label="Processing"    value={ORDERS.filter((o) => o.status === "Processing" || o.status === "Shipped").length} valueClassName="text-orange-500" />
        <StatCard label="Pending / Canceled" value={ORDERS.filter((o) => o.status === "Pending" || o.status === "Canceled").length} valueClassName="text-red-500" />
      </div>

      <div className="flex gap-3 mb-5">
        <SearchInput value={search} onChange={setSearch} placeholder="Search order ID or customer..." className="flex-1 max-w-sm" />
        <FilterSelect value={status} onChange={setStatus} options={STATUSES} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {["Order ID", "Customer", "Date", "Items", "Payment", "Total", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5 font-semibold text-[#4AB7B6] text-sm">{o.id}</td>
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-slate-800">{o.customer}</p>
                    <p className="text-xs text-slate-400">{o.email}</p>
                  </td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs">{o.date}</td>
                  <td className="px-5 py-3.5 text-slate-700 font-medium">{o.items}</td>
                  <td className="px-5 py-3.5 text-slate-500 text-xs">{o.payment}</td>
                  <td className="px-5 py-3.5 font-bold text-slate-800">{o.total}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={o.status} /></td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-2">
                      <button className="text-xs px-2.5 py-1 text-[#4AB7B6] bg-[#E6F7F7] rounded-lg font-semibold hover:bg-[#4AB7B6]/20 transition">View</button>
                      <button className="text-xs px-2.5 py-1 text-slate-500 bg-slate-100 rounded-lg font-semibold hover:bg-slate-200 transition">Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <EmptyState icon="📋" message="No orders found" />}
      </div>
    </div>
  );
}
