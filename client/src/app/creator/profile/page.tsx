"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

/* 🔥 IMPORTANT:
   Do NOT name this interface "File"
   It conflicts with browser File type
*/
interface UploadedFile {
  _id: string;
  title: string;
  price: number;
  sales: number;
  fileUrl: string;
}

interface User {
  fullName: string;
}

export default function CreatorProfile() {
  const router = useRouter();

  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Design");

  // 🔥 Browser File type (correct one)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  // ✅ Get token safely (client only)
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  useEffect(() => {
    const storedUser =
      typeof window !== "undefined"
        ? localStorage.getItem("user")
        : null;

    const token = getToken();

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    fetchFiles(token);
  }, []);

  /* ==============================
        FETCH USER FILES
  ============================== */
  const fetchFiles = async (token: string) => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/files/my-files",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      console.log("Backend response:", data);

      // ✅ SAFELY HANDLE DIFFERENT RESPONSE STRUCTURES
      if (Array.isArray(data)) {
        setFiles(data);
      } else if (Array.isArray(data.files)) {
        setFiles(data.files);
      } else if (Array.isArray(data.data)) {
        setFiles(data.data);
      } else {
        setFiles([]);
      }
    } catch (error) {
      console.error("Failed to fetch files:", error);
      setFiles([]);
    }
  };

  /* ==============================
        UPLOAD FILE
  ============================== */
  const handleUpload = async () => {
  const token = getToken();

  if (!selectedFile || !token) {
    toast.error("Please select a file");
    return;
  }

  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("price", price);
    formData.append("category", category);

    const res = await fetch(
      `http://localhost:5000/api/files/upload`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const newFile = await res.json();

    // ✅ Add instantly to UI (no refetch delay)
    setFiles((prev) => [newFile, ...prev]);

    // ✅ Reset Form
    setTitle("");
    setPrice("");
    setSelectedFile(null);

    // reset file input manually
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";

    toast.success("File uploaded successfully 🎉");
  } catch (error) {
    toast.error("Upload failed ❌");
  } finally {
    setUploading(false);
  }
};

  /* ==============================
        SAFE CALCULATIONS
  ============================== */

  const totalRevenue = Array.isArray(files)
    ? files.reduce(
        (acc, file) => acc + file.price * file.sales,
        0
      )
    : 0;

  const totalSales = Array.isArray(files)
    ? files.reduce((acc, file) => acc + file.sales, 0)
    : 0;

  /* ==============================
        UI
  ============================== */

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold">
            Creator Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome, {user?.fullName}
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white p-8 rounded-2xl shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-6">
            Upload New File
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="File Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option>Design</option>
              <option>Business</option>
              <option>Photography</option>
              <option>Marketing</option>
            </select>

            <input
              type="file"
              onChange={(e) =>
                setSelectedFile(
                  e.target.files
                    ? e.target.files[0]
                    : null
                )
              }
              className="border rounded-lg px-4 py-2"
            />

          </div>

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Files" value={files.length} />
          <StatCard title="Total Sales" value={totalSales} />
          <StatCard title="Total Revenue" value={`₹${totalRevenue}`} />
        </div>

        {/* File List */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-6">
            Your Uploaded Files
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {files.map((file) => (
              <motion.div
                key={file._id}
                whileHover={{ scale: 1.02 }}
                className="border p-5 rounded-xl hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg">
                  {file.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  ₹{file.price}
                </p>

                <p className="text-gray-500 mt-1">
                  Sales: {file.sales}
                </p>

                <a
                  href={`http://localhost:5000${file.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  View File
                </a>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-orange-500 mt-2">
        {value}
      </h3>
    </div>
  );
}