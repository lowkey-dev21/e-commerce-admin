"use client";
import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SearchInput from "@/components/ui/SearchInput";
import FilterSelect from "@/components/ui/FilterSelect";
import StatCard from "@/components/ui/StatCard";
import EmptyState from "@/components/ui/EmptyState";

type TrackingStep = "Picked from Shop" | "On the Way" | "Out for Delivery" | "Delivered";
type TrackingOrder = {
  id: string; customer: string; email: string; date: string; total: string;
  tracking: TrackingStep; eta: string; carrier: string; trackingCode: string;
};

const STEPS: TrackingStep[] = ["Picked from Shop", "On the Way", "Out for Delivery", "Delivered"];

const INIT_ORDERS: TrackingOrder[] = [
  { id: "#ORD-8821", customer: "Sarah Johnson",   email: "sarah@email.com",    date: "28 Mar 2026", total: "$245.00", tracking: "On the Way",       eta: "Today, 1:00 – 2:00 PM",      carrier: "FedEx",         trackingCode: "FX-2938471" },
  { id: "#ORD-8820", customer: "Michael Chen",    email: "m.chen@email.com",   date: "28 Mar 2026", total: "$999.00", tracking: "Picked from Shop", eta: "Tomorrow, 10:00 – 12:00 PM", carrier: "UPS",           trackingCode: "UP-7823641" },
  { id: "#ORD-8819", customer: "Emma Davis",      email: "emma.d@email.com",   date: "27 Mar 2026", total: "$132.50", tracking: "Out for Delivery", eta: "Today, 3:00 – 5:00 PM",      carrier: "DHL",           trackingCode: "DH-1029384" },
  { id: "#ORD-8818", customer: "James Wilson",    email: "j.wilson@email.com", date: "27 Mar 2026", total: "$89.00",  tracking: "Delivered",        eta: "27 Mar 2026",                 carrier: "FedEx",         trackingCode: "FX-3849201" },
  { id: "#ORD-8817", customer: "Olivia Martinez", email: "olivia@email.com",   date: "26 Mar 2026", total: "$342.00", tracking: "Delivered",        eta: "26 Mar 2026",                 carrier: "DHL",           trackingCode: "DH-9201384" },
  { id: "#ORD-8816", customer: "Liam Thompson",   email: "liam.t@email.com",   date: "26 Mar 2026", total: "$49.99",  tracking: "On the Way",       eta: "Today, 4:00 – 6:00 PM",      carrier: "UPS",           trackingCode: "UP-5839201" },
  { id: "#ORD-8815", customer: "Ava Anderson",    email: "ava.a@email.com",    date: "25 Mar 2026", total: "$578.00", tracking: "Delivered",        eta: "25 Mar 2026",                 carrier: "Local Courier", trackingCode: "LC-3920184" },
];

const STEP_STYLES: Record<TrackingStep, string> = {
  "Picked from Shop": "bg-slate-100 text-slate-600",
  "On the Way":       "bg-blue-50 text-blue-600",
  "Out for Delivery": "bg-orange-50 text-orange-500",
  "Delivered":        "bg-emerald-50 text-emerald-600",
};

