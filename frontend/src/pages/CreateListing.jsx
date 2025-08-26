import React, { useState } from 'react';
import { API_URL, authHeader } from '../api';
import { FaPlus, FaCheck, FaTimes } from 'react-icons/fa'; // Importing icons

export default function CreateListing() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('kg');
  const [expiresAt, setExpiresAt] = useState('');
  const [city, setCity] = useState('');
  const [msg, setMsg] = useState('');

  const createListing = async (e) => {
    e.preventDefault();
    setMsg('');
    const donorId = localStorage.getItem('donorId');
    if (!donorId) {
      setMsg('Please create your Donor profile first (Profile page).');
      return;
    }
    if (!title || !quantity || !unit || !expiresAt || !city) {
      setMsg('Please fill in all required fields.');
      return;
    }
    const res = await fetch(`${API_URL}/listings?donor_id=${encodeURIComponent(donorId)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify({ title, description, quantity: Number(quantity), unit, expires_at: new Date(expiresAt).toISOString(), city })
    });
    const data = await res.json().catch(() => ({ detail: 'Failed' }));
    if (!res.ok) {
      setMsg(data.detail || 'Failed to create');
      return;
    }
    setMsg('Listing created successfully.');
    setTitle('');
    setDescription('');
    setQuantity(1);
    setUnit('kg');
    setExpiresAt('');
    setCity('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6" style={{ backgroundColor: '#F9F3EF' }}>
      <div className="card w-full max-w-2xl shadow-xl border-2 border-[#98A1BC] rounded-xl">
        <div className="p-8 bg-white card-body rounded-xl">
          <h2 className="card-title text-3xl font-bold text-[#555879] flex items-center">
            <FaPlus className="mr-2" /> Create a New Listing
          </h2>
          <p className="mb-4 text-gray-500">Share your surplus food with the community and help fight hunger.</p>
          
          {msg && (
            <div className={`alert rounded-lg mt-4 ${msg.includes('success') ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} text-sm flex items-center transition-all duration-300`}>
              {msg.includes('success') ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
              <span className='font-medium'>{msg}</span>
            </div>
          )}

          <form className="grid gap-5 mt-4" onSubmit={createListing}>
            <input className="input input-bordered w-full rounded-lg border-[#98A1BC] focus:border-[#555879] focus:ring-1 focus:ring-[#555879] transition-colors duration-200" placeholder="Title of your listing (e.g., Fresh Vegetables, Loaves of Bread)" value={title} onChange={e => setTitle(e.target.value)} />
            <textarea className="textarea textarea-bordered w-full rounded-lg border-[#98A1BC] focus:border-[#555879] focus:ring-1 focus:ring-[#555879] transition-colors duration-200" placeholder="A brief description of the food item and its condition." value={description} onChange={e => setDescription(e.target.value)} />
            
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="w-full form-control">
                <input className="input input-bordered rounded-lg border-[#98A1BC] focus:border-[#555879] focus:ring-1 focus:ring-[#555879] transition-colors duration-200" type="number" min="1" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
              </div>
              <div className="w-full form-control">
                <input className="input input-bordered rounded-lg border-[#98A1BC] focus:border-[#555879] focus:ring-1 focus:ring-[#555879] transition-colors duration-200" placeholder="Unit (e.g., kg, boxes, bags)" value={unit} onChange={e => setUnit(e.target.value)} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="w-full form-control">
                <input className="input input-bordered rounded-lg border-[#98A1BC] focus:border-[#555879] focus:ring-1 focus:ring-[#555879] transition-colors duration-200" type="datetime-local" value={expiresAt} onChange={e => setExpiresAt(e.target.value)} />
              </div>
              <div className="w-full form-control">
                <input className="input input-bordered rounded-lg border-[#98A1BC] focus:border-[#555879] focus:ring-1 focus:ring-[#555879] transition-colors duration-200" placeholder="City" value={city} onChange={e => setCity(e.target.value)} />
              </div>
            </div>
            
            <button className="btn w-full rounded-lg bg-[#555879] text-[#F9F3EF] hover:bg-[#98A1BC] hover:text-[#555879] border-none font-bold transition-colors duration-300 shadow-md">
              <FaPlus /> Create Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}