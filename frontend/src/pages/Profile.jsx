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
    if (!name || !city || !email) { setMessage('All fields required.'); return; }
    const endpoint = role === 'donor' ? 'donors' : 'ngos';
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify({ name, city, contact_email: email })
    });
    const data = await res.json().catch(()=>({detail:'Failed'}));
    if (!res.ok) { setMessage(data.detail || 'Failed'); return; }
    if (role === 'donor') localStorage.setItem('donorId', data.id);
    else localStorage.setItem('ngoId', data.id);
    setMessage(`Created ${role.toUpperCase()} profile with id ${data.id}`);
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="card w-full max-w-md bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title">Create {role?.toUpperCase()} Profile</h2>
          {message && <div className="alert">{message}</div>}
          <div className="grid gap-3">
            <input className="input input-bordered" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
            <input className="input input-bordered" placeholder="City" value={city} onChange={e=>setCity(e.target.value)} />
            <input className="input input-bordered" placeholder="Contact Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <button className="btn btn-primary" onClick={createProfile}>Save Profile</button>
            <p className="text-sm opacity-70">Your profile ID will be stored locally for later use.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
