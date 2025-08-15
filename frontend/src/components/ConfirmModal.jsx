import React from 'react';
export default function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  return (
    <>
      <input type="checkbox" className="modal-toggle" checked={open} readOnly />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <button className="btn" onClick={onCancel}>Cancel</button>
            <button className="btn btn-primary" onClick={onConfirm}>Confirm</button>
          </div>
        </div>
      </div>
    </>
  );
}
