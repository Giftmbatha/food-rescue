import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { clearAuth, getRole, isAuthenticated } from '../auth';
import { FaLeaf, FaMoon, FaSun, FaPlus, FaUser, FaList, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setRole(getRole());
    // Check initial theme
    const html = document.querySelector("html");
    const currentTheme = html?.getAttribute("data-theme") || "light";
    setIsDark(currentTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const html = document.querySelector("html");
    const current = html?.getAttribute("data-theme") || "light";
    const newTheme = current === "light" ? "dark" : "light";
    html?.setAttribute("data-theme", newTheme);
    setIsDark(newTheme === "dark");
  };

  const logout = () => {
    clearAuth();
    setRole(null);
    setIsMobileMenuOpen(false);
    navigate("/login");
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <div className="navbar bg-[#555879] text-[#F9F3EF] shadow-lg rounded-b-xl px-4 sm:px-6">
        {/* Left side - Logo */}
        <div className="flex-1">
          <Link 
            to="/" 
            className="p-0 text-xl font-bold btn btn-ghost hover:bg-transparent"
            onClick={closeMobileMenu}
          >
            <FaLeaf className="text-2xl mr-2 text-[#98A1BC]" />
            <span className="text-[#F9F3EF]">Food Rescue</span>
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="flex-none hidden md:flex">
          <ul className="px-1 space-x-1 menu menu-horizontal">
            {/* Listings Link */}
            <li>
              <Link 
                to="/listings" 
                className={`btn btn-ghost rounded-lg transition-all duration-200 ${
                  isActivePath('/listings') 
                    ? 'bg-[#98A1BC] text-[#555879]' 
                    : 'text-[#F9F3EF] hover:bg-[#98A1BC] hover:text-[#555879]'
                }`}
              >
                <FaList className="mr-2" />
                Listings
              </Link>
            </li>

            {/* Create Listing Link (Donors only) */}
            {role === 'donor' && (
              <li>
                <Link 
                  to="/create-listing" 
                  className={`btn btn-ghost rounded-lg transition-all duration-200 ${
                    isActivePath('/create-listing') 
                      ? 'bg-[#98A1BC] text-[#555879]' 
                      : 'text-[#F9F3EF] hover:bg-[#98A1BC] hover:text-[#555879]'
                  }`}
                >
                  <FaPlus className="mr-2" />
                  Create
                </Link>
              </li>
            )}

            {/* Profile Link */}
            {role && (
              <li>
                <Link 
                  to="/profile" 
                  className={`btn btn-ghost rounded-lg transition-all duration-200 ${
                    isActivePath('/profile') 
                      ? 'bg-[#98A1BC] text-[#555879]' 
                      : 'text-[#F9F3EF] hover:bg-[#98A1BC] hover:text-[#555879]'
                  }`}
                >
                  <FaUser className="mr-2" />
                  Profile
                </Link>
              </li>
            )}

            {/* Theme Toggle Button */}
            <li>
              <button 
                className="btn btn-ghost btn-circle text-[#F9F3EF] hover:bg-[#98A1BC] hover:text-[#555879] transition-all duration-200"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {isDark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>
            </li>

            {/* Auth Buttons */}
            {!role ? (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className="btn btn-outline border-[#F9F3EF] text-[#F9F3EF] hover:bg-[#F9F3EF] hover:text-[#555879] rounded-lg transition-all duration-200"
                  >
                    <FaSignInAlt className="mr-2" />
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="btn btn-primary bg-[#F9F3EF] text-[#555879] hover:bg-[#98A1BC] hover:text-white border-none rounded-lg transition-all duration-200"
                  >
                    <FaUserPlus className="mr-2" />
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button 
                  className="btn btn-outline border-[#F9F3EF] text-[#F9F3EF] hover:bg-[#F9F3EF] hover:text-[#555879] rounded-lg transition-all duration-200"
                  onClick={logout}
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile menu button */}
        <div className="flex-none md:hidden">
          <button 
            className="btn btn-ghost btn-circle text-[#F9F3EF]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Slide-in */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#555879] text-[#F9F3EF] shadow-2xl z-50 transform transition-transform duration-300 md:hidden ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/" 
              className="flex items-center text-xl font-bold"
              onClick={closeMobileMenu}
            >
              <FaLeaf className="text-2xl mr-2 text-[#98A1BC]" />
              Food Rescue
            </Link>
            <button 
              className="btn btn-ghost btn-circle text-[#F9F3EF]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/listings" 
                  className={`btn btn-ghost justify-start w-full rounded-lg transition-all duration-200 ${
                    isActivePath('/listings') 
                      ? 'bg-[#98A1BC] text-[#555879]' 
                      : 'text-[#F9F3EF] hover:bg-[#98A1BC] hover:text-[#555879]'
                  }`}
                  onClick={closeMobileMenu}
                >
                  <FaList className="mr-3" />
                  Listings
                </Link>
              </li>

              {role === 'donor' && (
                <li>
                  <Link 
                    to="/create-listing" 
                    className={`btn btn-ghost justify-start w-full rounded-lg transition-all duration-200 ${
                      isActivePath('/create-listing') 
                        ? 'bg-[#98A1BC] text-[#555879]' 
                        : 'text-[#F9F3EF] hover:bg-[#98A1BC] hover:text-[#555879]'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <FaPlus className="mr-3" />
                    Create Listing
                  </Link>
                </li>
              )}

              {role && (
                <li>
                  <Link 
                    to="/profile" 
                    className={`btn btn-ghost justify-start w-full rounded-lg transition-all duration-200 ${
                      isActivePath('/profile') 
                        ? 'bg-[#98A1BC] text-[#555879]' 
                        : 'text-[#F9F3EF] hover:bg-[#98A1BC] hover:text-[#555879]'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <FaUser className="mr-3" />
                    Profile
                  </Link>
                </li>
              )}

              {/* Theme Toggle in Mobile */}
              <li>
                <button 
                  className="btn btn-ghost justify-start w-full rounded-lg text-[#F9F3EF] hover:bg-[#98A1BC] hover:text-[#555879] transition-all duration-200"
                  onClick={toggleTheme}
                >
                  {isDark ? (
                    <>
                      <FaSun className="mr-3" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <FaMoon className="mr-3" />
                      Dark Mode
                    </>
                  )}
                </button>
              </li>
            </ul>
          </nav>

          {/* Auth Section */}
          <div className="pt-6 border-t border-[#98A1BC]">
            {!role ? (
              <div className="space-y-3">
                <Link 
                  to="/login" 
                  className="btn btn-outline border-[#F9F3EF] text-[#F9F3EF] hover:bg-[#F9F3EF] hover:text-[#555879] w-full rounded-lg transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  <FaSignInAlt className="mr-2" />
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary bg-[#F9F3EF] text-[#555879] hover:bg-[#98A1BC] hover:text-white border-none w-full rounded-lg transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  <FaUserPlus className="mr-2" />
                  Register
                </Link>
              </div>
            ) : (
              <button 
                className="btn btn-outline border-[#F9F3EF] text-[#F9F3EF] hover:bg-[#F9F3EF] hover:text-[#555879] w-full rounded-lg transition-all duration-200"
                onClick={logout}
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            )}
          </div>

          {/* User Role Indicator */}
          {role && (
            <div className="mt-4 p-3 bg-[#98A1BC] bg-opacity-20 rounded-lg">
              <p className="text-sm text-center text-[#F9F3EF]">
                Logged in as <span className="font-semibold capitalize">{role}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}