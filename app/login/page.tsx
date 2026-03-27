"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authApi } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@ecommerce.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.login(email, password);
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminName", res.data.data.name);
      toast.success(`Welcome back, ${res.data.data.name}!`);
      router.push("/");
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🛍</div>
          <h1 className="text-2xl font-bold text-slate-800">ShopEase Admin</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 focus:border-[#6C63FF]"
              placeholder="admin@ecommerce.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/30 focus:border-[#6C63FF]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#6C63FF] text-white font-semibold rounded-xl hover:bg-[#5a52d5] transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 p-3 bg-slate-50 rounded-xl text-xs text-slate-500 text-center">
          <p className="font-semibold mb-1">Default credentials</p>
          <p>admin@ecommerce.com</p>
          <p>admin123</p>
        </div>
      </div>
    </div>
  );
}
