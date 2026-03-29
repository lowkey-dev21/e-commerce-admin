type Action = { label: string; onClick: () => void; icon?: React.ReactNode };

type Props = {
  title: string;
  subtitle?: string;
  action?: Action;
  extra?: React.ReactNode;
};

export default function PageHeader({ title, subtitle, action, extra }: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {extra}
        {action && (
          <button
            onClick={action.onClick}
            className="bg-[#4AB7B6] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#3aa3a2] transition-colors flex items-center gap-2"
          >
            {action.icon ?? <span>+</span>}
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}
