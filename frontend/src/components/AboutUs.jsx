import { motion } from "framer-motion";
import {
  HiShieldCheck,
  HiCpuChip,
  HiHeart,
  HiEye,
} from "react-icons/hi2";
import { FaJava, FaReact, FaDocker } from "react-icons/fa";
import { SiMysql, SiSpringboot } from "react-icons/si";

const AboutUs = () => {
  const pillars = [
    {
      title: "Zero-Latency Automation",
      desc: "Replacing cumbersome physical registers and queues with instantaneous digital allocation and verification.",
      icon: HiCpuChip,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Transactional Integrity",
      desc: "Database-level pessimistic locks ensure absolute concurrency protection during high-demand room booking windows.",
      icon: HiShieldCheck,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Student-First Accountability",
      desc: "Every maintenance request has a trackable lifecycle with timestamps, warden assignments, and status updates.",
      icon: HiHeart,
      color: "text-pink-400",
      bg: "bg-pink-500/10 border-pink-500/20",
    },
    {
      title: "Radical Transparency",
      desc: "From floor-wise inventory to daily food menus, students have real-time visibility into all hostel operations.",
      icon: HiEye,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
  ];

  const techStack = [
    { name: "Java 21", icon: FaJava },
    { name: "Spring Boot 3.4", icon: SiSpringboot },
    { name: "React 18 & Vite", icon: FaReact },
    { name: "MySQL 8.0", icon: SiMysql },
    { name: "Dockerized", icon: FaDocker },
  ];

  return (
    <section id="about" className="relative py-24 px-6 lg:px-16 border-t border-slate-800/80 bg-[#0b0f19] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">
            Our Mission & Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
            Designed for Modern Academic Communities
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4 leading-relaxed">
            Smart Hostels was engineered to transform traditional campus living
            into an automated, secure, and stress-free environment for both
            resident students and campus wardens.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col justify-between backdrop-blur-sm"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 border ${p.bg} ${p.color}`}
                  >
                    <Icon />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Ribbon */}
        <div className="rounded-2xl bg-slate-900/40 border border-slate-800/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Powered by Enterprise Tech Stack:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {techStack.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-slate-300 text-xs font-medium"
                >
                  <Icon className="text-blue-400 text-sm" />
                  <span>{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
