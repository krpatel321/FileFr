"use client";

import { Upload, ShieldCheck, Zap, Users } from "lucide-react";

export default function WhySection() {
  const features = [
    {
      icon: <Upload size={28} />,
      title: "Easy Uploads",
      desc: "Upload any file type with a simple drag-and-drop interface",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Secure Access",
      desc: "Only purchased users can download — files stay protected",
    },
    {
      icon: <Zap size={28} />,
      title: "Instant Delivery",
      desc: "Get your files instantly after purchase, no waiting",
    },
    {
      icon: <Users size={28} />,
      title: "Creator Tools",
      desc: "Dashboard with earnings, analytics, and file management",
    },
  ];

  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-4xl font-bold text-slate-900">
          Why FileMarket?
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Everything you need to buy and sell digital files in one place.
        </p>

        {/* Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-left"
            >
              <div className="bg-orange-500 text-white w-14 h-14 flex items-center justify-center rounded-lg">
                {item.icon}
              </div>

              <h3 className="mt-6 font-semibold text-lg text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}