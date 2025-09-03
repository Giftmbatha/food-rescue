import React, { useState, useEffect } from 'react';
import { API_URL, authFetch } from '../api';
import { FaPlus, FaCheck, FaTimes, FaEdit, FaTrash, FaEye, FaClock, FaMapMarkerAlt, FaBox, FaList } from 'react-icons/fa';

export default function CreateListing() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    quantity: 1,
    unit: 'kg',
    expiresAt: '',
    city: '',
    address: ''
  });
  const [msg, setMsg] = useState('');
  const [msgType, setMsgType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);
  const [myListings, setMyListings] = useState([]);
  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'manage'
  const [editingListing, setEditingListing] = useState(null);

  useEffect(() => {
    if (activeTab === 'manage') {
      fetchMyListings();
    }
  }, [activeTab]);

  const fetchMyListings = async () => {
    try {
      const data = await authFetch('/listings/my');
      setMyListings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching listings:', error);
      setMyListings([]);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createListing = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    
    const donorId = localStorage.getItem('donorId');
    if (!donorId) {
      setMsg('Please create your Donor profile first (Profile page).');
      setMsgType('error');
      setLoading(false);
      return;
    }

    if (!formData.title || !formData.quantity || !formData.unit || !formData.expiresAt || !formData.city) {
      setMsg('Please fill in all required fields.');
      setMsgType('error');
      setLoading(false);
      return;
    }

    try {
      const url = editingListing ? `/listings/${editingListing.id}` : `/listings?donor_id=${donorId}`;
      const method = editingListing ? 'PUT' : 'POST';

      const data = await authFetch(url, {
        method: method,
        body: JSON.stringify({
          ...formData,
          quantity: Number(formData.quantity),
          expires_at: new Date(formData.expiresAt).toISOString()
        })
      });

      setMsg(editingListing ? 'Listing updated successfully!' : 'Listing created successfully!');
      setMsgType('success');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        quantity: 1,
        unit: 'kg',
        expiresAt: '',
        city: '',
        address: ''
      });
      
      setEditingListing(null);
      fetchMyListings(); // Refresh the listings
      
    } catch (error) {
      setMsg(error.message || 'Failed to process your request');
      setMsgType('error');
    } finally {
      setLoading(false);
    }
  };

  const editListing = (listing) => {
    setFormData({
      title: listing.title,
      description: listing.description || '',
      quantity: listing.quantity,
      unit: listing.unit,
      expiresAt: listing.expires_at.slice(0, 16), // Convert to datetime-local format
      city: listing.city,
      address: listing.address || ''
    });
    setEditingListing(listing);
    setActiveTab('create');
  };

  const deleteListing = async (listingId) => {
    if (!window.confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      return;
    }

    try {
      await authFetch(`/listings/${listingId}`, {
        method: 'DELETE'
      });
      
      setMsg('Listing deleted successfully!');
      setMsgType('success');
      fetchMyListings(); // Refresh the listings
    } catch (error) {
      setMsg('Failed to delete listing');
      setMsgType('error');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      OPEN: { color: 'badge-success', text: 'Available' },
      CLAIMED: { color: 'badge-warning', text: 'Claimed' },
      COLLECTED: { color: 'badge-info', text: 'Collected' },
      CANCELLED: { color: 'badge-error', text: 'Cancelled' }
    };
    
    const config = statusConfig[status] || { color: 'badge-neutral', text: status };
    return <span className={`badge ${config.color}`}>{config.text}</span>;
  };

  return (
    <div className="min-h-screen bg-[#F9F3EF] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-[#555879] mb-2">Food Listings</h1>
          <p className="text-[#98A1BC] text-lg">Share surplus food and manage your donations</p>
        </div>

        {/* Tab Navigation */}
        <div className="justify-center mb-8 bg-white shadow-lg tabs tabs-boxed">
          <button
            className={`tab tab-lg ${activeTab === 'create' ? 'tab-active bg-[#555879] text-white' : 'text-[#555879]'}`}
            onClick={() => setActiveTab('create')}
          >
            <FaPlus className="mr-2" />
            {editingListing ? 'Edit Listing' : 'Create Listing'}
          </button>
          <button
            className={`tab tab-lg ${activeTab === 'manage' ? 'tab-active bg-[#555879] text-white' : 'text-[#555879]'}`}
            onClick={() => setActiveTab('manage')}
          >
            <FaList className="mr-2" />
            My Listings ({myListings.length})
          </button>
        </div>

        {/* Message Alert */}
        {msg && (
          <div className={`alert ${
            msgType === 'success' ? 'alert-success' : 'alert-error'
          } mb-6 rounded-lg shadow-lg`}>
            <div>
              <span>{msg}</span>
            </div>
          </div>
        )}

        {activeTab === 'create' ? (
          /* Create/Edit Form */
          <div className="card bg-white shadow-2xl border-2 border-[#98A1BC] rounded-2xl">
            <div className="p-8 card-body">
              <h2 className="text-2xl font-bold text-[#555879] mb-2 flex items-center">
                {editingListing ? <FaEdit className="mr-2" /> : <FaPlus className="mr-2" />}
                {editingListing ? 'Edit Food Listing' : 'Create New Listing'}
              </h2>
              <p className="mb-6 text-gray-500">Share details about the food you'd like to donate</p>

              <form className="grid gap-6" onSubmit={createListing}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Title */}
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text text-[#555879] font-semibold">Listing Title *</span>
                    </label>
                    <input
                      name="title"
                      className="input input-bordered bg-[#F9F3EF]/50 border-[#98A1BC] focus:border-[#555879]"
                      placeholder="e.g., Fresh Vegetables, Bakery Items, Canned Goods"
                      value={formData.title}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>

                  {/* Description */}
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text text-[#555879] font-semibold">Description</span>
                    </label>
                    <textarea
                      name="description"
                      className="textarea textarea-bordered bg-[#F9F3EF]/50 border-[#98A1BC] focus:border-[#555879] h-24"
                      placeholder="Describe the food items, condition, packaging, etc."
                      value={formData.description}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>

                  {/* Quantity & Unit */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-[#555879] font-semibold">Quantity *</span>
                    </label>
                    <input
                      name="quantity"
                      type="number"
                      min="1"
                      className="input input-bordered bg-[#F9F3EF]/50 border-[#98A1BC] focus:border-[#555879]"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-[#555879] font-semibold">Unit *</span>
                    </label>
                    <select
                      name="unit"
                      className="select select-bordered bg-[#F9F3EF]/50 border-[#98A1BC] focus:border-[#555879]"
                      value={formData.unit}
                      onChange={handleInputChange}
                      disabled={loading}
                    >
                      <option value="kg">Kilograms (kg)</option>
                      <option value="g">Grams (g)</option>
                      <option value="units">Units</option>
                      <option value="boxes">Boxes</option>
                      <option value="bags">Bags</option>
                      <option value="liters">Liters</option>
                      <option value="packages">Packages</option>
                    </select>
                  </div>

                  {/* Expiration Date */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-[#555879] font-semibold">Expiration Date *</span>
                    </label>
                    <input
                      name="expiresAt"
                      type="datetime-local"
                      className="input input-bordered bg-[#F9F3EF]/50 border-[#98A1BC] focus:border-[#555879]"
                      value={formData.expiresAt}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>

                  {/* City */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-[#555879] font-semibold">City *</span>
                    </label>
                    <input
                      name="city"
                      className="input input-bordered bg-[#F9F3EF]/50 border-[#98A1BC] focus:border-[#555879]"
                      placeholder="e.g., Johannesburg, Cape Town"
                      value={formData.city}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>

                  {/* Address */}
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text text-[#555879] font-semibold">Pickup Address</span>
                    </label>
                    <input
                      name="address"
                      className="input input-bordered bg-[#F9F3EF]/50 border-[#98A1BC] focus:border-[#555879]"
                      placeholder="Street address for pickup"
                      value={formData.address}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="btn btn-primary flex-1 bg-[#555879] hover:bg-[#98A1BC] border-none text-white hover:text-[#555879] shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : editingListing ? (
                      <>
                        <FaCheck className="mr-2" />
                        Update Listing
                      </>
                    ) : (
                      <>
                        <FaPlus className="mr-2" />
                        Create Listing
                      </>
                    )}
                  </button>

                  {editingListing && (
                    <button
                      type="button"
                      className="btn btn-outline border-[#98A1BC] text-[#555879] hover:bg-[#98A1BC] hover:text-white"
                      onClick={() => {
                        setEditingListing(null);
                        setFormData({
                          title: '',
                          description: '',
                          quantity: 1,
                          unit: 'kg',
                          expiresAt: '',
                          city: '',
                          address: ''
                        });
                      }}
                      disabled={loading}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Manage Listings */
          <div className="card bg-white shadow-2xl border-2 border-[#98A1BC] rounded-2xl">
            <div className="p-8 card-body">
              <h2 className="text-2xl font-bold text-[#555879] mb-6 flex items-center">
                <FaList className="mr-2" />
                My Food Listings
              </h2>

              {myListings.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  <FaBox className="mx-auto mb-4 text-6xl text-gray-300" />
                  <p className="text-lg">You haven't created any listings yet.</p>
                  <p className="text-sm">Create your first listing to start sharing food with the community!</p>
                  <button
                    className="btn btn-primary mt-4 bg-[#555879] hover:bg-[#98A1BC] border-none"
                    onClick={() => setActiveTab('create')}
                  >
                    <FaPlus className="mr-2" />
                    Create First Listing
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {myListings.map((listing) => (
                    <div key={listing.id} className="bg-[#F9F3EF] rounded-xl p-6 border-2 border-[#98A1BC] hover:border-[#555879] transition-all">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        {/* Listing Info */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#555879] mb-2">{listing.title}</h3>
                          <p className="mb-3 text-gray-600 line-clamp-2">{listing.description}</p>
                          
                          <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                            <div className="flex items-center text-[#555879]">
                              <FaBox className="mr-2 text-[#98A1BC]" />
                              <span>{listing.quantity} {listing.unit}</span>
                            </div>
                            <div className="flex items-center text-[#555879]">
                              <FaMapMarkerAlt className="mr-2 text-[#98A1BC]" />
                              <span>{listing.city}</span>
                            </div>
                            <div className="flex items-center text-[#555879]">
                              <FaClock className="mr-2 text-[#98A1BC]" />
                              <span>Expires: {formatDate(listing.expires_at)}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="mr-2 font-semibold">Status:</span>
                              {getStatusBadge(listing.status)}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <button
                            className="btn btn-sm btn-outline border-[#555879] text-[#555879] hover:bg-[#555879] hover:text-white"
                            onClick={() => editListing(listing)}
                          >
                            <FaEdit className="mr-1" />
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-error btn-outline text-error hover:bg-error hover:text-white"
                            onClick={() => deleteListing(listing.id)}
                          >
                            <FaTrash className="mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}