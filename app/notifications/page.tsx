"use client";
import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import EmptyState from "@/components/ui/EmptyState";

type NotifType = "order" | "promo" | "delivery" | "message";

type Notification = {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  audience: "all" | "customers" | "segment";
  sentAt: string;
  sent: number;
  opened: number;
};

const NOTIFS: Notification[] = [
  { id: "1", type: "promo",    title: "Flash Sale!",               body: "Get 20% off on all furniture this weekend. Limited time offer!", audience: "all",       sentAt: "29 Mar 2026, 09:00", sent: 1240, opened: 876 },
  { id: "2", type: "order",    title: "Purchase Completed!",       body: "Your order has been confirmed. Thank you for shopping with us!", audience: "customers", sentAt: "28 Mar 2026, 14:22", sent: 34,   opened: 34  },
  { id: "3", type: "delivery", title: "Package Shipped",           body: "Your package is on its way. Estimated delivery: Today.",         audience: "customers", sentAt: "28 Mar 2026, 10:05", sent: 28,   opened: 21  },
  { id: "4", type: "promo",    title: "New Arrivals",              body: "Check out the latest products added to our store. Shop now!",    audience: "all",       sentAt: "27 Mar 2026, 08:00", sent: 1240, opened: 603 },
  { id: "5", type: "promo",    title: "Weekend Deal",              body: "Exclusive deals for this weekend only. Don't miss out!",         audience: "segment",   sentAt: "26 Mar 2026, 12:00", sent: 420,  opened: 315 },
];

const TYPE_STYLES: Record<NotifType, { bg: string; text: string; label: string }> = {
  order:    { bg: "bg-blue-50",    text: "text-blue-600",   label: "Order"    },
  promo:    { bg: "bg-orange-50",  text: "text-orange-500", label: "Promo"    },
  delivery: { bg: "bg-[#E6F7F7]",  text: "text-[#4AB7B6]", label: "Delivery" },
  message:  { bg: "bg-purple-50",  text: "text-purple-600", label: "Message"  },
};

const EMPTY_FORM = { type: "promo" as NotifType, title: "", body: "", audience: "all" as const };

function ComposeModal({ onSend, onClose }: { onSend: (n: typeof EMPTY_FORM) => void; onClose: () => void }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const set = <K extends keyof typeof EMPTY_FORM>(k: K, v: (typeof EMPTY_FORM)[K]) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-5">Send Notification</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Type</label>
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value as NotifType)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]"
            >
              <option value="promo">Promo</option>
              <option value="order">Order</option>
              <option value="delivery">Delivery</option>
              <option value="message">Message</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Notification title..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Message</label>
            <textarea
              value={form.body}
              onChange={(e) => set("body", e.target.value)}
              placeholder="Notification message..."
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6] resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1">Audience</label>
            <select
              value={form.audience}
              onChange={(e) => set("audience", e.target.value as typeof form.audience)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]"
            >
              <option value="all">All Users</option>
              <option value="customers">Customers with Orders</option>
              <option value="segment">Custom Segment</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => { if (form.title && form.body) onSend(form); }}
            className="flex-1 px-4 py-2 bg-[#4AB7B6] text-white rounded-xl text-sm font-semibold hover:bg-[#3aa3a2] transition"
          >
            Send Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(NOTIFS);
  const [showCompose, setShowCompose] = useState(false);
  const [filter, setFilter] = useState("All");

  const filtered = notifs.filter((n) => filter === "All" || n.type === filter.toLowerCase());

  const totalSent   = notifs.reduce((s, n) => s + n.sent, 0);
  const totalOpened = notifs.reduce((s, n) => s + n.opened, 0);
  const openRate    = totalSent > 0 ? Math.round((totalOpened / totalSent) * 100) : 0;

  const handleSend = (form: typeof EMPTY_FORM) => {
    const n: Notification = {
      id: Date.now().toString(),
      ...form,
      sentAt: new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      sent: form.audience === "all" ? 1240 : form.audience === "customers" ? 34 : 120,
      opened: 0,
    };
    setNotifs((prev) => [n, ...prev]);
    setShowCompose(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Notifications"
        subtitle="Send and manage push notifications to mobile users"
        action={{ label: "Send Notification", onClick: () => setShowCompose(true) }}
      />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Sent"       value={notifs.length} />
        <StatCard label="Recipients"       value={totalSent.toLocaleString()} />
        <StatCard label="Total Opened"     value={totalOpened.toLocaleString()} valueClassName="text-emerald-600" />
        <StatCard label="Open Rate"        value={`${openRate}%`} valueClassName={openRate >= 50 ? "text-emerald-600" : "text-orange-500"} />
      </div>

      <div className="flex gap-2 mb-5">
        {["All", "Promo", "Order", "Delivery", "Message"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === f
                ? "bg-[#4AB7B6] text-white"
                : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {filtered.length === 0 ? (
          <EmptyState icon={<svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>} message="No notifications found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {["Type", "Title", "Message", "Audience", "Sent At", "Sent", "Opened", "Open Rate"].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 font-semibold text-slate-500 text-xs">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((n) => {
                  const style = TYPE_STYLES[n.type];
                  const rate  = n.sent > 0 ? Math.round((n.opened / n.sent) * 100) : 0;
                  return (
                    <tr key={n.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${style.bg} ${style.text}`}>
                          {style.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-slate-800 max-w-[140px]">
                        <p className="truncate">{n.title}</p>
                      </td>
                      <td className="px-5 py-3.5 max-w-[220px]">
                        <p className="text-xs text-slate-500 line-clamp-2">{n.body}</p>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 text-xs capitalize">{n.audience}</td>
                      <td className="px-5 py-3.5 text-slate-400 text-xs whitespace-nowrap">{n.sentAt}</td>
                      <td className="px-5 py-3.5 font-medium text-slate-700">{n.sent.toLocaleString()}</td>
                      <td className="px-5 py-3.5 font-medium text-emerald-600">{n.opened.toLocaleString()}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold ${rate >= 50 ? "text-emerald-600" : "text-orange-500"}`}>
                          {rate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showCompose && <ComposeModal onSend={handleSend} onClose={() => setShowCompose(false)} />}
    </div>
  );
}
