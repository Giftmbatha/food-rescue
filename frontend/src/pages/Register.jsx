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
    <div className="flex justify-center min-h-screen items-center bg-[#F9F3EF] p-6">
      <div className="w-full max-w-sm shadow-xl bg-white rounded-2xl border border-[#98A1BC]/30 p-6">
        <h2 className="text-[#555879] text-3xl font-bold text-center mb-6">
          Register
        </h2>

        {error && (
          <div className="px-3 py-2 mb-4 text-sm text-red-700 border border-red-300 rounded-lg bg-red-50">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
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

          <select
            className="w-full h-12 px-4 rounded-lg border border-[#98A1BC]/50 focus:border-[#555879] focus:ring-2 focus:ring-[#98A1BC] bg-[#F9F3EF]/50 text-base"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="ngo">NGO</option>
            <option value="donor">Donor</option>
          </select>

          <button
            className="w-full h-12 rounded-xl bg-[#98A1BC] hover:bg-[#555879] text-white font-semibold transition duration-200"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-[#555879] mt-6">
          Already have an account?{" "}
          {/* --- THE FIX IS ON THIS LINE --- */}
          <Link
            to="/login"
            className="font-medium text-[#98A1BC] hover:text-[#555879] transition"
          >
            Login
          </Link>
          {/* --- END OF FIX --- */}
        </p>
      </div>
    </div>
  );
}