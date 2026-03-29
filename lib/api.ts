import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Types ──────────────────────────────────────────────────────────────────

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviewCount: number;
  createdAt: string;
};

export type OrderItem = {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
};

export type TrackingInfo = {
  carrier: string;
  trackingCode: string;
  eta: string;
};

export type Order = {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  customerInfo: CustomerInfo;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingInfo?: TrackingInfo;
  createdAt: string;
  updatedAt: string;
};

export type UserAddress = {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
};

export type User = {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: UserAddress;
  isEmailVerified: boolean;
  role: 'user';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Admin = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type SalesOverview = {
  totalRevenue: number;
  totalOrders: number;
  totalItemsSold: number;
  totalCustomers: number;
  totalProducts: number;
  inStockProducts: number;
  outOfStockProducts: number;
  dailyData: Array<{ date: string; day: string; revenue: number; orders: number }>;
  categoryBreakdown: Array<{ _id: string; revenue: number; count: number }>;
  topProducts: Array<{ _id: string; revenue: number; sold: number }>;
};

// ── API modules ────────────────────────────────────────────────────────────

export const productApi = {
  getAll: (params?: { search?: string; category?: string }) =>
    api.get<{ success: boolean; data: Product[] }>('/products', { params }),
  getById: (id: string) =>
    api.get<{ success: boolean; data: Product }>(`/products/${id}`),
  create: (data: Partial<Product>) =>
    api.post<{ success: boolean; data: Product }>('/products', data),
  update: (id: string, data: Partial<Product>) =>
    api.put<{ success: boolean; data: Product }>(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const orderApi = {
  getAll: () =>
    api.get<{ success: boolean; count: number; data: Order[] }>('/orders'),
  getById: (id: string) =>
    api.get<{ success: boolean; data: Order }>(`/orders/${id}`),
  updateStatus: (
    id: string,
    data: { status?: Order['status']; trackingInfo?: Partial<TrackingInfo> }
  ) => api.patch<{ success: boolean; data: Order }>(`/orders/${id}`, data),
};

export const salesApi = {
  getOverview: () =>
    api.get<{ success: boolean; data: SalesOverview }>('/sales/overview'),
};

export const adminApi = {
  getUsers: (params?: { search?: string; status?: string }) =>
    api.get<{ success: boolean; count: number; data: User[] }>('/admin/users', { params }),
  getUserById: (id: string) =>
    api.get<{ success: boolean; data: User }>(`/admin/users/${id}`),
  updateUserStatus: (id: string, isActive: boolean) =>
    api.patch<{ success: boolean; data: User }>(`/admin/users/${id}/status`, { isActive }),
};

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ success: boolean; token: string; data: { name: string; email: string } }>(
      '/auth/login',
      { email, password }
    ),
  register: (name: string, email: string, password: string) =>
    api.post<{ success: boolean; token: string; data: Admin }>(
      '/auth/register',
      { name, email, password }
    ),
  me: () => api.get<{ success: boolean; data: Admin }>('/auth/me'),
};

export default api;
