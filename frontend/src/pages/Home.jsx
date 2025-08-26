import React from 'react';
import { Link } from 'react-router-dom';
import { FaLeaf, FaHandHoldingHeart, FaMapMarkerAlt, FaSearch } from 'react-icons/fa'; // Importing icons

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 sm:p-10" style={{ backgroundColor: '#F9F3EF' }}>
      
      {/* Main Hero Section */}
      <div className="w-full max-w-6xl mb-12 overflow-hidden shadow-2xl hero rounded-2xl" style={{ backgroundColor: '#98A1BC' }}>
        <div className="hero-content text-center text-[#555879] p-8 sm:p-16 flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-xl mb-8 lg:text-left lg:pr-10 lg:mb-0">
            <h1 className="mb-4 text-5xl font-extrabold leading-tight text-white md:text-6xl">
              Nourish SA, <br className="hidden sm:inline"/> Eliminate Waste!
            </h1>
            <p className="py-6 text-lg text-white md:text-xl opacity-90">
              Join the Food Rescue initiative in South Africa!🇿🇦 We connect generous donors with local NGOs to ensure no good food goes to waste and everyone has access to healthy meals.
            </p>
            <Link 
              className="btn btn-lg bg-[#555879] text-[#F9F3EF] hover:bg-[#F9F3EF] hover:text-[#555879] border-none font-bold transition-colors duration-300 transform hover:scale-105 shadow-lg" 
              to="/listings"
            >
              <FaSearch className="inline-block mr-2 text-xl" /> Discover Listings
            </Link>
          </div>
          <div className="flex items-center justify-center lg:w-1/2">
            {/* Image illustrating food rescue */}
            <img 
              src="https://images.unsplash.com/photo-1543158182-e6f0b2a24dfa?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Food Donation" 
              className="object-cover w-full shadow-xl rounded-xl max-h-80"
            />
          </div>
        </div>
      </div>

      {/* Value Proposition / How It Works Section */}
      <div className="w-full max-w-6xl mb-12 text-center">
        <h2 className="text-4xl font-bold text-[#555879] mb-8">How We Make a Difference</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Card 1: Reduce Waste */}
          <div className="card bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 border-b-4 border-[#98A1BC]">
            <div className="p-0 card-body">
              <FaLeaf className="text-5xl text-[#555879] mx-auto mb-4" />
              <h3 className="card-title text-2xl font-semibold text-[#555879] mb-3">Reduce Food Waste</h3>
              <p className="text-gray-600">
                Prevent edible surplus food from ending up in landfills, positively impacting our environment.
              </p>
            </div>
          </div>

          {/* Card 2: Feed Communities */}
          <div className="card bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 border-b-4 border-[#98A1BC]">
            <div className="p-0 card-body">
              <FaHandHoldingHeart className="text-5xl text-[#555879] mx-auto mb-4" />
              <h3 className="card-title text-2xl font-semibold text-[#555879] mb-3">Nourish Our Community</h3>
              <p className="text-gray-600">
                Channel nutritious food to those in need, supporting NGOs and vulnerable families in our Communities.
              </p>
            </div>
          </div>

          {/* Card 3: Local Impact */}
          <div className="card bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300 border-b-4 border-[#98A1BC]">
            <div className="p-0 card-body">
              <FaMapMarkerAlt className="text-5xl text-[#555879] mx-auto mb-4" />
              <h3 className="card-title text-2xl font-semibold text-[#555879] mb-3">Local & Direct</h3>
              <p className="text-gray-600">
                Connect directly with local donors and NGOs for efficient, impactful food distribution right here in South Africa.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Call to Action Section */}
      <div className="w-full max-w-6xl p-10 text-center shadow-xl rounded-2xl" style={{ backgroundColor: '#F9F3EF', border: '2px solid #98A1BC' }}>
        <h2 className="text-3xl md:text-4xl font-bold text-[#555879] mb-6">Ready to Make a Difference?</h2>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link 
            className="btn btn-lg bg-[#555879] text-[#F9F3EF] hover:bg-[#F9F3EF] hover:text-[#555879] border-none font-bold transition-colors duration-300 transform hover:scale-105 shadow-md" 
            to="/register/donor"
          >
            I'm a Donor!
          </Link>
          <Link 
            className="btn btn-lg bg-[#98A1BC] text-[#555879] hover:bg-[#555879] hover:text-[#F9F3EF] border-none font-bold transition-colors duration-300 transform hover:scale-105 shadow-md" 
            to="/register/ngo"
          >
            I'm an NGO!
          </Link>
        </div>
      </div>
    </div>
  );
}