import React, { useEffect, useState } from 'react';
import { API_URL, authHeader } from '../api';
import ConfirmModal from '../components/ConfirmModal';
import { getRole } from '../auth';
import { FaSearch, FaMapMarkerAlt, FaCheck, FaTimes } from 'react-icons/fa';

export default function Listings() {
  const [city, setCity] = useState('');
  const [listings, setListings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState('');
  const role = getRole();

  const search = async () => {
    const res = await fetch(`${API_URL}/listings/search?city=${encodeURIComponent(city)}`, { headers: { ...authHeader() } });
    const data = await res.json().catch(() => []);
    setListings(Array.isArray(data) ? data : []);
  };

  useEffect(() => { search(); }, []);

  const openClaim = (listing) => {
    setSelected(listing);
    setModalOpen(true);
  };

  const confirmClaim = async () => {
    if (!selected) return;
    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) {
      setMsg('Please create your NGO profile first (Profile page).');
      setModalOpen(false);
      return;
    }
    const res = await fetch(`${API_URL}/claims`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify({ listing_id: selected.id, ngo_id: Number(ngoId) })
    });
    const body = await res.json().catch(() => ({ detail: 'Failed' }));
    if (!res.ok) setMsg(body.detail || 'Claim failed');
    else setMsg('Claim successful');
    setModalOpen(false);
    search();
  };

  return (
    <div className="min-h-screen p-6 sm:p-10" style={{ backgroundColor: '#F9F3EF' }}>
      <div className="mb-8 p-6 rounded-xl shadow-md border-2 border-[#98A1BC]" style={{ backgroundColor: '#FFFFFF' }}>
        <h2 className="text-2xl font-bold text-[#555879] mb-4">Find Listings Near You!</h2>
        <div className="flex flex-col items-end gap-4 sm:flex-row">
          <div className="flex-grow w-full form-control">
            <label className="label">
              <span className="label-text text-[#555879] font-semibold">City</span>
            </label>
            <input
              className="input input-bordered w-full rounded-lg border-[#98A1BC] focus:border-[#555879] focus:ring-1 focus:ring-[#555879] transition-colors duration-200"
              placeholder="e.g., Sandton"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button className="btn btn-primary bg-[#555879] hover:bg-[#98A1BC] border-none text-white hover:text-[#555879] transition-colors duration-200 w-full sm:w-auto mt-4 sm:mt-0" onClick={search}>
            <FaSearch className="inline-block mr-2" />
            Search
          </button>
        </div>
      </div>
      
      {msg && (
        <div className={`alert rounded-lg mt-4 ${msg.includes('successful') ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} text-sm flex items-center transition-all duration-300`}>
          {msg.includes('successful') ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
          <span className='font-medium'>{msg}</span>
        </div>
      )}

      {listings.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-xl text-gray-500">No listings found. Try a different city or check back later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((l) => (
            <div key={l.id} className="card bg-white shadow-lg rounded-xl transition-transform transform hover:scale-105 border-2 border-[#98A1BC]">
              <div className="p-6 card-body">
                <h3 className="card-title text-xl font-bold text-[#555879]">{l.title}</h3>
                <p className="my-2 text-gray-600">{l.description}</p>
                <div className="space-y-1 text-sm font-medium text-gray-500">
                  <p className="flex items-center"><span className="mr-2 font-semibold">Quantity:</span> {l.quantity} {l.unit}</p>
                  <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-[#98A1BC]" /> <span className="mr-1 font-semibold">City:</span> {l.city}</p>
                  <p className="text-sm font-semibold">Status: <span className={`badge ${l.status === 'OPEN' ? 'bg-[#555879] text-white' : 'bg-gray-400 text-white'}`}>{l.status}</span></p>
                </div>
                <div className="justify-end mt-4 card-actions">
                  {role === 'ngo' && l.status === 'OPEN' && (
                    <button className="btn btn-success bg-[#98A1BC] hover:bg-[#555879] border-none text-[#555879] hover:text-white transition-colors duration-200" onClick={() => openClaim(l)}>
                      <FaCheck /> Claim
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={modalOpen}
        title="Confirm Claim"
        message={`Are you sure you want to claim "${selected?.title}"?`}
        onConfirm={confirmClaim}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}