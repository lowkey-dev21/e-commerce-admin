"use client";
import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import FilterSelect from "@/components/ui/FilterSelect";
import StatusBadge from "@/components/ui/StatusBadge";
import StatCard from "@/components/ui/StatCard";
import EmptyState from "@/components/ui/EmptyState";

type Customer = { id: string; name: string; email: string; phone: string; orders: number; spent: string; joined: string; status: "Active" | "Inactive" };

const INIT_CUSTOMERS: Customer[] = [
  { id: "USR-001", name: "Sarah Johnson",   email: "sarah@email.com",    phone: "+1 555-0101", orders: 14, spent: "$1,820.00", joined: "Jan 2025", status: "Active"   },
  { id: "USR-002", name: "Michael Chen",    email: "m.chen@email.com",   phone: "+1 555-0102", orders: 8,  spent: "$3,240.00", joined: "Feb 2025", status: "Active"   },
  { id: "USR-003", name: "Emma Davis",      email: "emma.d@email.com",   phone: "+1 555-0103", orders: 22, spent: "$987.50",   joined: "Mar 2025", status: "Active"   },
  { id: "USR-004", name: "James Wilson",    email: "j.wilson@email.com", phone: "+1 555-0104", orders: 3,  spent: "$210.00",   joined: "Mar 2025", status: "Inactive" },
  { id: "USR-005", name: "Olivia Martinez", email: "olivia@email.com",   phone: "+1 555-0105", orders: 31, spent: "$5,620.00", joined: "Nov 2024", status: "Active"   },
  { id: "USR-006", name: "Liam Thompson",   email: "liam.t@email.com",   phone: "+1 555-0106", orders: 6,  spent: "$432.00",   joined: "Apr 2025", status: "Active"   },
  { id: "USR-007", name: "Ava Anderson",    email: "ava.a@email.com",    phone: "+1 555-0107", orders: 19, spent: "$2,100.00", joined: "Dec 2024", status: "Active"   },
  { id: "USR-008", name: "Noah Garcia",     email: "noah.g@email.com",   phone: "+1 555-0108", orders: 0,  spent: "$0.00",     joined: "May 2025", status: "Inactive" },
  { id: "USR-009", name: "Sophia Brown",    email: "sophia.b@email.com", phone: "+1 555-0109", orders: 11, spent: "$890.00",   joined: "Jan 2025", status: "Active"   },
  { id: "USR-010", name: "William Jones",   email: "will.j@email.com",   phone: "+1 555-0110", orders: 5,  spent: "$315.00",   joined: "Jun 2025", status: "Active"   },
];

const AVATAR_COLORS = ["#4AB7B6","#F4A94E","#10B981","#3B82F6","#8B5CF6","#EF4444","#F59E0B","#EC4899","#6366F1","#14B8A6"];

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(INIT_CUSTOMERS);
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("All");

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    return (c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))
      && (filter === "All" || c.status === filter);
  });

  function toggleStatus(id: string) {
    setCustomers((prev) =>
      prev.map((c) => c.id === id ? { ...c, status: c.status === "Active" ? "Inactive" : "Active" } : c)
    );
  }

  const avgOrders = (customers.reduce((s, c) => s + c.orders, 0) / customers.length).toFixed(1);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <PageHeader title="Customers" subtitle={`${customers.length} registered customers`} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Total Customers" value={customers.length} />
        <StatCard label="Active"          value={customers.filter((c) => c.status === "Active").length}   valueClassName="text-emerald-600" />
        <StatCard label="Avg. Orders"     value={avgOrders}         sub="Per customer" />
        <StatCard label="Inactive"        value={customers.filter((c) => c.status === "Inactive").length} valueClassName="text-slate-400" />
      </div>

      <div className="flex gap-3 mb-5">
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name or email..." className="flex-1" />
        <FilterSelect value={filter} onChange={setFilter} options={["All", "Active", "Inactive"]} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs">Customer</th>
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs hidden md:table-cell">Phone</th>
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs hidden sm:table-cell">Orders</th>
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs">Spent</th>
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs hidden lg:table-cell">Joined</th>
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs">Status</th>
                <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c, i) => (
                <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 sm:px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
                        {c.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800 whitespace-nowrap">{c.name}</p>
                        <p className="text-xs text-slate-400 truncate max-w-[120px] sm:max-w-none">{c.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-5 py-3.5 text-slate-500 text-xs whitespace-nowrap hidden md:table-cell">{c.phone}</td>
                  <td className="px-4 sm:px-5 py-3.5 font-semibold text-slate-700 hidden sm:table-cell">{c.orders}</td>
                  <td className="px-4 sm:px-5 py-3.5 font-bold text-slate-800 whitespace-nowrap">{c.spent}</td>
                  <td className="px-4 sm:px-5 py-3.5 text-slate-500 text-xs whitespace-nowrap hidden lg:table-cell">{c.joined}</td>
                  <td className="px-4 sm:px-5 py-3.5"><StatusBadge status={c.status} /></td>
                  <td className="px-4 sm:px-5 py-3.5">
                    <div className="flex gap-2">
                      <button className="text-xs px-2.5 py-1 text-[#4AB7B6] bg-[#E6F7F7] rounded-lg font-semibold hover:bg-[#4AB7B6]/20 transition whitespace-nowrap">View</button>
                      <button
                        onClick={() => toggleStatus(c.id)}
                        className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition whitespace-nowrap ${
                          c.status === "Active"
                            ? "text-red-500 bg-red-50 hover:bg-red-100"
                            : "text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                        }`}
                      >
                        {c.status === "Active" ? "Block" : "Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <EmptyState icon="👤" message="No customers found" />}
      </div>
    </div>
  );
}
