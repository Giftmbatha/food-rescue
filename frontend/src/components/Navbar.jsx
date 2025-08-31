import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuth, getRole } from '../auth';
import { FaMoon, FaSun, FaPlus, FaUser, FaList, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaLeaf } from 'react-icons/fa';

export default function Navbar() {
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setRole(getRole())
  }, [])

  const toggleTheme = () => {
    const html = document.querySelector("html")
    const current = html?.getAttribute("data-theme") || "light"
    const newTheme = current === "light" ? "dark" : "light"
    html?.setAttribute("data-theme", newTheme)
    setIsDark(newTheme === "dark")
  }

  const logout = () => {
    clearAuth()
    setRole(null)
    router.push("/login")
  }

  return (
    <div className="shadow-lg navbar rounded-b-xl" style={{ backgroundColor: '#555879' }}>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-[#F9F3EF] hover:bg-transparent">
          <FaLeaf className="inline-block mr-2" />
          Food Rescue
        </Link>
      </div>
      <div className="flex-none">
        <ul className="p-0 menu menu-horizontal">
          {/* Main Navigation Links */}
          <li className='md:hidden'>
            <label htmlFor="mobile-menu" className="text-white btn btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </label>
            <input type="checkbox" id="mobile-menu" className="drawer-toggle" />
          </li>
          <li className="hidden md:flex">
            <Link to="/listings" className="text-[#F9F3EF] hover:bg-[#98A1BC] hover:text-[#555879] rounded-lg transition-colors duration-200">
              <FaList /> Listings
            </Link>
          </li>
          {role === 'donor' && (
            <li className="hidden md:flex">
              <Link to="/create-listing" className="text-[#F9F3EF] hover:bg-[#98A1BC] hover:text-[#555879] rounded-lg transition-colors duration-200">
                <FaPlus /> Create Listing
              </Link>
            </li>
          )}
          {role && (
            <li className="hidden md:flex">
              <Link to="/profile" className="text-[#F9F3EF] hover:bg-[#98A1BC] hover:text-[#555879] rounded-lg transition-colors duration-200">
                <FaUser /> Profile
              </Link>
            </li>
          )}

          {/* Theme Toggle Button */}
          <li>
            <button className="btn btn-ghost text-[#F9F3EF] hover:bg-[#98A1BC] hover:text-[#555879] rounded-full transition-colors duration-200" onClick={toggleTheme}>
              <FaSun className="w-5 h-5 swap-off" />
              <FaMoon className="w-5 h-5 swap-on" />
            </button>
          </li>

          {/* Auth Buttons */}
          {!role ? (
            <>
              <li className="hidden md:flex">
                <Link to="/login" className="btn btn-outline border-[#F9F3EF] text-[#F9F3EF] hover:bg-[#F9F3EF] hover:text-[#555879] rounded-lg transition-colors duration-200">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li className="hidden md:flex">
                <Link to="/register" className="btn btn-primary bg-[#F9F3EF] text-[#555879] hover:bg-[#98A1BC] hover:text-white border-none rounded-lg transition-colors duration-200">
                  <FaUserPlus /> Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button className="btn btn-outline border-[#F9F3EF] text-[#F9F3EF] hover:bg-[#F9F3EF] hover:text-[#555879] rounded-lg transition-colors duration-200" onClick={logout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
