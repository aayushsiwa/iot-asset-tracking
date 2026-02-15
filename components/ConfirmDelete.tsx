"use client";

import { useState } from "react";

interface Props {
  onConfirm: () => void;
  label?: string;
}

const ConfirmDelete: React.FC<Props> = ({ onConfirm, label = "item" }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-xs text-red-500 hover:text-red-400 transition"
      >
        Delete
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-80 shadow-xl">
            <h2 className="text-lg font-semibold mb-3 text-red-500">
              Confirm Delete
            </h2>

            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6">
              Are you sure you want to delete this {label}? This action cannot
              be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded border"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onConfirm();
                  setOpen(false);
                }}
                className="px-3 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmDelete;
