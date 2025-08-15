import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../api';
import { saveAuth } from '../auth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ngo');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password || !role) { setError('All fields are required.'); return; }
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role })
    });
    const data = await res.json().catch(()=>({detail:'Registration failed'}));
    if (!res.ok) { setError(data.detail || 'Registration failed'); return; }
    saveAuth(data.access_token, data.role);
    if (data.role === 'donor') navigate('/create-listing', { replace: true });
    else navigate('/listings', { replace: true });
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-sm shadow-xl card bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Register</h2>
        {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleRegister} className="space-y-3">
            <input type="email" className="w-full input input-bordered" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input type="password" className="w-full input input-bordered" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            <select className="w-full select select-bordered" value={role} onChange={e=>setRole(e.target.value)}>
              <option value="ngo">NGO</option>
              <option value="donor">Donor</option>
            </select>
            <button className="w-full btn btn-primary" type="submit">Create account</button>
          </form>
          <p className="text-sm">Already have an account? <Link className="link" to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}
