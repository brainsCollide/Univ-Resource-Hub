"use client";

import axiosInstance from "@/api/axiosInstance";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Resource() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/api/resources");
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter resources based on search query
    const filteredData = data.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.body?.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-extrabold text-gray-900">📚 Explore Resources</h1>
                <p className="text-lg text-gray-600 mt-2">Find the best study materials and guides.</p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto mb-8">
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M15 11a4 4 0 100-8 4 4 0 000 8z" />
                </svg>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="h-40 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                    ))}
                </div>
            )}

            {/* Error Message */}
            {error && <p className="text-center text-red-500">Error loading resources.</p>}

            {/* Resource Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredData.length > 0 ? (
                    filteredData.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white shadow-lg rounded-xl p-6 transform transition-transform duration-200 hover:scale-105 cursor-pointer"
                            onClick={() => router.push(`/resource/${item._id}`)}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h2>
                            <p className="text-gray-600 line-clamp-3">{item.description}</p>
                            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                                <span>📅 {new Date(item.createdAt).toLocaleDateString()}</span>
                                <span className="font-medium">{item.username}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-3">No matching resources found.</p>
                )}
            </div>
        </div>
    );
}
