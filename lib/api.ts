import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Attach JWT token if present
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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

export type SalesOverview = {
  totalRevenue: number;
  totalOrders: number;
  totalItemsSold: number;
  dailyData: Array<{ date: string; day: string; revenue: number; orders: number }>;
  categoryBreakdown: Array<{ _id: string; revenue: number; count: number }>;
  topProducts: Array<{ _id: string; revenue: number; sold: number }>;
};

export const productApi = {
  getAll: (params?: { search?: string; category?: string }) =>
    api.get<{ success: boolean; data: Product[] }>('/products', { params }),
  getById: (id: string) => api.get<{ success: boolean; data: Product }>(`/products/${id}`),
  create: (data: Partial<Product>) => api.post<{ success: boolean; data: Product }>('/products', data),
  update: (id: string, data: Partial<Product>) =>
    api.put<{ success: boolean; data: Product }>(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export const salesApi = {
  getOverview: () => api.get<{ success: boolean; data: SalesOverview }>('/sales/overview'),
};

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ success: boolean; token: string; data: { name: string; email: string } }>(
      '/auth/login',
      { email, password }
    ),
};

export default api;
