"use client";
import { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ─── Mock Data ──────────────────────────────────────────────────────────────

const WEEKLY_CHART_DATA = [
  { day: "Sun", revenue: 12000 },
  { day: "Mon", revenue: 28000 },
  { day: "Tue", revenue: 22000 },
  { day: "Wed", revenue: 38000 },
  { day: "Thu", revenue: 30000 },
  { day: "Fri", revenue: 42000 },
  { day: "Sat", revenue: 25000 },
];

const LAST_WEEK_CHART_DATA = [
  { day: "Sun", revenue: 9000 },
  { day: "Mon", revenue: 20000 },
  { day: "Tue", revenue: 17000 },
  { day: "Wed", revenue: 31000 },
  { day: "Thu", revenue: 26000 },
  { day: "Fri", revenue: 35000 },
  { day: "Sat", revenue: 19000 },
];

const ACTIVE_USER_BARS = [
  { v: 120 }, { v: 200 }, { v: 150 }, { v: 310 }, { v: 280 },
  { v: 180 }, { v: 240 }, { v: 350 }, { v: 290 }, { v: 220 },
  { v: 300 }, { v: 410 }, { v: 380 }, { v: 260 }, { v: 340 },
];

const COUNTRIES = [
  { flag: "🇺🇸", name: "USA", value: "30k", pct: 72, delta: "+29.8%", up: true },
  { flag: "🇧🇷", name: "Brazil", value: "30k", pct: 60, delta: "-10.8%", up: false },
  { flag: "🇦🇺", name: "Australia", value: "25k", pct: 50, delta: "+39.8%", up: true },
];

const TRANSACTIONS = [
  { no: 1, id: "#6545", customer: "Sarah Johnson", date: "01 Oct | 11:29 am", status: "Paid", amount: "$64" },
  { no: 2, id: "#6512", customer: "Michael Chen", date: "01 Oct | 11:29 am", status: "Pending", amount: "$557" },
  { no: 3, id: "#6498", customer: "Emma Davis", date: "01 Oct | 10:15 am", status: "Paid", amount: "$123" },
  { no: 4, id: "#6487", customer: "James Wilson", date: "30 Sep | 09:42 am", status: "Canceled", amount: "$89" },
  { no: 5, id: "#6471", customer: "Olivia Martinez", date: "30 Sep | 08:30 am", status: "Paid", amount: "$342" },
];

const TOP_PRODUCTS = [
  { name: "Apple iPhone 13", id: "#PR2-4547", price: "$999.00", color: "#E6F7F7", letter: "A" },
  { name: "Samsung Galaxy S23", id: "#PR2-4548", price: "$799.00", color: "#FFF3E4", letter: "S" },
  { name: "Sony WH-1000XM5", id: "#PR2-4549", price: "$349.00", color: "#F0F4FF", letter: "S" },
  { name: "iPad Air M1", id: "#PR2-4550", price: "$599.00", color: "#FFF0F0", letter: "I" },
  { name: "AirPods Pro (2nd Gen)", id: "#PR2-4551", price: "$249.00", color: "#F5F0FF", letter: "A" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

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
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full ${
        up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"
      }`}
    >
      {up ? "↑" : "↓"} {value}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Paid: "bg-emerald-50 text-emerald-600",
    Pending: "bg-orange-50 text-orange-500",
    Canceled: "bg-red-50 text-red-500",
  };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${styles[status] ?? "bg-slate-100 text-slate-500"}`}>
      {status}
    </span>
  );
}

// ─── Main Dashboard ──────────────────────────────────────────────────────────

