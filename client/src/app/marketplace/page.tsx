"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import FileCard from "@/components/FileCard";
import { useRouter } from "next/navigation";

interface FileType {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  fileUrl: string;
  creator?: {
    fullName: string;
  };
}

const categories = [
  "All",
  "Design",
  "Photography",
  "Business",
  "Documents",
  "Marketing",
];

const BASE_URL = "http://localhost:5000";

export default function MarketplacePage() {
  const [files, setFiles] = useState<FileType[]>([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const router = useRouter();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/files`);
        const data = await res.json();
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files", error);
      }
    };

    fetchFiles();
  }, []);

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesSearch =
        file.title.toLowerCase().includes(search.toLowerCase()) ||
        file.creator?.fullName
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" || file.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [files, search, activeCategory]);

  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage);

  const paginatedFiles = filteredFiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

 const handlePurchase = (file: FileType) => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/register");
    return;
  }

  router.push(`/purchase/${file._id}`);
};

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-900">
          Marketplace
        </h1>

        <p className="text-gray-600 mt-2">
          Discover and purchase premium digital files
        </p>

        {/* Search + Filters */}
        <div className="mt-8 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="relative w-full lg:w-1/2">
            <Search
              className="absolute left-4 top-3 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search files, creators..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <SlidersHorizontal size={18} className="text-gray-500" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1 rounded-full text-sm transition
                  ${
                    activeCategory === cat
                      ? "bg-orange-500 text-white"
                      : "bg-white border border-gray-300 hover:border-orange-500 hover:text-orange-500"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          {filteredFiles.length} files found
        </p>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {paginatedFiles.map((file) => {
            const fileType =
              file.fileUrl.split(".").pop()?.toLowerCase() || "file";

            return (
              <FileCard
                key={file._id}
                title={file.title}
                description={file.description}
                price={file.price}
                image={`${BASE_URL}${file.fileUrl}`}
                category={file.category}
                fileType={`.${fileType}`}
                author={file.creator?.fullName || "Unknown"}
                onPurchase={() => handlePurchase(file)}
              />
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-12">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 border rounded-md disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-md transition
                  ${
                    currentPage === i + 1
                      ? "bg-orange-500 text-white"
                      : "border hover:border-orange-500"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 border rounded-md disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}