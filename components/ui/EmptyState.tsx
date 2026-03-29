type Props = { icon?: string; message?: string };

export default function EmptyState({ icon = "📭", message = "No results found" }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-2">
      <span className="text-3xl">{icon}</span>
      <p className="text-sm text-slate-500 font-medium">{message}</p>
    </div>
  );
}
