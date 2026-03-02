"use client";

import { Globe, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutPage() {
  const features = [
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Creators from 50+ countries sell their digital files to a worldwide audience.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Trusted",
      description:
        "Every transaction is protected. Files are only accessible to verified purchasers.",
    },
    {
      icon: Users,
      title: "Community Driven",
      description:
        "Thousands of creators and buyers trust FileMarket for their digital needs.",
    },
  ];

  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900"
        >
          About FileMarket
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-gray-600 max-w-2xl mx-auto"
        >
          We’re building the most trusted marketplace for digital files,
          connecting creators with buyers worldwide.
        </motion.p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl shadow-md p-8 text-center group transition duration-300"
              >
                {/* Icon Box */}
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-xl bg-orange-500 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Icon size={28} />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}