import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import hostelImg from "../assets/hostel-front-img.jpg";
import {
  HiSparkles,
  HiArrowRight,
  HiShieldCheck,
  HiCheckCircle,
  HiBolt,
  HiClock,
  HiKey,
  HiBuildingOffice2,
  HiChatBubbleBottomCenterText,
  HiChevronDown,
  HiStar,
  HiUserGroup,
} from "react-icons/hi2";
import { FaBed, FaUtensils, FaTools, FaLock } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);

  const stats = [
    { label: "Beds Monitored", value: "500+", icon: FaBed },
    { label: "Resolution Speed", value: "< 24 Hrs", icon: HiClock },
    { label: "System Uptime", value: "99.9%", icon: HiShieldCheck },
    { label: "Zero Overbooking", value: "100%", icon: HiBolt },
  ];

  const features = [
    {
      title: "Real-Time Room Booking",
      desc: "Live floor-wise bed availability with database-level pessimistic locking to guarantee zero double-booking conflicts.",
      icon: FaBed,
      gradient: "from-blue-500 to-cyan-500",
      pill: "Pessimistic Lock",
      link: "/rooms",
    },
    {
      title: "Digital Maintenance Desk",
      desc: "Lodge electrical, plumbing, or cleaning issues with live ticket statuses: Pending, In-Progress, and Resolved.",
      icon: FaTools,
      gradient: "from-amber-500 to-orange-500",
      pill: "Ticket Lifecycle",
      link: "/complain-page",
    },
    {
      title: "Weekly Food Timetable",
      desc: "Transparent breakfast, lunch, snacks, and dinner schedules categorized by day with real-time updates.",
      icon: FaUtensils,
      gradient: "from-emerald-500 to-teal-500",
      pill: "Live Menus",
      link: "/food-menu",
    },
    {
      title: "Role-Based Access Control",
      desc: "Stateless JWT authentication isolating student self-service capabilities and warden governance controls.",
      icon: FaLock,
      gradient: "from-indigo-500 to-purple-500",
      pill: "Stateless JWT",
      link: "/register",
    },
    {
      title: "Floor-Wise Interactive Views",
      desc: "Visual representation of every floor, room occupancy rates, and room amenities (AC, Non-AC, Deluxe).",
      icon: HiBuildingOffice2,
      gradient: "from-pink-500 to-rose-500",
      pill: "Floor Maps",
      link: "/rooms",
    },
    {
      title: "Direct Warden Support",
      desc: "Instant communication channels for grievance resolution with automated timestamp logs and accountability.",
      icon: HiChatBubbleBottomCenterText,
      gradient: "from-violet-500 to-blue-500",
      pill: "24/7 Desk",
      link: "/complain-page",
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Authenticate Securely",
      desc: "Log in with your institutional registration credentials with instant role-based access for Students and Wardens.",
    },
    {
      step: "02",
      title: "Select & Reserve Your Bed",
      desc: "Browse live floor plans, compare room categories, and lock in your bed choice instantaneously.",
    },
    {
      step: "03",
      title: "Enjoy Hassle-Free Living",
      desc: "Monitor weekly meals, raise maintenance requests in seconds, and track resolution progress in real time.",
    },
  ];

  const testimonials = [
    {
      name: "Harish Sharma",
      role: "3rd Year, Computer Science",
      comment:
        "The room booking process was smooth and instantaneous. No standing in long hostel office queues or worrying about paper forms!",
      room: "Room B-010",
      rating: 5,
    },
    {
      name: "Dr. Dinesh Kumar",
      role: "Senior Hostel Warden",
      comment:
        "The administrative panel changed how we manage room allocations and student grievances. Everything is transparent and auditable.",
      room: "Warden Office",
      rating: 5,
    },
    {
      name: "Ananya Patel",
      role: "Final Year, Electronics",
      comment:
        "Whenever there's an issue with plumbing or electricals, the ticket tracking keeps us updated without multiple follow-ups.",
      room: "Room A-204",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "How does the system prevent double-booking of rooms?",
      a: "The backend uses database-level pessimistic locking (`SELECT ... FOR UPDATE`). When a student initiates a bed booking, that specific room row is locked until the transaction commits, ensuring concurrency safety even under heavy booking traffic.",
    },
    {
      q: "Can I switch or vacate my room after booking?",
      a: "Yes! If you select a new available room, the system automatically frees your previous bed, increments availability on the old room, and reserves the new bed in a single atomic transaction.",
    },
    {
      q: "How do I track my submitted maintenance complaints?",
      a: "Go to the Complain Desk from the navigation bar. You will see all your tickets with real-time status pills: PENDING, IN_PROGRESS, or RESOLVED, along with administrative notes.",
    },
    {
      q: "How often is the dining menu updated?",
      a: "The dining timetable is published weekly and accessible 24/7 on the Food Menu tab, detailing meals for all seven days across Breakfast, Lunch, Snacks, and Dinner.",
    },
  ];

  return (
    <div className="w-full bg-[#0b0f19] text-slate-100 overflow-hidden relative">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-10 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-6 lg:px-16 pt-8 pb-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <motion.div
            className="lg:col-span-7 flex flex-col items-start z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-inner mb-6 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-wide bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
                VIT Campus Smart Living Portal
              </span>
              <HiSparkles className="text-amber-400 text-xs" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-6">
              Effortless Hostel Living,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                Intelligently Managed.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              Experience seamless room allocations with zero double-booking,
              instant maintenance grievance tracking, and live campus dining
              schedules — all consolidated in a unified, modern interface.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/rooms")}
                className="flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-500/25 transition-all duration-300 cursor-pointer"
              >
                <span>Explore Rooms & Book</span>
                <HiArrowRight className="text-lg" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/food-menu")}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-600 shadow-lg backdrop-blur-md transition-all duration-300 cursor-pointer"
              >
                <FaUtensils className="text-blue-400 text-sm" />
                <span>View Food Menu</span>
              </motion.button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 mt-10 border-t border-slate-800/80 w-full">
              {stats.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-blue-400 mb-1">
                      <Icon className="text-sm" />
                      <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {s.value}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Visual Column (Interactive Showcase Card) */}
          <motion.div
            className="lg:col-span-5 relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
            {/* Outer Glowing Frame */}
            <div className="relative w-full max-w-lg rounded-3xl p-1 bg-gradient-to-b from-blue-500/30 via-slate-800/40 to-indigo-500/20 shadow-2xl shadow-blue-500/10">
              <div className="relative rounded-[22px] overflow-hidden bg-slate-950 border border-slate-800/90">
                {/* Hero Showcase Image */}
                <img
                  src={hostelImg}
                  alt="Hostel Campus"
                  className="w-full h-80 sm:h-96 object-cover object-center transform hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
                />

                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                {/* Floating Badge 1 - Top Left */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute top-4 left-4 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-lg"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">
                    <HiBolt />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Concurrency Engine
                    </p>
                    <p className="text-xs font-bold text-emerald-300">
                      Zero Double-Booking
                    </p>
                  </div>
                </motion.div>

                {/* Floating Badge 2 - Bottom Right */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-5 right-5 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl shadow-xl"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">
                    <HiShieldCheck />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Stateless Security
                    </p>
                    <p className="text-xs font-bold text-white">
                      JWT Auth Verified
                    </p>
                  </div>
                </motion.div>

                {/* Floating Badge 3 - Bottom Left */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-5 left-5 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 backdrop-blur-md"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-semibold text-slate-200">
                    Dining Timetable Live
                  </span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CORE FEATURES GRID ================= */}
      <section className="relative py-20 px-6 lg:px-16 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              Engineered For Modern Campus Life
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Everything You Need for a Seamless Hostel Experience
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-4">
              Built on enterprise Java and React architectures to guarantee fast,
              reliable, and secure operations for students and administrative wardens.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  onClick={() => navigate(feat.link)}
                  className="group relative p-7 rounded-2xl bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-300 backdrop-blur-sm cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  {/* Subtle Top Gradient Accent */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feat.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.gradient} p-0.5 shadow-md flex items-center justify-center`}
                    >
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-white">
                        <Icon className="text-xl" />
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider text-slate-400 bg-slate-800/70 px-2.5 py-1 rounded-full border border-slate-700/50">
                      {feat.pill}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {feat.desc}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:text-blue-300 transition-all">
                    <span>Explore Module</span>
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS WORKFLOW ================= */}
      <section className="relative py-20 px-6 lg:px-16 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
              Simple 3-Step Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              How Smart Hostels Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {workflowSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative p-8 rounded-2xl bg-slate-900/40 border border-slate-800/90 flex flex-col items-start backdrop-blur-md"
              >
                <div className="text-4xl font-black bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS / EXPERIENCES ================= */}
      <section className="relative py-20 px-6 lg:px-16 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
              Community Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Trusted by Students & Campus Administrators
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4 text-sm">
                    {[...Array(t.rating)].map((_, i) => (
                      <HiStar key={i} />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm italic leading-relaxed mb-6">
                    "{t.comment}"
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-400 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20">
                    {t.room}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ ACCORDION ================= */}
      <section className="relative py-20 px-6 lg:px-16 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
              Common Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-sm overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-800/30 transition-colors"
                  >
                    <span className="text-base font-semibold text-slate-200">
                      {faq.q}
                    </span>
                    <HiChevronDown
                      className={`text-slate-400 text-lg transform transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-blue-400" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-sm text-slate-400 leading-relaxed border-t border-slate-800/40">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HIGH-IMPACT CTA BANNER ================= */}
      <section className="relative py-20 px-6 lg:px-16 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto relative rounded-3xl overflow-hidden p-8 sm:p-14 bg-gradient-to-r from-blue-900/60 via-indigo-900/50 to-slate-900/90 border border-blue-500/30 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Ready to Upgrade Your Campus Life?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Join hundreds of students enjoying instantaneous room bookings,
                real-time maintenance tracking, and transparent dining schedules.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                Create Student Account
              </button>
              <button
                onClick={() => navigate("/rooms")}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer"
              >
                Browse Available Rooms
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;