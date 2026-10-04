import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserCircle, FaBuilding, FaSignOutAlt, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import Login from "./Login";
import api from "../AxiosConfig";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [isLoginClicked, setIsLoginClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = (token) => {
    api
      .post("/auth/user-details", token)
      .then((response) => {
        setUserInfo(response.data);
        setUser(response.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      });
  };

  const handleScrollTo = (id) => {
    setMobileMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowDropdown(false);
    navigate("/");
    window.location.reload();
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Book Room", path: "/rooms" },
    { name: "Complain Desk", path: "/complain-page" },
    { name: "Food Menu", path: "/food-menu" },
  ];

  return (
    <>
      {isLoginClicked && <Login onClose={() => setIsLoginClicked(false)} />}

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-xl shadow-black/40 py-3"
            : "bg-slate-950/60 backdrop-blur-md border-b border-slate-800/40 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-0.5 shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <FaBuilding className="text-blue-400 text-lg group-hover:text-blue-300 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text text-transparent">
                Smart<span className="text-blue-500">Hostels</span>
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase -mt-1 font-semibold flex items-center gap-1">
                VIT Campus <HiSparkles className="text-amber-400 text-[9px]" />
              </span>
            </div>
          </NavLink>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-3 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? "text-white bg-blue-600/90 shadow-sm shadow-blue-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <button
              onClick={() => handleScrollTo("about")}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => handleScrollTo("contact")}
              className="px-4 py-1.5 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200 cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer text-slate-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold uppercase shadow-inner">
                    {userInfo?.name ? userInfo.name.charAt(0) : <FaUser />}
                  </div>
                  <span className="text-sm font-medium pr-1">
                    {userInfo?.name ? userInfo.name.split(" ")[0] : "Account"}
                  </span>
                </button>

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-3 w-56 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl p-2 z-50 overflow-hidden"
                    >
                      <div className="px-3 py-2.5 border-b border-slate-800/80">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-semibold text-white truncate">
                          {userInfo?.name || "Student"}
                        </p>
                        <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 font-medium border border-blue-500/20">
                          {userInfo?.roleType || "Resident"}
                        </span>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setShowDropdown(false);
                            navigate("/user-profile", { state: { userInfo } });
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-xl transition-all cursor-pointer"
                        >
                          <FaUser className="text-blue-400 text-xs" />
                          View Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer"
                        >
                          <FaSignOutAlt className="text-xs" />
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsLoginClicked(true)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800/70 transition-all cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-800 bg-slate-950/95 px-6 py-4 flex flex-col gap-2"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium ${
                      isActive ? "bg-blue-600 text-white" : "text-slate-300"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <button
                onClick={() => handleScrollTo("about")}
                className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-300"
              >
                About Us
              </button>
              <button
                onClick={() => handleScrollTo("contact")}
                className="text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-300"
              >
                Contact Us
              </button>

              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate("/user-profile", { state: { userInfo } });
                      }}
                      className="px-3 py-2 text-sm text-left text-slate-200"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="px-3 py-2 text-sm text-left text-red-400"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setIsLoginClicked(true);
                      }}
                      className="w-full py-2 text-center rounded-lg border border-slate-700 text-slate-200 text-sm font-medium"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate("/register");
                      }}
                      className="w-full py-2 text-center rounded-lg bg-blue-600 text-white text-sm font-medium"
                    >
                      Register
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
