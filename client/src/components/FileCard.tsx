"use client";

import { useState } from "react";
import Button from "./Button";

interface FileCardProps {
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  author: string;
  fileType: string;
  onPurchase?: () => void;
}

export default function FileCard({
  title,
  description,
  price,
  image,
  category,
  author,
  fileType,
  onPurchase,
}: FileCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden 
      transition duration-300 transform hover:-translate-y-2 hover:shadow-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <span className="absolute top-3 right-3 z-10 text-xs font-medium bg-white px-2 py-1 rounded shadow">
          {fileType}
        </span>

        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover transition duration-300 ${
            hovered ? "scale-105" : "scale-100"
          }`}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-semibold text-lg text-slate-900">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
          {description}
        </p>

        {/* Category + Author */}
        <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
          <span className="px-2 py-1 bg-gray-100 rounded-full">
            {category}
          </span>
          <span>by {author}</span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between mt-5">
          <span className="text-lg font-bold text-slate-900">
            ₹{price}
          </span>

          <Button
            onClick={onPurchase}
            variant="primary"
            className="px-4 py-1 text-sm"
          >
            Purchase
          </Button>
        </div>
      </div>
    </div>
  );
}