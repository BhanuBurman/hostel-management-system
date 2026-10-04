import { useState } from "react";
import {
  HiPhone,
  HiEnvelope,
  HiMapPin,
  HiClock,
  HiPaperAirplane,
  HiCheckCircle,
} from "react-icons/hi2";

const ContactUs = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", category: "General Inquiry", message: "" });
    }, 4000);
  };

  const contactCards = [
    {
      title: "24/7 Warden Helpline",
      info: "+91 (0416) 220-2100",
      subInfo: "Toll-Free Campus Emergency",
      icon: HiPhone,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "System Helpdesk",
      info: "support@smarthostels.vit.ac.in",
      subInfo: "Average Response: < 2 Hours",
      icon: HiEnvelope,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      title: "Hostel Care Office",
      info: "Block G, Main Campus, VIT",
      subInfo: "Mon - Sat: 9:00 AM - 6:00 PM",
      icon: HiMapPin,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-6 lg:px-16 border-t border-slate-800/80 bg-slate-950/70 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
            We Are Here To Assist
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
            Connect with Hostel Administration
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-4">
            Have questions regarding room changes, meal options, or technical
            assistance? Reach out to our campus team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Cards Column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {contactCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all flex items-start gap-4 backdrop-blur-sm"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border ${card.color}`}
                  >
                    <Icon />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300">
                      {card.title}
                    </h3>
                    <p className="text-base font-bold text-white mt-0.5">
                      {card.info}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      {card.subInfo}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Quick Emergency Note */}
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-800/40 text-blue-200 text-xs leading-relaxed flex items-center gap-3">
              <HiClock className="text-xl text-blue-400 shrink-0" />
              <span>
                For active room complaints, please use the{" "}
                <strong className="text-white underline">Complain Desk</strong> for
                direct tracking and instant ticketing.
              </span>
            </div>
          </div>

          {/* Right Inquiry Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800/90 shadow-2xl backdrop-blur-xl">
            <h3 className="text-xl font-bold text-white mb-2">
              Send an Instant Inquiry
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Our campus administration team will respond to your registered email.
            </p>

            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl mb-4">
                  <HiCheckCircle />
                </div>
                <h4 className="text-xl font-bold text-white mb-1">
                  Message Sent Successfully!
                </h4>
                <p className="text-slate-400 text-sm max-w-sm">
                  Thank you for reaching out. A copy of your inquiry has been
                  forwarded to the hostel office.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Institutional Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul.v2024@vitstudent.ac.in"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Inquiry Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Room Allocation Help">Room Allocation Help</option>
                    <option value="Mess & Dining Timetable">Mess & Dining Timetable</option>
                    <option value="Emergency Warden Escalation">Emergency Warden Escalation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry or question..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <HiPaperAirplane className="text-base" />
                  <span>Send Message to Warden Office</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
