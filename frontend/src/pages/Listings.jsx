import React, { useEffect, useState } from 'react';
import { API_URL, authHeader } from '../api';
import ConfirmModal from '../components/ConfirmModal';
import { getRole } from '../auth';

export default function Listings() {
  const [city, setCity] = useState('');
  const [listings, setListings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState('');
  const role = getRole();

  const search = async () => {
    const res = await fetch(`${API_URL}/listings/search?city=${encodeURIComponent(city)}`, { headers: { ...authHeader() } });
    const data = await res.json().catch(()=>[]);
    setListings(Array.isArray(data) ? data : []);
  };

  useEffect(() => { search(); }, []);

  const openClaim = (listing) => { setSelected(listing); setModalOpen(true); };

  const confirmClaim = async () => {
    if (!selected) return;
    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) { setMsg('Please create your NGO profile first (Profile page).'); setModalOpen(false); return; }
    const res = await fetch(`${API_URL}/claims`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify({ listing_id: selected.id, ngo_id: Number(ngoId) })
    });
    const body = await res.json().catch(()=>({detail:'Failed'}));
    if (!res.ok) setMsg(body.detail || 'Claim failed');
    else setMsg('Claim successful');
    setModalOpen(false);
    search();
  };

  return (
    <div className="p-6">
      <div className="flex gap-2 items-end mb-4">
        <div className="form-control">
          <label className="label"><span className="label-text">City</span></label>
          <input className="input input-bordered" placeholder="e.g., Johannesburg" value={city} onChange={e=>setCity(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={search}>Search</button>
      </div>

      {msg && <div className="alert my-2">{msg}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listings.map(l => (
          <div key={l.id} className="card bg-base-100 shadow">
            <div className="card-body">
              <h2 className="card-title">{l.title}</h2>
              <p>{l.description}</p>
              <div className="text-sm opacity-70">Qty: {l.quantity} {l.unit} • City: {l.city} • Status: {l.status}</div>
              <div className="card-actions justify-end">
                {role === 'ngo' && l.status === 'OPEN' && (
                  <button className="btn btn-success" onClick={()=>openClaim(l)}>Claim</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        open={modalOpen}
        title="Confirm claim"
        message={`Confirm claim for "${selected?.title}"?`}
        onConfirm={confirmClaim}
        onCancel={()=>setModalOpen(false)}
      />
    </div>
  );
}
