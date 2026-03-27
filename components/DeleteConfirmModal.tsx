"use client";

type Props = { onConfirm: () => void; onCancel: () => void };

export default function DeleteConfirmModal({ onConfirm, onCancel }: Props) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 text-center">
        <div className="text-4xl mb-4">🗑️</div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">Delete Product?</h3>
        <p className="text-slate-500 text-sm mb-6">
          This action cannot be undone. The product will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
