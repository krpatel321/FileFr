"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const BASE_URL = "http://localhost:5000";

export default function PurchasePage() {
  const { id } = useParams();
  const router = useRouter();

  const [file, setFile] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchFile = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/files/${id}`);
      console.log("Status:", res.status);

      const data = await res.json();
      console.log("Data:", data);

      setFile(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchFile();
}, [id]);

  const handlePurchase = async () => {
    if (!email) {
      alert("Please enter email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${BASE_URL}/api/files/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileId: id,
            email,
            paymentMethod,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Purchase failed");
      }

      alert("Purchase Successful ");

      router.push(`/files/${id}`);
    } catch (error) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!file) return <p className="p-20">Loading...</p>;

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">
          Purchase File
        </h1>

        {/* Email */}
        <label className="block mb-2 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          className="w-full border rounded-lg px-4 py-2 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Price */}
        <label className="block mb-2 text-sm font-medium">
          Price
        </label>
        <input
          type="text"
          value={`₹${file.price}`}
          disabled
          className="w-full border rounded-lg px-4 py-2 mb-4 bg-gray-100"
        />

        {/* Payment Options */}
        <label className="block mb-2 text-sm font-medium">
          Payment Method
        </label>

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
          className="w-full border rounded-lg px-4 py-2 mb-6"
        >
          <option value="UPI">UPI</option>
          <option value="Credit Card">
            Credit Card
          </option>
          <option value="Net Banking">
            Net Banking
          </option>
        </select>

        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition"
        >
          {loading ? "Processing..." : "Purchase"}
        </button>
      </div>
    </section>
  );
}