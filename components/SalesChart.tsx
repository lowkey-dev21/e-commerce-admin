"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DayData = { date: string; day: string; revenue: number; orders: number };

export default function SalesChart({ data }: { data: DayData[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 12, fill: "#94A3B8" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#94A3B8" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v}`}
        />
        <Tooltip
          contentStyle={{ borderRadius: 12, border: "1px solid #E2E8F0", fontSize: 13 }}
          formatter={(value: number) => [`$${value.toFixed(2)}`, "Revenue"]}
          labelStyle={{ fontWeight: 600, color: "#1E293B" }}
        />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#6C63FF"
          strokeWidth={2.5}
          dot={{ r: 4, fill: "#6C63FF", strokeWidth: 2, stroke: "#fff" }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
