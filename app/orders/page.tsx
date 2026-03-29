"use client";
import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import FilterSelect from "@/components/ui/FilterSelect";
import StatusBadge from "@/components/ui/StatusBadge";
import StatCard from "@/components/ui/StatCard";
import EmptyState from "@/components/ui/EmptyState";
import Modal from "@/components/ui/Modal";

type Order = { id: string; customer: string; email: string; date: string; items: number; total: string; status: string };

const INIT_ORDERS: Order[] = [
  { id: "ORD-8821", customer: "Sarah Johnson",   email: "sarah@email.com",    date: "28 Mar 2026", items: 3, total: "$245.00", status: "Shipped"    },
  { id: "ORD-8820", customer: "Michael Chen",    email: "m.chen@email.com",   date: "28 Mar 2026", items: 1, total: "$999.00", status: "Processing" },
  { id: "ORD-8819", customer: "Emma Davis",      email: "emma.d@email.com",   date: "27 Mar 2026", items: 2, total: "$132.50", status: "Shipped"    },
  { id: "ORD-8818", customer: "James Wilson",    email: "j.wilson@email.com", date: "27 Mar 2026", items: 1, total: "$89.00",  status: "Delivered"  },
  { id: "ORD-8817", customer: "Olivia Martinez", email: "olivia@email.com",   date: "26 Mar 2026", items: 4, total: "$342.00", status: "Delivered"  },
  { id: "ORD-8816", customer: "Liam Thompson",   email: "liam.t@email.com",   date: "26 Mar 2026", items: 1, total: "$49.99",  status: "Shipped"    },
  { id: "ORD-8815", customer: "Ava Anderson",    email: "ava.a@email.com",    date: "25 Mar 2026", items: 5, total: "$578.00", status: "Delivered"  },
  { id: "ORD-8814", customer: "Noah Garcia",     email: "noah.g@email.com",   date: "25 Mar 2026", items: 2, total: "$210.00", status: "Canceled"   },
  { id: "ORD-8813", customer: "Sophia Brown",    email: "sophia.b@email.com", date: "24 Mar 2026", items: 1, total: "$74.99",  status: "Pending"    },
  { id: "ORD-8812", customer: "William Jones",   email: "will.j@email.com",   date: "24 Mar 2026", items: 3, total: "$315.00", status: "Delivered"  },
  { id: "ORD-8811", customer: "Isabella Taylor", email: "i.taylor@email.com", date: "23 Mar 2026", items: 2, total: "$189.00", status: "Processing" },
  { id: "ORD-8810", customer: "Mason Lee",       email: "m.lee@email.com",    date: "23 Mar 2026", items: 1, total: "$59.99",  status: "Canceled"   },
];

const STATUSES = ["All", "Pending", "Processing", "Shipped", "Delivered", "Canceled"];
const STATUS_OPTIONS = ["Pending", "Processing", "Shipped", "Delivered", "Canceled"];

export default function OrdersPage() {
  const [orders, setOrders]   = useState<Order[]>(INIT_ORDERS);
  const [search, setSearch]   = useState("");
  const [status, setStatus]   = useState("All");
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    return (o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q))
      && (status === "All" || o.status === status);
  });

  function updateStatus(id: string, newStatus: string) {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: newStatus } : o));
    setViewOrder((prev) => prev?.id === id ? { ...prev, status: newStatus } : prev);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader title="Order Management" subtitle={`${orders.length} orders total`} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Total Orders"       value={orders.length} />
        <StatCard label="Delivered"          value={orders.filter((o) => o.status === "Delivered").length}  valueClassName="text-emerald-600" />
        <StatCard label="Processing"         value={orders.filter((o) => o.status === "Processing" || o.status === "Shipped").length} valueClassName="text-orange-500" />
        <StatCard label="Pending / Canceled" value={orders.filter((o) => o.status === "Pending"    || o.status === "Canceled").length}  valueClassName="text-red-500" />
      </div>

      <div className="flex gap-3 mb-5">
        <SearchInput value={search} onChange={setSearch} placeholder="Search order ID or customer..." className="flex-1" />
        <FilterSelect value={status} onChange={setStatus} options={STATUSES} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs">Order ID</th>
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs">Customer</th>
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs hidden sm:table-cell">Date</th>
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs hidden md:table-cell">Items</th>
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs">Total</th>
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs">Status</th>
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 sm:px-5 py-3.5 font-semibold text-[#4AB7B6] text-sm whitespace-nowrap">{o.id}</td>
                  <td className="px-4 sm:px-5 py-3.5">
                    <p className="font-medium text-slate-800 whitespace-nowrap">{o.customer}</p>
                    <p className="text-xs text-slate-400 hidden sm:block">{o.email}</p>
                  </td>
                  <td className="px-4 sm:px-5 py-3.5 text-slate-500 text-xs whitespace-nowrap hidden sm:table-cell">{o.date}</td>
                  <td className="px-4 sm:px-5 py-3.5 text-slate-700 font-medium hidden md:table-cell">{o.items}</td>
                  <td className="px-4 sm:px-5 py-3.5 font-bold text-slate-800 whitespace-nowrap">{o.total}</td>
                  <td className="px-4 sm:px-5 py-3.5"><StatusBadge status={o.status} /></td>
                  <td className="px-4 sm:px-5 py-3.5">
                    <button onClick={() => setViewOrder(o)} className="text-xs px-2.5 py-1 text-[#4AB7B6] bg-[#E6F7F7] rounded-lg font-semibold hover:bg-[#4AB7B6]/20 transition">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <EmptyState icon={<svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} message="No orders found" />}
      </div>

      {viewOrder && (
        <Modal title="Order Details" onClose={() => setViewOrder(null)} maxWidth="max-w-sm">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-[#4AB7B6]">{viewOrder.id}</span>
              <StatusBadge status={viewOrder.status} />
            </div>
            <div className="space-y-2.5 text-sm border-t border-slate-100 pt-4">
              {[
                { label: "Customer",  value: viewOrder.customer },
                { label: "Email",     value: viewOrder.email    },
                { label: "Date",      value: viewOrder.date     },
                { label: "Items",     value: String(viewOrder.items) },
                { label: "Total",     value: viewOrder.total    },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-semibold text-slate-800">{value}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-semibold text-slate-600 mb-2">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(viewOrder.id, s)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${viewOrder.status === s ? "bg-[#4AB7B6] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
