import { NavLink } from "react-router-dom";
import { FaBuilding, FaGithub, FaShieldAlt } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const Footer = () => {
  return (
    <footer className="bg-[#070a11] text-slate-400 border-t border-slate-800/90 pt-16 pb-12 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <FaBuilding className="text-blue-400 text-sm" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white">
                Smart<span className="text-blue-500">Hostels</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Next-generation hostel operations management for resident students
              and administrative staff at VIT.
            </p>
            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <NavLink to="/rooms" className="hover:text-blue-400 transition-colors">
                  Live Room Booking
                </NavLink>
              </li>
              <li>
                <NavLink to="/food-menu" className="hover:text-blue-400 transition-colors">
                  Dining Timetable
                </NavLink>
              </li>
              <li>
                <NavLink to="/complain-page" className="hover:text-blue-400 transition-colors">
                  Maintenance Helpdesk
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="hover:text-blue-400 transition-colors">
                  Student Registration
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Architecture */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              System Architecture
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <FaShieldAlt className="text-blue-400 text-xs" />
                <span>Stateless JWT Security</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <HiSparkles className="text-blue-400 text-xs" />
                <span>Pessimistic Concurrency</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span className="text-blue-400 font-mono text-xs">REST</span>
                <span>Spring Boot 3.4 & JPA</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <span className="text-blue-400 font-mono text-xs">Vite</span>
                <span>React 18 SPA Engine</span>
              </li>
            </ul>
          </div>

          {/* Campus Location */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Campus Address
            </h4>
            <p className="text-sm leading-relaxed text-slate-400 mb-2">
              Hostel Affairs Administration,
              <br />
              Vellore Institute of Technology,
              <br />
              Vellore, Tamil Nadu — 632014
            </p>
            <p className="text-xs text-slate-500 mt-3">
              Emergency Office Hotline: (0416) 220-2100
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Smart Hostels — VIT Hostel Management System. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
