import React, { useState } from 'react';
import { API_URL, authHeader } from '../api';

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
    if (!donorId) { setMsg('Please create your Donor profile first (Profile page).'); return; }
    if (!title || !quantity || !unit || !expiresAt || !city) { setMsg('Please fill in all required fields.'); return; }
    const res = await fetch(`${API_URL}/listings?donor_id=${encodeURIComponent(donorId)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify({ title, description, quantity: Number(quantity), unit, expires_at: new Date(expiresAt).toISOString(), city })
    });
    const data = await res.json().catch(()=>({detail:'Failed'}));
    if (!res.ok) { setMsg(data.detail || 'Failed to create'); return; }
    setMsg('Listing created successfully.');
    setTitle(''); setDescription(''); setQuantity(1); setUnit('kg'); setExpiresAt(''); setCity('');
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="card w-full max-w-xl bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Create Listing</h2>
          {msg && <div className="alert">{msg}</div>}
          <form className="grid gap-3" onSubmit={createListing}>
            <input className="input input-bordered" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
            <textarea className="textarea textarea-bordered" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
              <input className="input input-bordered" type="number" min="1" placeholder="Quantity" value={quantity} onChange={e=>setQuantity(e.target.value)} />
              <input className="input input-bordered" placeholder="Unit (e.g., kg, boxes)" value={unit} onChange={e=>setUnit(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input className="input input-bordered" type="datetime-local" value={expiresAt} onChange={e=>setExpiresAt(e.target.value)} />
              <input className="input input-bordered" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
