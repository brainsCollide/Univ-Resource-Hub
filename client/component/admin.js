"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";

export default function Admin() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/api/auth/me", { withCredentials: true });
                const fetchedUser = response.data.user;
                setUser(fetchedUser);

                // If the user is not an admin, show an error message
                if (fetchedUser.role !== "admin") {
                    setError("Access Denied: You must be an admin to view this page.");
                }
            } catch (error) {
                setError("You must be logged in to view this page.");
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white shadow-md rounded p-4 w-full max-w-sm">
                    <p className="text-red-500">{error}</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white shadow-md rounded p-4 w-full max-w-sm">
                    <p className="text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded p-4">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                <p>Welcome, {user?.username}!</p>
                {/* Admin functionalities */}
                <div className="mt-4">
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                        Manage Users
                    </button>
                    <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-700 ml-4">
                        Manage Resources
                    </button>
                </div>
            </div>
        </div>
    );
}