export default function DashboardPage() {
  const [weekTab, setWeekTab] = useState<"this" | "last">("this");
  const [activeMetric, setActiveMetric] = useState(0);

  const chartData = weekTab === "this" ? WEEKLY_CHART_DATA : LAST_WEEK_CHART_DATA;

  const weekMetrics = [
    { label: "Customers", value: "52k" },
    { label: "Total Products", value: "3.5k" },
    { label: "Stock Products", value: "2.5k" },
    { label: "Out of Stock", value: "0.5k" },
    { label: "Revenue", value: "250k" },
  ];

  return (
    <div className="p-5 space-y-5">

      {/* ── Row 1: Stat Cards ── */}
      <div className="grid grid-cols-3 gap-4">

        {/* Total Sales */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Sales</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Last 7 days</p>
            </div>
            <DotsMenu />
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-2xl font-bold text-slate-800">$350K</span>
            <TrendBadge value="10.4%" up />
            <span className="text-xs text-slate-400 mb-0.5">Sales</span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Previous 7 days{" "}
            <span className="text-[#4AB7B6] font-medium">($235K)</span>
          </p>
          <button className="text-xs font-medium text-[#4AB7B6] border border-[#4AB7B6] px-4 py-1.5 rounded-full hover:bg-[#E6F7F7] transition">
            Details
          </button>
        </div>

        {/* Total Orders */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-slate-500">Total Orders</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Last 7 days</p>
            </div>
            <DotsMenu />
          </div>
          <div className="flex items-end gap-2 mb-1">
            <span className="text-2xl font-bold text-slate-800">10.7K</span>
            <TrendBadge value="14.4%" up />
            <span className="text-xs text-slate-400 mb-0.5">order</span>
          </div>
          <p className="text-xs text-slate-400 mb-3">
            Previous 7 days{" "}
            <span className="text-[#4AB7B6] font-medium">(7.4k)</span>
          </p>
          <button className="text-xs font-medium text-[#4AB7B6] border border-[#4AB7B6] px-4 py-1.5 rounded-full hover:bg-[#E6F7F7] transition">
            Details
          </button>
        </div>

        {/* Pending & Canceled */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-xs font-semibold text-slate-500">Pending &amp; Canceled</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Last 7 days</p>
            </div>
            <DotsMenu />
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-xl font-bold text-slate-800">509</p>
              <p className="text-[10px] text-slate-400">Pending</p>
              <p className="text-[10px] text-slate-500 mt-1">user <span className="font-semibold">204</span></p>
            </div>
            <div className="w-px bg-slate-100" />
            <div>
              <p className="text-xl font-bold text-slate-800">94</p>
              <p className="text-[10px] text-slate-400">Canceled</p>
              <TrendBadge value="14.4%" up={false} />
            </div>
          </div>
          <button className="mt-3 text-xs font-medium text-[#4AB7B6] border border-[#4AB7B6] px-4 py-1.5 rounded-full hover:bg-[#E6F7F7] transition">
            Details
          </button>
        </div>
      </div>

      {/* ── Row 2: Chart + Right widgets ── */}
      <div className="grid grid-cols-3 gap-4">

        {/* Report for this week */}
        <div className="col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Report for this week</h3>
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg bg-slate-100 p-0.5 text-xs">
                <button
                  onClick={() => setWeekTab("this")}
                  className={`px-3 py-1 rounded-md font-medium transition ${weekTab === "this" ? "bg-[#4AB7B6] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  This week
                </button>
                <button
                  onClick={() => setWeekTab("last")}
                  className={`px-3 py-1 rounded-md font-medium transition ${weekTab === "last" ? "bg-[#4AB7B6] text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Last week
                </button>
              </div>
              <DotsMenu />
            </div>
          </div>

          {/* Metrics row */}
          <div className="flex gap-6 mb-4 border-b border-slate-100 pb-3">
            {weekMetrics.map((m, i) => (
              <button
                key={m.label}
                onClick={() => setActiveMetric(i)}
                className="flex flex-col items-start group"
              >
                <span className={`text-lg font-bold ${activeMetric === i ? "text-[#4AB7B6]" : "text-slate-700"}`}>
                  {m.value}
                </span>
                <span className="text-[10px] text-slate-400">{m.label}</span>
                {activeMetric === i && <span className="mt-1 block w-full h-0.5 bg-[#4AB7B6] rounded-full" />}
              </button>
            ))}
          </div>

          {/* Area Chart */}
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4AB7B6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#4AB7B6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{ borderRadius: 10, border: "1px solid #E2E8F0", fontSize: 12, padding: "6px 12px" }}
                formatter={(value) => [`$${(Number(value) / 1000).toFixed(1)}k`, "Revenue"]}
                labelStyle={{ fontWeight: 600, color: "#1E293B" }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4AB7B6"
                strokeWidth={2.5}
                fill="url(#tealGradient)"
                dot={false}
                activeDot={{ r: 5, fill: "#4AB7B6", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          {/* Active Users */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex-1">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Users in last 30 minutes</p>
                <p className="text-2xl font-bold text-slate-800 mt-0.5">21.5K</p>
                <p className="text-[10px] text-slate-400">Users per minute</p>
              </div>
              <DotsMenu />
            </div>
            <div className="mt-2 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ACTIVE_USER_BARS} barSize={6} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Bar dataKey="v" fill="#4AB7B6" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales by Country */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex-1">
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
                    <TrendBadge value={c.delta.replace(/[+-]/, "")} up={c.up} />
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4AB7B6] rounded-full"
                      style={{ width: `${c.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full text-xs font-medium text-[#4AB7B6] border border-[#4AB7B6] py-1.5 rounded-full hover:bg-[#E6F7F7] transition">
              View Insight
            </button>
          </div>
        </div>
      </div>

      {/* ── Row 3: Transaction + Top Products ── */}
      <div className="grid grid-cols-5 gap-4">

        {/* Transaction Table */}
        <div className="col-span-3 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Transaction</h3>
            <button className="flex items-center gap-1.5 text-xs font-medium bg-[#4AB7B6] text-white px-3 py-1.5 rounded-lg hover:bg-[#3aa3a2] transition">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Filter
            </button>
          </div>

          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                {["No", "Id Customer", "Order Date", "Status", "Amount"].map((h) => (
                  <th key={h} className="pb-2 text-left font-semibold text-slate-400 first:w-8">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TRANSACTIONS.map((t) => (
                <tr key={t.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition">
                  <td className="py-2.5 text-slate-400">{t.no}.</td>
                  <td className="py-2.5 font-semibold text-slate-700">{t.id}</td>
                  <td className="py-2.5 text-slate-500">{t.date}</td>
                  <td className="py-2.5">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="py-2.5 font-semibold text-slate-700">{t.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Top Products */}
        <div className="col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-800">Top Products</h3>
            <button className="text-xs text-[#4AB7B6] font-medium hover:underline">All product</button>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-100 text-xs text-slate-700 placeholder-slate-400 border border-transparent focus:outline-none focus:border-[#4AB7B6] focus:bg-white transition"
            />
            <svg
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Product list */}
          <div className="space-y-2">
            {TOP_PRODUCTS.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-1.5 hover:bg-slate-50 rounded-lg px-1.5 transition cursor-pointer">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: p.color, color: "#4AB7B6" }}
                >
                  {p.letter}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-700 truncate">{p.name}</p>
                  <p className="text-[10px] text-slate-400">{p.id}</p>
                </div>
                <span className="text-xs font-bold text-slate-800 shrink-0">{p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
