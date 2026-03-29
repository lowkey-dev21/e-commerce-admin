type Props = {
  label: string;
  value: string | number;
  sub?: string;
  valueClassName?: string;
};

export default function StatCard({ label, value, sub, valueClassName = "text-slate-800" }: Props) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
      <p className="text-xs text-slate-400 font-medium">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${valueClassName}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}
