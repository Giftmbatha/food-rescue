import React, { useEffect, useState } from 'react';
import { API_URL, authHeader } from '../api';
import ConfirmModal from '../components/ConfirmModal';
import { getRole } from '../auth';
import { FaSearch, FaMapMarkerAlt, FaCheck, FaTimes, FaEnvelope, FaWhatsapp, FaClock } from 'react-icons/fa';

export default function Listings() {
  const [city, setCity] = useState('');
  const [listings, setListings] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const role = getRole();

  const search = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/listings/search?city=${encodeURIComponent(city)}`, { 
        headers: { ...authHeader() } 
      });
      const data = await res.json().catch(() => []);
      setListings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Search error:', error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { search(); }, []);

  const openClaim = (listing) => {
    setSelected(listing);
    setModalOpen(true);
  };

  const confirmClaim = async () => {
    if (!selected) return;
    const ngoId = localStorage.getItem('ngoId');
    if (!ngoId) {
      setMsg('Please create your NGO profile first (Profile page).');
      setModalOpen(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/claims`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ listing_id: selected.id, ngo_id: Number(ngoId) })
      });
      const body = await res.json().catch(() => ({ detail: 'Failed' }));
      if (!res.ok) setMsg(body.detail || 'Claim failed');
      else setMsg('Claim successful');
    } catch (error) {
      setMsg('Claim failed: Network error');
    } finally {
      setModalOpen(false);
      search();
    }
  };

  // Function to handle email click
  const handleEmailClick = (donorEmail, listingTitle, donorName) => {
    const subject = `Regarding your food donation: ${listingTitle}`;
    const body = `Hello${donorName ? ` ${donorName}` : ''}!\n\nI saw your "${listingTitle}" listing on Food Rescue and would like to discuss the food donation.\n\nCould you please provide more details?\n\nThank you!`;
    
    window.location.href = `mailto:${donorEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  // Function to handle WhatsApp click
  const handleWhatsAppClick = (donorPhone, listingTitle, donorName) => {
    const message = `Hello${donorName ? ` ${donorName}` : ''}!%0A%0AI saw your "${listingTitle}" listing on Food Rescue and would like to discuss the food donation.%0A%0ACould you please provide more details?`;
    
    const whatsappUrl = `https://wa.me/${donorPhone.replace(/\D/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  // Format expiration date
  const formatExpiration = (expiresAt) => {
    const date = new Date(expiresAt);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen p-6 sm:p-10" style={{ backgroundColor: '#F9F3EF' }}>
      {/* Search Header */}
      <div className="mb-8 p-6 rounded-xl shadow-md border-2 border-[#98A1BC]" style={{ backgroundColor: '#FFFFFF' }}>
        <h2 className="text-2xl font-bold text-[#555879] mb-4">Find Listings Near You!</h2>
        <div className="flex flex-col items-end gap-4 sm:flex-row">
          <div className="flex-grow w-full form-control">
            <label className="label">
              <span className="label-text text-[#555879] font-semibold">City</span>
            </label>
            <input
              className="input input-bordered w-full rounded-lg border-[#98A1BC] focus:border-[#555879] focus:ring-1 focus:ring-[#555879] transition-colors duration-200"
              placeholder="e.g., Sandton, Cape Town, Durban"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && search()}
            />
          </div>
          <button 
            className="btn btn-primary bg-[#555879] hover:bg-[#98A1BC] border-none text-white hover:text-[#555879] transition-colors duration-200 w-full sm:w-auto mt-4 sm:mt-0" 
            onClick={search}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <FaSearch className="inline-block mr-2" />
            )}
            Search
          </button>
        </div>
      </div>
      
      {/* Messages */}
      {msg && (
        <div className={`alert rounded-lg mt-4 ${msg.includes('successful') ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} text-sm flex items-center transition-all duration-300`}>
          {msg.includes('successful') ? <FaCheck className="mr-2" /> : <FaTimes className="mr-2" />}
          <span className='font-medium'>{msg}</span>
        </div>
      )}

      {/* Listings Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="loading loading-spinner loading-lg text-[#555879]"></div>
          <p className="mt-4 text-gray-600">Loading listings...</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-xl text-gray-500">No listings found. Try a different city or check back later!</p>
          {city && (
            <button 
              className="btn btn-ghost text-[#555879] mt-4"
              onClick={() => {
                setCity('');
                search();
              }}
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listings.map((listing) => (
            <div key={listing.id} className="card bg-white shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl border-2 border-[#98A1BC] hover:border-[#555879]">
              <div className="p-6 card-body">
                {/* Listing Header */}
                <h3 className="card-title text-xl font-bold text-[#555879] mb-2">{listing.title}</h3>
                <p className="mb-4 text-sm text-gray-600 line-clamp-3">{listing.description}</p>

                {/* Listing Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#555879]">Quantity:</span>
                    <span>{listing.quantity} {listing.unit}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-[#98A1BC] flex-shrink-0" />
                    <span className="truncate">{listing.city}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <FaClock className="mr-2 text-[#98A1BC] flex-shrink-0" />
                    <span className={formatExpiration(listing.expires_at).includes('Expired') ? 'text-red-600' : 'text-gray-600'}>
                      Expires: {formatExpiration(listing.expires_at)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Status:</span>
                    <span className={`badge ${listing.status === 'OPEN' ? 'badge-success' : 'badge-secondary'} capitalize`}>
                      {listing.status.toLowerCase()}
                    </span>
                  </div>
                </div>

                {/* Contact Options - Only show if listing is open and contact info exists */}
                {(listing.status === 'OPEN' && (listing.donor_email || listing.donor_phone)) && (
                  <div className="pt-4 mt-4 border-t border-gray-200">
                    <p className="text-xs font-semibold text-[#555879] mb-3 uppercase tracking-wide">Contact Donor:</p>
                    <div className="flex flex-col gap-2">
                      {listing.donor_email && (
                        <button
                          onClick={() => handleEmailClick(listing.donor_email, listing.title, listing.donor_name)}
                          className="w-full text-blue-600 transition-colors duration-200 bg-white border-blue-600 btn btn-outline btn-sm hover:bg-blue-600 hover:text-white hover:border-blue-600"
                        >
                          <FaEnvelope className="mr-2" />
                          Email
                        </button>
                      )}
                      {listing.donor_phone && (
                        <button
                          onClick={() => handleWhatsAppClick(listing.donor_phone, listing.title, listing.donor_name)}
                          className="w-full text-green-600 transition-colors duration-200 bg-white border-green-600 btn btn-outline btn-sm hover:bg-green-600 hover:text-white hover:border-green-600"
                        >
                          <FaWhatsapp className="mr-2" />
                          WhatsApp
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Claim Button - Only for NGOs */}
                {role === 'ngo' && listing.status === 'OPEN' && (
                  <div className="justify-end mt-4 card-actions">
                    <button 
                      className="btn btn-primary bg-[#555879] hover:bg-[#98A1BC] border-none text-white hover:text-[#555879] transition-colors duration-200 w-full"
                      onClick={() => openClaim(listing)}
                    >
                      <FaCheck className="mr-2" />
                      Claim Listing
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        open={modalOpen}
        title="Confirm Claim"
        message={`Are you sure you want to claim "${selected?.title}"? This action cannot be undone.`}
        onConfirm={confirmClaim}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}