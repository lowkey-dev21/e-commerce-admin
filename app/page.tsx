"use client";
import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const CHART_DATA = [
  { day: "Mon", revenue: 12400 },
  { day: "Tue", revenue: 18200 },
  { day: "Wed", revenue: 15800 },
  { day: "Thu", revenue: 22100 },
  { day: "Fri", revenue: 28400 },
  { day: "Sat", revenue: 31200 },
  { day: "Sun", revenue: 24600 },
];
const CHART_DATA_LAST = CHART_DATA.map((d) => ({ ...d, revenue: Math.round(d.revenue * 0.78) }));

const RECENT_ORDERS = [
  { id: "ORD-8821", customer: "Sarah Johnson",   date: "28 Mar, 09:14 AM", status: "shipped",    amount: "$245.00" },
  { id: "ORD-8820", customer: "Michael Chen",    date: "28 Mar, 08:02 AM", status: "processing", amount: "$999.00" },
  { id: "ORD-8819", customer: "Emma Davis",      date: "27 Mar, 06:45 PM", status: "shipped",    amount: "$132.50" },
  { id: "ORD-8818", customer: "James Wilson",    date: "27 Mar, 04:30 PM", status: "delivered",  amount: "$89.00"  },
  { id: "ORD-8817", customer: "Olivia Martinez", date: "26 Mar, 02:15 PM", status: "delivered",  amount: "$342.00" },
];

const TOP_PRODUCTS = [
  { name: "AirPods Pro Max",    sold: 142, revenue: 42600 },
  { name: "Nike Air Force 1",   sold: 218, revenue: 28340 },
  { name: "MacBook Pro 14\"",   sold: 38,  revenue: 75620 },
  { name: "Samsung 4K Monitor", sold: 74,  revenue: 22200 },
  { name: "Levi's 501 Jeans",   sold: 195, revenue: 13650 },
];

const COUNTRIES = [
  { flag: "🇺🇸", name: "USA",       value: "30k", pct: 72, delta: "29.8%", up: true  },
  { flag: "🇧🇷", name: "Brazil",    value: "18k", pct: 60, delta: "10.8%", up: false },
  { flag: "🇦🇺", name: "Australia", value: "12k", pct: 50, delta: "39.8%", up: true  },
];

const USER_BARS = [120,200,150,310,280,180,240,350,290,220,300,410,380,260,340].map((v) => ({ v }));

