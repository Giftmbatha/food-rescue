import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuth, getRole } from '../auth';

export default function Navbar() {
  const navigate = useNavigate();
  const role = getRole();

  const toggleTheme = () => {
    const html = document.querySelector('html');
    const current = html.getAttribute('data-theme') || 'light';
    html.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
  };

  const logout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">Food Rescue</Link>
      </div>
      <div className="flex-none gap-2">
        <button className="btn btn-ghost" onClick={toggleTheme}>Toggle Theme</button>
        <ul className="menu menu-horizontal px-1">
          {role === 'donor' && <li><Link to="/create-listing">Create Listing</Link></li>}
          {role && <li><Link to="/profile">Profile</Link></li>}
          <li><Link to="/listings">Listings</Link></li>
          {!role ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <li><button className="btn btn-outline" onClick={logout}>Logout</button></li>
          )}
        </ul>
      </div>
    </div>
  );
}
