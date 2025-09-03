import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Listings from './pages/Listings';
import CreateListing from './pages/CreateListing';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound'; // Optional: dedicated 404 page
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F9F3EF]">
        <Navbar />
        <main className="container px-4 py-6 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/listings" element={<Listings />} />
            
            {/* Protected Routes */}
            <Route 
              path="/create-listing" 
              element={
                <ProtectedRoute>
                  <CreateListing />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        {/* Optional Footer */}
        <footer className="bg-[#555879] text-[#F9F3EF] py-6 mt-12">
          <div className="container px-4 mx-auto text-center">
            <p>&copy; 2025 Food Rescue. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}