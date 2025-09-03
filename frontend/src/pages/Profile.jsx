import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authFetch } from '../api';
import { getRole, isAuthenticated } from '../auth';
import { FaUser, FaSave, FaEdit, FaMapMarkerAlt, FaEnvelope, FaPhone, FaHome, FaUsers, FaHandHoldingHeart, FaLeaf } from 'react-icons/fa';

export default function Profile() {
  const role = getRole();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    email: '',
    phone: '',
    address: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [existingId, setExistingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const id = role === 'donor' ? localStorage.getItem('donorId') : localStorage.getItem('ngoId');
    if (id) {
      setExistingId(id);
      setIsEditing(true);
      setMessage(`You already have a ${role} profile. You can update your information below.`);
      setMessageType('info');
    }
  }, [role, navigate]);

  const createProfile = async () => {
    setLoading(true);
    setMessage('');
    
    if (!formData.name || !formData.city || !formData.email) {
      setMessage('Name, City, and Email are required.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      const endpoint = role === 'donor' ? 'donors' : 'ngos';
      const url = existingId ? `/${endpoint}/${existingId}` : `/${endpoint}`;
      const method = existingId ? 'PUT' : 'POST';

      const data = await authFetch(url, {
        method: method,
        body: JSON.stringify(formData)
      });

      // Store the ID locally
      if (role === 'donor') {
        localStorage.setItem('donorId', data.id);
      } else {
        localStorage.setItem('ngoId', data.id);
      }
      
      setExistingId(data.id);
      setIsEditing(true);
      setMessage(`Successfully ${existingId ? 'updated' : 'created'} your ${role} profile!`);
      setMessageType('success');
      
    } catch (error) {
      setMessage(error.message || 'Failed to process your request');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const clearForm = () => {
    setFormData({
      name: '',
      city: '',
      email: '',
      phone: '',
      address: ''
    });
    setMessage('');
    setIsEditing(false);
  };

  // Get appropriate icon based on role
  const getRoleIcon = () => {
    return role === 'donor' ? <FaLeaf className="text-3xl" /> : <FaHandHoldingHeart className="text-3xl" />;
  };

  // Get role display name
  const getRoleDisplayName = () => {
    return role === 'donor' ? 'Food Donor' : 'NGO Partner';
  };

  return (
    <div className="min-h-screen bg-[#F9F3EF] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="mb-4 avatar online placeholder">
            <div className="bg-[#555879] text-[#F9F3EF] rounded-full w-24 h-24 flex items-center justify-center">
              <FaUser className="text-3xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-[#555879] mb-2">
            {isEditing ? 'Your Profile' : 'Create Profile'}
          </h1>
          <p className="text-[#98A1BC] text-lg">
            {role === 'donor' 
              ? 'Share your generosity with the community' 
              : 'Connect with donors to support your cause'
            }
          </p>
          <div className="badge badge-lg badge-ghost mt-2 text-[#555879] border-[#98A1BC]">
            {getRoleIcon()}
            <span className="ml-2">{getRoleDisplayName()}</span>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`alert ${
            messageType === 'success' ? 'alert-success' : 
            messageType === 'error' ? 'alert-error' : 'alert-info'
          } mb-6 rounded-lg shadow-lg`}>
            <div>
              <span>{message}</span>
            </div>
          </div>
        )}

        {/* Profile Form */}
        <div className="card bg-white shadow-2xl border-2 border-[#98A1BC] rounded-2xl overflow-hidden">
          <div className="p-8 card-body">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#555879] font-semibold flex items-center">
                    <FaUser className="mr-2" />
                    {role === 'donor' ? 'Your Name / Business Name' : 'NGO Name'}
                    <span className="ml-1 text-red-500">*</span>
                  </span>
                </label>
                <input
                  name="name"
                  className="input input-bordered bg-[#F9F3EF]/50 border-[#98A1BC] focus:border-[#555879] focus:ring-2 focus:ring-[#98A1BC]"
                  placeholder={role === 'donor' ? "e.g., Fresh Foods Market" : "e.g., Community Food Bank"}
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#555879] font-semibold flex items-center">
                    <FaEnvelope className="mr-2" />
                    Email Address
                    <span className="ml-1 text-red-500">*</span>
                  </span>
                </label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered bg-[#F9F3EF]/50 border-[#98A1BC] focus:border-[#555879] focus:ring-2 focus:ring-[#98A1BC]"
                  placeholder="contact@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              {/* City Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#555879] font-semibold flex items-center">
                    <FaMapMarkerAlt className="mr-2" />
                    City
                    <span className="ml-1 text-red-500">*</span>
                  </span>
                </label>
                <input
                  name="city"
                  className="input input-bordered bg-[#F9F3EF]/50 border-[#98A1BC] focus:border-[#555879] focus:ring-2 focus:ring-[#98A1BC]"
                  placeholder="e.g., Johannesburg, Cape Town"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              {/* Phone Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[#555879] font-semibold flex items-center">
                    <FaPhone className="mr-2" />
                    Phone Number
                  </span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  className="input input-bordered bg-[#F9F3EF]/50 border-[#98A1BC] focus:border-[#555879] focus:ring-2 focus:ring-[#98A1BC]"
                  placeholder="+27 123 456 7890"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              {/* Address Field - Full width */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-[#555879] font-semibold flex items-center">
                    <FaHome className="mr-2" />
                    Address
                  </span>
                </label>
                <input
                  name="address"
                  className="input input-bordered bg-[#F9F3EF]/50 border-[#98A1BC] focus:border-[#555879] focus:ring-2 focus:ring-[#98A1BC]"
                  placeholder="Street address for pickup/delivery"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-[#98A1BC]/30">
              <button 
                className="btn btn-primary flex-1 bg-[#555879] hover:bg-[#98A1BC] border-none text-white hover:text-[#555879] transition-all duration-300 shadow-lg"
                onClick={createProfile}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : isEditing ? (
                  <>
                    <FaEdit className="mr-2" />
                    Update Profile
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Create Profile
                  </>
                )}
              </button>

              {isEditing && (
                <button 
                  className="btn btn-outline border-[#98A1BC] text-[#555879] hover:bg-[#98A1BC] hover:text-white transition-all duration-300"
                  onClick={clearForm}
                  disabled={loading}
                >
                  Clear Form
                </button>
              )}
            </div>

            {/* Help Text */}
            <div className="mt-6 p-4 bg-[#F9F3EF] rounded-lg border border-[#98A1BC]/30">
              <p className="text-sm text-[#555879]">
                <strong>Note:</strong> Your profile information will be visible to {role === 'donor' ? 'NGOs' : 'donors'} on the platform. 
                This helps facilitate communication and coordination for food rescue efforts.
              </p>
              {existingId && (
                <p className="text-xs text-[#98A1BC] mt-2">
                  Profile ID: <code className="bg-[#555879]/10 px-2 py-1 rounded">{existingId}</code>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
          <div className="stat bg-white rounded-2xl shadow-lg border-2 border-[#98A1BC] p-6 text-center">
            <div className="stat-figure text-[#555879]">
              <FaUser className="text-3xl" />
            </div>
            <div className="stat-title text-[#555879]">Profile Status</div>
            <div className={`stat-value text-lg ${isEditing ? 'text-green-600' : 'text-gray-600'}`}>
              {isEditing ? 'Active' : 'Not Created'}
            </div>
          </div>

          <div className="stat bg-white rounded-2xl shadow-lg border-2 border-[#98A1BC] p-6 text-center">
            <div className="stat-figure text-[#555879]">
              {getRoleIcon()}
            </div>
            <div className="stat-title text-[#555879]">Account Type</div>
            <div className="text-lg capitalize stat-value">{getRoleDisplayName()}</div>
          </div>

          <div className="stat bg-white rounded-2xl shadow-lg border-2 border-[#98A1BC] p-6 text-center">
            <div className="stat-figure text-[#555879]">
              <FaEnvelope className="text-3xl" />
            </div>
            <div className="stat-title text-[#555879]">Contact Ready</div>
            <div className={`stat-value text-lg ${formData.email || formData.phone ? 'text-green-600' : 'text-gray-600'}`}>
              {formData.email || formData.phone ? 'Yes' : 'No'}
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border-2 border-[#98A1BC] p-6">
          <h3 className="text-2xl font-bold text-[#555879] mb-4 flex items-center">
            {role === 'donor' ? <FaLeaf className="mr-3" /> : <FaHandHoldingHeart className="mr-3" />}
            Why Your Profile Matters
          </h3>
          <div className="space-y-3 text-[#555879]">
            <p className="flex items-start">
              <span className="text-[#98A1BC] mr-2">•</span>
              <span>Helps {role === 'donor' ? 'NGOs find and contact you' : 'donors know who they are helping'}</span>
            </p>
            <p className="flex items-start">
              <span className="text-[#98A1BC] mr-2">•</span>
              <span>Enables efficient coordination for food rescue operations</span>
            </p>
            <p className="flex items-start">
              <span className="text-[#98A1BC] mr-2">•</span>
              <span>Builds trust within the Food Rescue community</span>
            </p>
            <p className="flex items-start">
              <span className="text-[#98A1BC] mr-2">•</span>
              <span>Ensures your preferences and contact methods are respected</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}