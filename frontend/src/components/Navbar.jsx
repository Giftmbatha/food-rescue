import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, X, Sun, Moon, User, LogOut } from "lucide-react"

const getRole = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userRole")
  }
  return null
}

const clearAuth = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userRole")
    localStorage.removeItem("authToken")
  }
}

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
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "#F9F3EF",
        borderColor: "#98A1BC20",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#555879" }}
              >
                <span className="text-white font-bold text-sm">FR</span>
              </div>
              <span className="text-xl font-bold" style={{ color: "#555879" }}>
                Food Rescue
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/listings"
                      className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-opacity-10"
                      style={{
                        color: "#555879",
                        ":hover": { backgroundColor: "#98A1BC20" },
                      }}
                    >
                      Browse Listings
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {role === "donor" && (
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/create-listing"
                        className="px-4 py-2 rounded-md text-sm font-medium transition-colors"
                        style={{ color: "#555879" }}
                      >
                        Create Listing
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )}

                {role && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="px-4 py-2 text-sm font-medium" style={{ color: "#555879" }}>
                      <User className="w-4 h-4 mr-2" />
                      Account
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-48 p-2" style={{ backgroundColor: "#F9F3EF" }}>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/profile"
                            className="block px-3 py-2 rounded-md text-sm hover:bg-opacity-10 transition-colors"
                            style={{ color: "#555879" }}
                          >
                            Profile
                          </Link>
                        </NavigationMenuLink>
                        <button
                          onClick={logout}
                          className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-opacity-10 transition-colors flex items-center"
                          style={{ color: "#555879" }}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 hover:bg-opacity-10"
              style={{ color: "#555879" }}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            {/* Auth Buttons for Desktop */}
            {!role ? (
              <div className="hidden md:flex items-center space-x-2">
                <Button asChild variant="ghost" size="sm" style={{ color: "#555879" }}>
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  style={{
                    backgroundColor: "#555879",
                    color: "#F9F3EF",
                    ":hover": { backgroundColor: "#98A1BC" },
                  }}
                >
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            ) : null}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{ color: "#555879" }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t" style={{ borderColor: "#98A1BC20" }}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/listings"
                className="block px-3 py-2 rounded-md text-base font-medium transition-colors"
                style={{ color: "#555879" }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Listings
              </Link>

              {role === "donor" && (
                <Link
                  href="/create-listing"
                  className="block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  style={{ color: "#555879" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Create Listing
                </Link>
              )}

              {role && (
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  style={{ color: "#555879" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              )}

              {!role ? (
                <div className="space-y-1 pt-2 border-t" style={{ borderColor: "#98A1BC20" }}>
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium transition-colors"
                    style={{ color: "#555879" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium transition-colors"
                    style={{ color: "#555879" }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => {
                    logout()
                    setIsMobileMenuOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors"
                  style={{ color: "#555879" }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

