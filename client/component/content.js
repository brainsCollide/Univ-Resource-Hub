"use client";
import axiosInstance from "@/api/axiosInstance";
import React, { useEffect, useState } from "react";

export default function Content({ limit }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/api/content");
                let content = response.data;

                // Ensure `createdAt` exists before sorting
                content = content
                    .filter(item => item.createdAt) // Ensure valid dates
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                // Apply limit if provided
                if (limit) {
                    content = content.slice(0, limit);
                }

                setData(content);
            } catch (error) {
                console.error("Error fetching content:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [limit]); 

    if (loading) {
        return <div className="flex items-center justify-center bg-gray-100 py-10">Loading...</div>;
    }

    if (error) {
        return <div className="flex items-center justify-center bg-red-100 py-10">Error: {error?.message || "Something went wrong"}</div>;
    }

    return (
        <section className="w-full py-16 bg-gray-50 text-center">
            <h2 className="text-4xl font-bold text-gray-900">{limit ? "📢 Latest Content" : "📚 All Content"}</h2>
            <p className="mt-3 text-lg max-w-2xl mx-auto">
                {limit ? "Check out the three most recent resources." : "Explore all available study materials."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-8 max-w-6xl mx-auto">
                {data.map((item) => (
                    <div key={item._id} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300">
                        <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-gray-600 mt-2">{item.description}</p>
                        <p className="text-sm text-gray-500 mt-3">
                            Posted by: <span className="font-medium text-gray-700">{item.username}</span>
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}