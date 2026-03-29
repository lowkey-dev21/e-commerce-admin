"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/products": "Product List",
  "/products/reviews": "Product Reviews",
  "/orders": "Order Management",
  "/orders/tracking": "Order Tracking",
  "/customers": "Customers",
  "/coupons": "Coupon Code",
  "/categories": "Categories",
  "/transactions": "Transaction",
  "/banners": "Banners",
  "/notifications": "Notifications",
  "/admin/roles": "Admin & Permissions",
};

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const title = PAGE_TITLES[pathname] ?? "Dashboard";
  const [adminName, setAdminName] = useState("A");

  useEffect(() => {
    const name = localStorage.getItem("adminName");
    if (name) setAdminName(name);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    router.push("/login");
  };

  const initial = adminName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 h-[50px] flex items-center gap-3 shrink-0">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition shrink-0"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <h2 className="text-base font-bold text-slate-800 shrink-0">{title}</h2>

      {/* Search — hidden on small screens */}
      <div className="flex-1 max-w-md relative mx-2 hidden md:block">
        <input
          type="text"
          placeholder="Search data, users, or reports"
          className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-100 text-sm text-slate-700 placeholder-slate-400 border border-transparent focus:outline-none focus:border-[#4AB7B6] focus:bg-white transition"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="ml-auto flex items-center gap-1">
        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition">
          <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#4AB7B6] rounded-full" />
        </button>

        {/* Logout */}
        <button onClick={handleLogout} title="Logout" className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 text-slate-500 transition">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>

        {/* Avatar */}
        <div title={adminName} className="w-8 h-8 rounded-full bg-[#4AB7B6] flex items-center justify-center text-white text-xs font-bold cursor-pointer select-none">
          {initial}
        </div>
      </div>
    </header>
  );
}
