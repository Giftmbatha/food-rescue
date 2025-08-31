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
    <div className="min-h-screen flex items-center justify-center bg-[#F9F3EF] p-6">
      <div className="w-full max-w-sm shadow-xl bg-white rounded-2xl border border-[#98A1BC]/30 p-6">
        <h2 className="text-[#555879] text-3xl font-bold text-center mb-6">
          Login
        </h2>

        {error && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 text-red-700 py-2 px-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            className="w-full h-12 px-4 rounded-lg border border-[#98A1BC]/50 focus:border-[#555879] focus:ring-2 focus:ring-[#98A1BC] bg-[#F9F3EF]/50 text-base"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full h-12 px-4 rounded-lg border border-[#98A1BC]/50 focus:border-[#555879] focus:ring-2 focus:ring-[#98A1BC] bg-[#F9F3EF]/50 text-base"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full h-12 rounded-xl bg-[#98A1BC] hover:bg-[#555879] text-white font-semibold transition duration-200"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-[#555879] mt-6">
          No account?{" "}
          <link
            href="/register"
            className="font-medium text-[#98A1BC] hover:text-[#555879] transition"
          >
            Register
          </link>
        </p>
      </div>
    </div>
  );
}

