import React from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className="p-6">
      <div className="hero bg-base-200 rounded-xl">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">Welcome to Food Rescue</h1>
            <p className="py-6">Connect donors and NGOs to reduce food waste and fight hunger.</p>
            <Link className="btn btn-primary" to="/listings">Browse Listings</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
