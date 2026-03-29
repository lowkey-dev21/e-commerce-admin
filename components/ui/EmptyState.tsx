type Props = { icon?: React.ReactNode; message?: string };

function DefaultIcon() {
  return (
    <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m4-3h8" />
    </svg>
  );
}

export default function EmptyState({ icon, message = "No results found" }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-2 text-slate-400">
      {icon ?? <DefaultIcon />}
      <p className="text-sm text-slate-500 font-medium">{message}</p>
    </div>
  );
}
