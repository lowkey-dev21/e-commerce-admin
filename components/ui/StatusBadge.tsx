const STYLES: Record<string, string> = {
  // order & fulfillment
  Delivered:  "bg-emerald-50 text-emerald-600",
  Shipped:    "bg-blue-50 text-blue-600",
  Processing: "bg-orange-50 text-orange-500",
  Pending:    "bg-yellow-50 text-yellow-600",
  Canceled:   "bg-red-50 text-red-500",
  // payment / transaction
  Paid:       "bg-emerald-50 text-emerald-600",
  Success:    "bg-emerald-50 text-emerald-600",
  Refunded:   "bg-blue-50 text-blue-600",
  Failed:     "bg-red-50 text-red-500",
  // entity state
  Active:     "bg-emerald-50 text-emerald-600",
  Inactive:   "bg-slate-100 text-slate-500",
  Expired:    "bg-red-50 text-red-500",
  Hidden:     "bg-slate-100 text-slate-400",
  // moderation
  Approved:   "bg-emerald-50 text-emerald-600",
  Flagged:    "bg-red-50 text-red-500",
};

type Props = { status: string };

export default function StatusBadge({ status }: Props) {
  const cls = STYLES[status] ?? "bg-slate-100 text-slate-500";
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cls}`}>
      {status}
    </span>
  );
}
