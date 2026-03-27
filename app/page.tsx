"use client";
import { useEffect, useState } from "react";
import { salesApi, SalesOverview } from "@/lib/api";
import SalesChart from "@/components/SalesChart";
import CategoryChart from "@/components/CategoryChart";

function StatCard({ icon, label, value, sub }: { icon: string; label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm font-semibold text-slate-500">{label}</span>
      </div>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
      {sub && <p className="text-sm text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<SalesOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    salesApi
      .getOverview()
      .then((res) => setData(res.data.data))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">📊</div>
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <span className="text-4xl">⚠️</span>
        <p className="text-slate-600 font-medium">Failed to load dashboard data</p>
        <p className="text-xs text-slate-400">{error}</p>
        <p className="text-xs text-slate-400">Make sure the server is running on port 5000</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Sales Overview</h2>
        <p className="text-slate-500 mt-1">Performance summary across all time</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon="💰"
          label="Total Revenue"
          value={`$${data.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          sub="All time"
        />
        <StatCard
          icon="📋"
          label="Total Orders"
          value={data.totalOrders.toLocaleString()}
          sub="All time"
        />
        <StatCard
          icon="📦"
          label="Items Sold"
          value={data.totalItemsSold.toLocaleString()}
          sub="All time"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Revenue — Last 7 Days</h3>
          <SalesChart data={data.dailyData} />
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Revenue by Category</h3>
          <CategoryChart data={data.categoryBreakdown} />
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4">🏆 Top Products by Revenue</h3>
        <div className="space-y-3">
          {data.topProducts.map((p, i) => (
            <div key={p._id} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center ${
                    i === 0 ? "bg-yellow-100 text-yellow-700" :
                    i === 1 ? "bg-slate-100 text-slate-600" :
                    i === 2 ? "bg-orange-100 text-orange-700" :
                    "bg-slate-50 text-slate-400"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="font-medium text-slate-700 text-sm">{p._id}</span>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800">${p.revenue.toFixed(2)}</p>
                <p className="text-xs text-slate-400">{p.sold} sold</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
