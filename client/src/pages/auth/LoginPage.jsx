import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../hooks/useAuth.jsx';

// Define Zod schema for form validation
const loginSchema = z.object({
    email: z.email('Please provide a valid email address'),
    password: z.string()
        .min(1, 'Password is required'),
});

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
        // Handle login logic here
        login(data);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 to-indigo-200 flex items-center justify-center py-8 px-4">
            <div className="max-w-4xl w-full mx-auto bg-gray-100 rounded-xl shadow-2xl overflow-hidden">
                <div className="md:flex">
                    {/* Sidebar with refined design - Same as registration page */}
                    <div className="md:w-2/5 bg-gradient-to-br from-purple-900 to-indigo-900 p-8 text-white hidden md:block">
                        <div className="flex items-center mb-8">
                            <div className="w-10 h-10 rounded-lg bg-purple-700 flex items-center justify-center mr-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold">Aluminate</h1>
                        </div>
                        <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>
                        <p className="mb-6 text-purple-200">Reconnect with your college community, network with alumni, and discover opportunities.</p>
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                Access exclusive alumni resources
                            </li>
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                Connect with fellow graduates
                            </li>
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                Stay updated with college events
                            </li>
                        </ul>
                        <div className="mt-10 pt-6 border-t border-purple-700">
                            <p className="text-sm text-purple-200">Don't have an account yet?</p>
                            <Link
                            to="/register" 
                            href="/register" className="inline-block mt-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all">
                                Sign Up
                            </Link>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="md:w-3/5 p-8">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
                            <p className="text-gray-600">Welcome back! Please enter your details</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                                <div className="relative">
                                    <input
                                        {...register('password')}
                                        type={showPassword ? "text" : "password"}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-gray-500 hover:text-purple-600"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;