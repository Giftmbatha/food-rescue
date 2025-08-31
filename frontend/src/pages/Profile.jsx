import React, { useState } from 'react';
import { API_URL, authHeader } from '../api';
import { getRole } from '../auth';

export default function Profile() {
  const role = getRole();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const createProfile = async () => {
    setMessage('');
    if (!name || !city || !email) {
      setMessage('All fields are required.');
      return;
    }
    const endpoint = role === 'donor' ? 'donors' : 'ngos';
    try {
      const res = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ name, city, contact_email: email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed to create profile');
      if (role === 'donor') localStorage.setItem('donorId', data.id);
      else localStorage.setItem('ngoId', data.id);
      setMessage(`Created ${role.toUpperCase()} profile with ID ${data.id}`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F9F3EF' }}>
      <div className="card w-full max-w-md shadow-lg" style={{ backgroundColor: '#F9F3EF', borderRadius: '1rem', border: '1px solid #98A1BC' }}>
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-[#555879] mb-4">
            Create {role?.toUpperCase()} Profile
          </h2>

          {message && (
            <div
              className="p-3 rounded mb-4 text-white font-semibold"
              style={{ backgroundColor: '#555879' }}
            >
              {message}
            </div>
          )}

          <div className="grid gap-4">
            <input
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#98A1BC] border-[#98A1BC]"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#98A1BC] border-[#98A1BC]"
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#98A1BC] border-[#98A1BC]"
              placeholder="Contact Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button
              className="btn w-full text-white font-bold"
              style={{ backgroundColor: '#555879', borderColor: '#555879' }}
              onClick={createProfile}
            >
              Save Profile
            </button>
            <p className="text-sm text-[#98A1BC] opacity-80 text-center mt-2">
              Your profile ID will be stored locally for later use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
