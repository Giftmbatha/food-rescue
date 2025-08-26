import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Importing icons

export default function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  return (
    <>
      <input type="checkbox" className="modal-toggle" checked={open} readOnly />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="p-6 transition-all duration-300 transform scale-95 shadow-2xl modal-box rounded-2xl" style={{ backgroundColor: '#F9F3EF' }}>
          
          <div className="flex items-center justify-center mb-4 text-[#555879]">
            <FaCheckCircle className="text-4xl" />
          </div>

          <h3 className="font-bold text-2xl text-center text-[#555879]">{title}</h3>
          
          <p className="py-4 font-medium text-center text-gray-600">{message}</p>
          
          <div className="flex flex-col gap-3 mt-6 modal-action sm:flex-row-reverse">
            <button 
              className="btn flex-1 bg-[#555879] text-[#F9F3EF] border-none hover:bg-[#98A1BC] hover:text-[#555879] transition-colors duration-300"
              onClick={onConfirm}
            >
              Confirm
            </button>
            <button 
              className="btn flex-1 bg-[#98A1BC] text-[#555879] border-none hover:bg-[#555879] hover:text-[#F9F3EF] transition-colors duration-300"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="z-40 bg-black modal-backdrop opacity-60" onClick={onCancel}></div>
      </div>
    </>
  );
}