function DotsMenu() {
  return (
    <button className="p-1 rounded-lg hover:bg-slate-100 transition text-slate-400">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
      </svg>
    </button>
  );
}
function TrendBadge({ value, up }: { value: string; up: boolean }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full ${up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
      {up ? "↑" : "↓"} {value}
    </span>
  );
}
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    delivered:  "bg-emerald-50 text-emerald-600",
    processing: "bg-orange-50 text-orange-500",
    pending:    "bg-orange-50 text-orange-500",
    shipped:    "bg-blue-50 text-blue-600",
    cancelled:  "bg-red-50 text-red-500",
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles[status] ?? "bg-slate-100 text-slate-500"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n}`;
}

export default function DashboardPage() {
  const [weekTab, setWeekTab]           = useState<"this" | "last">("this");
  const [activeMetric, setActiveMetric] = useState(0);
  const chartData = weekTab === "this" ? CHART_DATA : CHART_DATA_LAST;

  const weekMetrics = [
    { label: "Revenue",        value: "$153.5K" },
    { label: "Customers",      value: "2,840"   },
    { label: "Products",       value: "348"     },
    { label: "In Stock",       value: "312"     },
    { label: "Out of Stock",   value: "36"      },
  ];

  return (
    <div className="p-4 sm:p-5 space-y-4 sm:space-y-5">

      {/* ── Row 1: Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Revenue</p>
              <p className="text-[10px] text-slate-400 mt-0.5">All time</p>
            </div>
            <DotsMenu />
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-2xl font-bold text-slate-800">$153.5K</span>
            <TrendBadge value="10.4%" up />
          </div>
          <p className="text-xs text-slate-400 mb-3">Total items sold <span className="text-[#4AB7B6] font-medium">4,820</span></p>
          <button className="text-xs font-medium text-[#4AB7B6] border border-[#4AB7B6] px-4 py-1.5 rounded-full hover:bg-[#E6F7F7] transition">Details</button>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Orders</p>
              <p className="text-[10px] text-slate-400 mt-0.5">All time</p>
            </div>
            <DotsMenu />
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-2xl font-bold text-slate-800">1,284</span>
            <TrendBadge value="14.4%" up />
            <span className="text-xs text-slate-400 mb-0.5">orders</span>
          </div>
          <p className="text-xs text-slate-400 mb-3">Customers <span className="text-[#4AB7B6] font-medium">2,840</span></p>
          <button className="text-xs font-medium text-[#4AB7B6] border border-[#4AB7B6] px-4 py-1.5 rounded-full hover:bg-[#E6F7F7] transition">Details</button>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-slate-500">Pending &amp; Canceled</p>
              <p className="text-[10px] text-slate-400 mt-0.5">All orders</p>
            </div>
            <DotsMenu />
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-xl font-bold text-slate-800">48</p>
              <p className="text-[10px] text-slate-400">Pending</p>
            </div>
            <div className="w-px bg-slate-100" />
            <div>
              <p className="text-xl font-bold text-slate-800">23</p>
              <p className="text-[10px] text-slate-400">Canceled</p>
              <TrendBadge value="14.4%" up={false} />
            </div>
          </div>
          <button className="mt-3 text-xs font-medium text-[#4AB7B6] border border-[#4AB7B6] px-4 py-1.5 rounded-full hover:bg-[#E6F7F7] transition">Details</button>
        </div>
      </div>

      {/* ── Row 2: Chart + Right widgets ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Revenue — last 7 days</h3>
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs">
                <button onClick={() => setWeekTab("this")} className={`px-2 sm:px-3 py-1 rounded-md font-medium transition ${weekTab === "this" ? "bg-[#4AB7B6] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>This week</button>
                <button onClick={() => setWeekTab("last")} className={`px-2 sm:px-3 py-1 rounded-md font-medium transition ${weekTab === "last" ? "bg-[#4AB7B6] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>Last week</button>
              </div>
              <DotsMenu />
            </div>
          </div>

          <div className="flex gap-3 sm:gap-6 mb-4 border-b border-slate-100 pb-3 overflow-x-auto">
            {weekMetrics.map((m, i) => (
              <button key={m.label} onClick={() => setActiveMetric(i)} className="flex flex-col items-start shrink-0">
                <span className={`text-base sm:text-lg font-bold ${activeMetric === i ? "text-[#4AB7B6]" : "text-slate-700"}`}>{m.value}</span>
                <span className="text-[10px] text-slate-400">{m.label}</span>
                {activeMetric === i && <span className="mt-1 block w-full h-0.5 bg-[#4AB7B6] rounded-full" />}
              </button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#4AB7B6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#4AB7B6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 12, padding: "6px 12px" }}
                formatter={(value) => [`$${(Number(value) / 1000).toFixed(1)}k`, "Revenue"]}
                labelStyle={{ fontWeight: 600, color: "#1E293B" }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#4AB7B6" strokeWidth={2.5} fill="url(#tealGradient)" dot={false} activeDot={{ r: 5, fill: "#4AB7B6", stroke: "#fff", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Registered users</p>
                <p className="text-2xl font-bold text-slate-800 mt-0.5">2,840</p>
                <p className="text-[10px] text-slate-400">Total customers</p>
              </div>
              <DotsMenu />
            </div>
            <div className="mt-2 h-14 sm:h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={USER_BARS} barSize={5} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Bar dataKey="v" fill="#4AB7B6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-slate-800">Sales by Country</p>
              <span className="text-[10px] text-slate-400 font-medium">Sales</span>
            </div>
            <div className="space-y-3">
              {COUNTRIES.map((c) => (
                <div key={c.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{c.flag}</span>
                      <div>
                        <p className="text-xs font-semibold text-slate-700 leading-tight">{c.value}</p>
                        <p className="text-[10px] text-slate-400 leading-tight">{c.name}</p>
                      </div>
                    </div>
                    <TrendBadge value={c.delta} up={c.up} />
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#4AB7B6] rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full text-xs font-medium text-[#4AB7B6] border border-[#4AB7B6] py-1.5 rounded-full hover:bg-[#E6F7F7] transition">View Insight</button>
          </div>
        </div>
      </div>

      {/* ── Row 3: Orders + Top Products ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        <div className="lg:col-span-3 bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Recent Orders</h3>
            <button className="flex items-center gap-1.5 text-xs font-medium bg-[#4AB7B6] text-white px-3 py-1.5 rounded-lg hover:bg-[#3aa3a2] transition">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Filter
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100">
                  {["No", "Order ID", "Customer", "Date", "Status", "Amount"].map((h) => (
                    <th key={h} className="pb-2 text-left font-semibold text-slate-400 first:w-6">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((o, i) => (
                  <tr key={o.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition">
                    <td className="py-2.5 text-slate-400">{i + 1}.</td>
                    <td className="py-2.5 font-semibold text-[#4AB7B6] whitespace-nowrap">{o.id}</td>
                    <td className="py-2.5 text-slate-700 font-medium whitespace-nowrap">{o.customer}</td>
                    <td className="py-2.5 text-slate-500 whitespace-nowrap">{o.date}</td>
                    <td className="py-2.5"><StatusBadge status={o.status} /></td>
                    <td className="py-2.5 font-semibold text-slate-700 whitespace-nowrap">{o.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800">Top Products</h3>
            <button className="text-xs text-[#4AB7B6] font-medium hover:underline">All products</button>
          </div>

          <div className="relative mb-3">
            <input type="text" placeholder="Search" className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-100 text-xs text-slate-700 placeholder-slate-400 border border-transparent focus:outline-none focus:border-[#4AB7B6] focus:bg-white transition" />
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="space-y-2">
            {TOP_PRODUCTS.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 py-1.5 hover:bg-slate-50 rounded-lg px-1.5 transition cursor-pointer">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: ["#E6F7F7","#FFF3E4","#F0F4FF","#FFF0F0","#F5F0FF"][i % 5], color: "#4AB7B6" }}>
                  {p.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{p.name}</p>
                  <p className="text-[10px] text-slate-400">{p.sold} sold</p>
                </div>
                <span className="text-xs font-bold text-slate-800 shrink-0">{fmt(p.revenue)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
