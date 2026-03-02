"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Purchase {
  _id: string;
  file: {
    title: string;
    price: number;
    createdAt: string;
  };
}

export default function BuyerProfile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));

    const fetchPurchases = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/my-purchases",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();
        setPurchases(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [router]);

//  const handleLogout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");

//   // 🔥 Notify navbar
//   window.dispatchEvent(new Event("authChanged"));

//   router.push("/");
// };

  const totalSpent = purchases.reduce(
    (acc, item) => acc + item.file.price,
    0
  );

  if (loading) {
    return <div className="pt-32 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.fullName}
            </h1>
            <p className="text-gray-500 mt-1">
              Manage your purchases
            </p>
          </div>

          {/* <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button> */}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Purchases" value={purchases.length} />
          <StatCard title="Total Spent" value={`₹${totalSpent}`} />
          <StatCard title="Account Type" value="Buyer" />
        </div>

        {/* Purchase List */}
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-6">
            Purchased Files
          </h2>

          {purchases.length === 0 ? (
            <p className="text-gray-500">No purchases yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {purchases.map((item) => (
                <motion.div
                  key={item._id}
                  whileHover={{ scale: 1.02 }}
                  className="border rounded-xl p-5 hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-lg">
                    {item.file.title}
                  </h3>
                  <p className="text-gray-500 mt-2">
                    ₹{item.file.price}
                  </p>

                  <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                    Download
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold text-orange-500 mt-2">
        {value}
      </h3>
    </div>
  );
}