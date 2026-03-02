// import Image from "next/image";
import WhySection from "@/components/WhySection";
import FeaturedSection from "@/components/FeatureSection";
export default function Home() {
  return (
    <main className="bg-gray-100">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-24 text-center">
        <h1 className="text-5xl font-bold">
          The Modern Marketplace <br />
          for <span className="text-orange-500">Digital Files</span>
        </h1>

        <p className="mt-6 text-gray-300">
          Buy, sell and discover premium digital content from creators worldwide.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-orange-500 px-6 py-3 rounded-lg hover:bg-orange-600 transition">
            Browse Files
          </button>

          <button className="border border-gray-400 px-6 py-3 rounded-lg hover:bg-gray-700 transition">
            Start Selling
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 mt-16 text-center ">
          <div>
            <h2 className="text-2xl font-bold">10K+</h2>
            <p className="text-gray-400">Files Listed</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">5K+</h2>
            <p className="text-gray-400">Creators</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">50K+</h2>
            <p className="text-gray-400">Downloads</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">99.9%</h2>
            <p className="text-gray-400">Uptime</p>
          </div>
        </div>
      </section>

      <WhySection/>
      <FeaturedSection/>

      {/* FEATURED FILES */}
      {/* <section className="py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Featured Files</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[1,2,3,4].map((item) => (
            <div key={item} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="h-32 bg-gray-200 rounded mb-4 flex items-center justify-center">
                📄
              </div>

              <h3 className="font-semibold">File Title</h3>
              <p className="text-sm text-gray-500">Short description</p>

              <div className="flex justify-between items-center mt-4">
                <span className="font-bold text-orange-500">₹299</span>
                <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      </section> */}

    </main>
  );
}