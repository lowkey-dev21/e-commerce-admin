"use client";
import { useState } from "react";
import DeleteConfirmModal from "@/components/DeleteConfirmModal";

type Role = { id: number; name: string; description: string; users: number; color: string; textColor: string; permissions: string[] };

const INIT_ROLES: Role[] = [
  { id: 1, name: "Super Admin",     description: "Full access to all system features",           users: 1, color: "#E6F7F7", textColor: "#4AB7B6", permissions: ["dashboard","products","orders","customers","transactions","coupons","categories","brands","admin"] },
  { id: 2, name: "Product Manager", description: "Manage products, categories and brands",       users: 3, color: "#FFF3E4", textColor: "#F4A94E", permissions: ["dashboard","products","categories","brands"] },
  { id: 3, name: "Order Manager",   description: "View and manage customer orders",               users: 5, color: "#F0F4FF", textColor: "#3B82F6", permissions: ["dashboard","orders","customers","transactions"] },
  { id: 4, name: "Support Agent",   description: "View orders and handle customer queries",       users: 8, color: "#FFF0F0", textColor: "#EF4444", permissions: ["dashboard","orders","customers"] },
  { id: 5, name: "Marketing",       description: "Manage coupons and promotions",                 users: 2, color: "#F5F0FF", textColor: "#8B5CF6", permissions: ["dashboard","coupons"] },
];

const ALL_PERMISSIONS = ["dashboard","products","orders","customers","transactions","coupons","categories","brands","admin"];
const INPUT = "w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4AB7B6]/30 focus:border-[#4AB7B6]";

let nextId = 10;

type FormState = { name: string; description: string; permissions: string[] };
const EMPTY_FORM: FormState = { name: "", description: "", permissions: [] };

export default function AdminRolesPage() {
  const [roles, setRoles]           = useState<Role[]>(INIT_ROLES);
  const [showForm, setShowForm]     = useState(false);
  const [editRole, setEditRole]     = useState<Role | null>(null);
  const [deleteId, setDeleteId]     = useState<number | null>(null);
  const [form, setForm]             = useState<FormState>(EMPTY_FORM);

  function openCreate() {
    setEditRole(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  function openEdit(role: Role) {
    setEditRole(role);
    setForm({ name: role.name, description: role.description, permissions: [...role.permissions] });
    setShowForm(true);
  }

  function togglePerm(p: string) {
    setForm((f) => ({
      ...f,
      permissions: f.permissions.includes(p) ? f.permissions.filter((x) => x !== p) : [...f.permissions, p],
    }));
  }

  function handleSave() {
    if (!form.name.trim()) return;
    if (editRole) {
      setRoles((prev) => prev.map((r) => r.id === editRole.id ? { ...r, name: form.name, description: form.description, permissions: form.permissions } : r));
    } else {
      setRoles((prev) => [...prev, { id: nextId++, name: form.name, description: form.description, users: 0, color: "#F1F5F9", textColor: "#64748B", permissions: form.permissions }]);
    }
    setShowForm(false);
  }

  function handleDelete() {
    if (!deleteId) return;
    setRoles((prev) => prev.filter((r) => r.id !== deleteId));
    setDeleteId(null);
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Admin Role</h2>
          <p className="text-sm text-slate-400 mt-0.5">{roles.length} roles defined</p>
        </div>
        <button
          onClick={openCreate}
          className="bg-[#4AB7B6] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#3aa3a2] transition flex items-center gap-2"
        >
          <span>+</span> New Role
        </button>
      </div>

      {/* Role cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {roles.map((role) => (
          <div key={role.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
              <div className="px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: role.color, color: role.textColor }}>
                {role.name}
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(role)} className="text-xs text-[#4AB7B6] bg-[#E6F7F7] px-2.5 py-1 rounded-lg font-semibold hover:bg-[#4AB7B6]/20 transition">Edit</button>
                {role.id !== 1 && <button onClick={() => setDeleteId(role.id)} className="text-xs text-red-500 bg-red-50 px-2.5 py-1 rounded-lg font-semibold hover:bg-red-100 transition">Delete</button>}
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-3">{role.description}</p>
            <p className="text-xs text-slate-400 mb-3">
              <span className="font-semibold text-slate-700">{role.users}</span> user{role.users !== 1 ? "s" : ""} assigned
            </p>
            <div className="flex flex-wrap gap-1.5">
              {role.permissions.map((p) => (
                <span key={p} className="text-[10px] font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full capitalize">{p}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Permission matrix */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Permission Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left pb-3 pr-4 font-semibold text-slate-500 w-36">Role</th>
                {ALL_PERMISSIONS.map((p) => (
                  <th key={p} className="pb-3 px-2 font-semibold text-slate-500 capitalize text-center">{p}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 pr-4"><span className="font-semibold text-slate-700">{role.name}</span></td>
                  {ALL_PERMISSIONS.map((p) => (
                    <td key={p} className="py-3 px-2 text-center">
                      {role.permissions.includes(p) ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-[#4AB7B6] rounded-full">
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-5 h-5 bg-slate-100 rounded-full">
                          <svg className="w-3 h-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-slate-800">{editRole ? "Edit Role" : "Create New Role"}</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 hover:bg-slate-100 rounded-lg transition text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Role Name</label>
                <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Content Editor" className={INPUT} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Description</label>
                <input type="text" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Brief description..." className={INPUT} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Permissions</label>
                <div className="grid grid-cols-3 gap-2">
                  {ALL_PERMISSIONS.map((p) => (
                    <label key={p} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.permissions.includes(p)} onChange={() => togglePerm(p)} className="w-3.5 h-3.5 accent-[#4AB7B6]" />
                      <span className="text-xs text-slate-600 capitalize">{p}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2 bg-[#4AB7B6] text-white rounded-xl text-sm font-semibold hover:bg-[#3aa3a2] transition">{editRole ? "Save Changes" : "Create Role"}</button>
            </div>
          </div>
        </div>
      )}

      {deleteId && <DeleteConfirmModal onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}