function TrackingModal({ order, onSave, onClose }: {
  order: TrackingOrder;
  onSave: (id: string, tracking: TrackingStep, eta: string, carrier: string, code: string) => void;
  onClose: () => void;
}) {
  const [tracking, setTracking] = useState<TrackingStep>(order.tracking);
  const [eta, setEta]           = useState(order.eta);
  const [carrier, setCarrier]   = useState(order.carrier);
  const [code, setCode]         = useState(order.trackingCode);
  const stepIndex = STEPS.indexOf(tracking);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5 sm:p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-1">Update Tracking</h3>
        <p className="text-sm text-slate-400 mb-5">{order.id} · {order.customer}</p>

        <div className="flex items-center gap-0 mb-6">
          {STEPS.map((step, i) => (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <button onClick={() => setTracking(step)} className="flex flex-col items-center gap-1 flex-1">
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${i <= stepIndex ? "bg-[#4AB7B6] text-white" : "bg-slate-100 text-slate-400"}`}>
                  {i < stepIndex ? "✓" : i + 1}
                </div>
                <span className={`text-[9px] sm:text-[10px] font-medium text-center leading-tight ${i <= stepIndex ? "text-[#4AB7B6]" : "text-slate-400"}`}>{step}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 mx-0.5 sm:mx-1 -mt-4 ${i < stepIndex ? "bg-[#4AB7B6]" : "bg-slate-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">ETA</label>
            <input type="text" value={eta} onChange={(e) => setEta(e.target.value)} placeholder="e.g. Today, 1:00 – 2:00 PM"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Carrier</label>
              <select value={carrier} onChange={(e) => setCarrier(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]">
                {["FedEx","UPS","DHL","USPS","Local Courier"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Tracking Code</label>
              <input type="text" value={code} onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
          <button onClick={() => onSave(order.id, tracking, eta, carrier, code)}
            className="flex-1 px-4 py-2 bg-[#4AB7B6] text-white rounded-xl text-sm font-semibold hover:bg-[#3aa3a2] transition">
            Update Tracking
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OrderTrackingPage() {
  const [orders, setOrders]         = useState<TrackingOrder[]>(INIT_ORDERS);
  const [selected, setSelected]     = useState<TrackingOrder | null>(null);
  const [search, setSearch]         = useState("");
  const [stepFilter, setStepFilter] = useState("All");

  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    return (o.customer.toLowerCase().includes(q) || o.id.toLowerCase().includes(q))
      && (stepFilter === "All" || o.tracking === stepFilter);
  });

  function handleSave(id: string, tracking: TrackingStep, eta: string, carrier: string, trackingCode: string) {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, tracking, eta, carrier, trackingCode } : o));
    setSelected(null);
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <PageHeader title="Order Tracking" subtitle="Update shipment progress shown in the mobile app" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard label="Active Shipments" value={orders.filter((o) => o.tracking !== "Delivered").length} />
        <StatCard label="Out for Delivery"  value={orders.filter((o) => o.tracking === "Out for Delivery").length} valueClassName="text-orange-500" />
        <StatCard label="On the Way"        value={orders.filter((o) => o.tracking === "On the Way").length}       valueClassName="text-blue-600" />
        <StatCard label="Delivered"         value={orders.filter((o) => o.tracking === "Delivered").length}        valueClassName="text-emerald-600" />
      </div>

      <div className="flex gap-3 mb-5">
        <SearchInput value={search} onChange={setSearch} placeholder="Search order or customer..." className="flex-1" />
        <FilterSelect value={stepFilter} onChange={setStepFilter} options={["All", ...STEPS]} />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState icon="🚚" message="No shipments found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs">Order ID</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs">Customer</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs hidden sm:table-cell">Date</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs hidden md:table-cell">Total</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs hidden lg:table-cell">Carrier</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs hidden lg:table-cell">Code</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs hidden md:table-cell">ETA</th>
                  <th className="text-left px-4 sm:px-5 py-3.5 font-semibold text-slate-500 text-xs">Step</th>
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
                    <td className="px-4 sm:px-5 py-3.5 font-bold text-slate-800 whitespace-nowrap hidden md:table-cell">{o.total}</td>
                    <td className="px-4 sm:px-5 py-3.5 text-slate-600 text-xs whitespace-nowrap hidden lg:table-cell">{o.carrier}</td>
                    <td className="px-4 sm:px-5 py-3.5 hidden lg:table-cell">
                      <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{o.trackingCode}</span>
                    </td>
                    <td className="px-4 sm:px-5 py-3.5 text-slate-500 text-xs whitespace-nowrap hidden md:table-cell">{o.eta}</td>
                    <td className="px-4 sm:px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${STEP_STYLES[o.tracking]}`}>{o.tracking}</span>
                    </td>
                    <td className="px-4 sm:px-5 py-3.5">
                      <button onClick={() => setSelected(o)}
                        className="text-xs px-2.5 py-1 text-[#4AB7B6] bg-[#E6F7F7] rounded-lg font-semibold hover:bg-[#4AB7B6]/20 transition whitespace-nowrap">
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && <TrackingModal order={selected} onSave={handleSave} onClose={() => setSelected(null)} />}
    </div>
  );
}
