import React from 'react';

export default function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  return (
    <>
      <input type="checkbox" className="modal-toggle" checked={open} readOnly />
      <div className="modal">
        <div className="modal-box bg-[#F9F3EF] text-[#555879] shadow-lg rounded-2xl">
          <h3 className="font-bold text-lg text-[#555879]">{title}</h3>
          <p className="py-4 text-[#98A1BC]">{message}</p>
          <div className="modal-action flex gap-3">
            <button 
              className="btn bg-[#98A1BC] text-white border-none hover:bg-[#555879] transition"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button 
              className="btn bg-[#555879] text-white border-none hover:bg-[#98A1BC] transition"
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
