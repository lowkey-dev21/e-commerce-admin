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
        <div className="text-4xl mb-3">🗑️</div>
        <p className="text-sm text-slate-500">This action cannot be undone. The item will be permanently removed.</p>
      </div>
    </Modal>
  );
}
