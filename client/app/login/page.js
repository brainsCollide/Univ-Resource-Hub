'use client';
import { useState } from 'react';
import axiosInstance from "@/api/axiosInstance"
import GoogleLoginButton from '@/component/GoogleLogin';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Send login request with credentials
            const response = await axiosInstance.post('/api/auth/login', { email, password }, { withCredentials: true });

            // If successful, you don't need to store the token manually, it's stored in cookies
            console.log('Login successful:', response.data);

            // Redirect to the homepage
            window.location = '/';
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded p-4 w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>  
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>  
                    <button className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login   
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="mb-2">Or continue with</p>
                    <GoogleLoginButton />
                </div>
            </div>
        </div>
    )
}
