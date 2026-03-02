"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import FileCard from "./FileCard";

export default function FeaturedSection() {
  const router = useRouter();

  const files = [
    {
      title: "Brand Identity Kit",
      description:
        "Complete brand guidelines with logos, colors, and typography",
      price: 499,
      image: "/icons/pdf.png",
      category: "Design",
      author: "DesignPro",
      fileType: ".pdf",
    },
    {
      title: "Stock Photo Pack",
      description:
        "50 high-resolution nature photography shots",
      price: 299,
      image: "/icons/jpg.png",
      category: "Photography",
      author: "PhotoArt",
      fileType: ".jpg",
    },
    {
      title: "Financial Report Template",
      description:
        "Professional Excel template for quarterly reports",
      price: 199,
      image: "/icons/xlsx.png",
      category: "Business",
      author: "BizTools",
      fileType: ".xlsx",
    },
    {
      title: "App Wireframe Kit",
      description:
        "Mobile app wireframe templates for rapid prototyping",
      price: 349,
      image: "/icons/png.png",
      category: "Design",
      author: "UXMaster",
      fileType: ".png",
    },
  ];

  const handlePurchase = (title: string) => {
    alert(`Purchased: ${title}`);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Featured Files
            </h2>
            <p className="text-gray-600 mt-2">
              Popular picks from top creators
            </p>
          </div>

          <button
  onClick={() => router.push("/marketplace")}
  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:border-orange-500"
>
            View All <ArrowRight size={18} />
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {files.map((file, index) => (
            <FileCard
              key={index}
              {...file}
              onPurchase={() => handlePurchase(file.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}