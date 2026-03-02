"use client";

import Link from "next/link";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: ButtonProps) {
  const baseStyle =
    "px-5 py-2 rounded-lg font-medium transition duration-300 inline-block text-center";

  const variants = {
    primary:
      "bg-orange-500 text-white hover:bg-orange-600",
    secondary:
      "bg-slate-900 text-white hover:bg-slate-800",
    outline:
      "border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
  };

  const styles = `${baseStyle} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={styles}>
      {children}
    </button>
  );
}