import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../api';
import { saveAuth } from '../auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please enter email and password.'); return; }
    const form = new URLSearchParams();
    form.append('username', email);
    form.append('password', password);
    const res = await fetch(`${API_URL}/auth/login`, { method: 'POST', body: form });
    const data = await res.json().catch(()=>({detail:'Login failed'}));
    if (!res.ok) { setError(data.detail || 'Login failed'); return; }
    saveAuth(data.access_token, data.role);
    if (data.role === 'donor') navigate('/create-listing', { replace: true });
    else navigate('/listings', { replace: true });
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-3">
            <input type="email" className="input input-bordered w-full" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input type="password" className="input input-bordered w-full" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            <button className="btn btn-primary w-full" type="submit">Login</button>
          </form>
          <p className="text-sm">No account? <Link className="link" to="/register">Register</Link></p>
        </div>
      </div>
    </div>
  );
}
