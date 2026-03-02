"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function FileViewer() {
  const { id } = useParams();
  const [file, setFile] = useState<FileType | null>(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/files/files/${id}`
        );
        const data = await res.json();
        setFile(data);
      } catch (error) {
        console.error("Error fetching file", error);
      }
    };

    if (id) fetchFile();
  }, [id]);

  if (!file) return <div className="p-10">Loading...</div>;

  const fileType = file.fileUrl.split(".").pop();

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">{file.title}</h1>
      <p className="text-gray-500 mt-2">
        By {file.creator?.fullName}
      </p>

      <p className="mt-4">{file.description}</p>

      <p className="mt-4 font-semibold text-lg">
        ₹{file.price}
      </p>

      {/* File Preview */}
      <div className="mt-6">
        {fileType === "jpg" ||
        fileType === "png" ||
        fileType === "jpeg" ? (
          <img
            src={`http://localhost:5000${file.fileUrl}`}
            alt={file.title}
            className="rounded-lg shadow-md"
          />
        ) : fileType === "pdf" ? (
          <iframe
            src={`http://localhost:5000${file.fileUrl}`}
            className="w-full h-[600px]"
          />
        ) : (
          <a
            href={`http://localhost:5000${file.fileUrl}`}
            download
            className="text-orange-500 underline"
          >
            Download File
          </a>
        )}
      </div>
    </div>
  );
}