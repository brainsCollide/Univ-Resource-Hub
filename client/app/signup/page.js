'use client';
import { useState } from 'react';
import axiosInstance from "@/api/axiosInstance";
import GoogleLoginButton from '@/component/GoogleLogin';

export default function SignupPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            setError('Username, email, and password are required.');
            return;
        }
        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/auth/register', { username, email, password }, { withCredentials: true });

            // Since the backend sets the token in a cookie, no need to store it manually
            setSuccess('User registered successfully. Please wait.');
            setError('');
            setUsername('');
            setEmail('');
            setPassword('');
            setTimeout(() => {
                // Redirect after registration
                window.location = '/';
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Registration failed. Please try again.');
            }
            setSuccess('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded p-4 w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4">Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
                    <button 
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                    >
                        {loading ? 'Signing up...' : 'Signup'}
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="mb-2">Or continue with</p>
                    <GoogleLoginButton />
                </div>
            </div>
        </div>
    );
}
