"use client";
import axiosInstance from "@/api/axiosInstance";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FaRegUser } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function LatestContentCarousel() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await axiosInstance.get("/api/content");
        const sorted = res.data
          .filter(item => item.createdAt)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setData(sorted);
      } catch (err) {
        console.error("Failed to fetch latest content:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center bg-white">
        <p className="text-gray-500 text-lg animate-pulse">Loading latest content...</p>
      </div>
    );
  }

  return (
    <section className="relative w-full py-24  text-gray-800 overflow-hidden">
      {/* Ornaments */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-red-900/90 rounded-full blur-3xl opacity-50 animate-pulse duration-400 z-0"></div>
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#68b0ab]/90 rounded-full blur-2xl opacity-40 z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">📢 Latest Contributions</h2>
          <p className="mt-2 text-lg text-gray-600">
            Swipe through the freshest content from our awesome community!
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition duration-300 h-full flex flex-col justify-between border border-gray-100 hover:border-[#1d919c]">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 hover:text-[#1d919c] transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-3 line-clamp-4">{item.description}</p>
                </div>
                <div className="mt-4 flex items-center text-xs text-gray-500 space-x-2">
                  <FaRegUser className="text-gray-400" />
                  <span className="font-medium text-gray-700">{item.username}</span>
                  <span className="text-gray-400">•</span>
                  <span>{formatDistanceToNow(new Date(item.createdAt))} ago</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-12 text-center">
          <a
            href="/content-page"
            className="inline-block bg-[#1d919c] text-white px-6 py-3 rounded-full font-medium hover:bg-[#157981] transition"
          >
            View All Content
          </a>
        </div>
      </div>
    </section>
  );
}
