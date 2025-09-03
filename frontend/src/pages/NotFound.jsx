import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F3EF] p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#555879] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#555879] mb-6">
          Page Not Found
        </h2>
        <p className="max-w-md mx-auto mb-8 text-gray-600">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link 
            to="/" 
            className="btn btn-primary bg-[#555879] hover:bg-[#98A1BC] text-white border-none"
          >
            <FaHome className="mr-2" />
            Go Home
          </Link>
          <Link 
            to="/listings" 
            className="btn btn-outline border-[#555879] text-[#555879] hover:bg-[#555879] hover:text-white"
          >
            <FaSearch className="mr-2" />
            Browse Listings
          </Link>
        </div>
      </div>
    </div>
  );
}