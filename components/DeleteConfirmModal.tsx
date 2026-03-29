"use client";
import Modal from "@/components/ui/Modal";

type Props = { onConfirm: () => void; onCancel: () => void };

export default function DeleteConfirmModal({ onConfirm, onCancel }: Props) {
  return (
    <Modal
      title="Confirm Delete"
      onClose={onCancel}
      maxWidth="max-w-sm"
      footer={
        <>
          <button onClick={onCancel} className="px-5 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-5 py-2 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition">
            Delete
          </button>
        </>
      }
    >
      <div className="text-center py-4">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mx-auto mb-3">
          <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <p className="text-sm text-slate-500">This action cannot be undone. The item will be permanently removed.</p>
      </div>
    </Modal>
  );
}
