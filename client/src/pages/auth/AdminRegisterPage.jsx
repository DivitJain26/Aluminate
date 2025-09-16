import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth.jsx";

// ✅ Zod schema for admin
const adminSchema = z
    .object({
        name: z
            .string()
            .min(2, "Name must be at least 2 characters")
            .max(50, "Name cannot exceed 50 characters"),

        email: z.string().email({ message: "Please provide a valid email address" }),

        password: z
            .string()
            .min(8, "Minimum password length is 8 characters")
            .regex(/[a-z]/, { message: "Must include a lowercase letter" })
            .regex(/[A-Za-z]/, { message: "Must include at least one alphabet" })
            .regex(/[^A-Za-z0-9]/, { message: "Must include a special character" }),

        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

const AdminRegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { register: registerUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(adminSchema),
    });

    const onSubmit = (data) => {
        // explicitly set role to admin
        registerUser({ ...data, role: "admin" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-200 to-indigo-200 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                    {/* Sidebar */}
                    <div className="md:w-2/5 bg-gradient-to-br from-purple-900 to-indigo-900 p-8 text-white hidden md:block">
                        <div className="flex items-center mb-8">
                            <div className="w-10 h-10 rounded-lg bg-purple-700 flex items-center justify-center mr-3">
                                <svg
                                    className="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    ></path>
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold">Aluminate Admin</h1>
                        </div>
                        <h2 className="text-2xl font-bold mb-6">Admin Access</h2>
                        <p className="mb-6 text-purple-200">
                            Manage alumni data, users, and system settings with privileged
                            access.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center mr-3">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                </div>
                                Full user management
                            </li>
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center mr-3">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        ></path>
                                    </svg>
                                </div>
                                Secure data download
                            </li>
                        </ul>
                        <div className="mt-10 pt-6 border-t border-purple-700">
                            <p className="text-sm text-purple-200">Already an admin?</p>
                            <Link
                                to="/login"
                                className="inline-block mt-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="md:w-3/5 p-8">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Create Admin Account
                            </h1>
                            <p className="text-gray-600">
                                Restricted access for administrators only
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    {...register("name")}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Enter full name"
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Enter email"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Password *
                                </label>
                                <div className="relative">
                                    <input
                                        {...register("password")}
                                        type={showPassword ? "text" : "password"}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Create password"
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
                                {errors.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm Password *
                                </label>
                                <div className="relative">
                                    <input
                                        {...register("confirmPassword")}
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Confirm password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3 text-gray-500 hover:text-purple-600"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                    >
                                        {showConfirmPassword ? (
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
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                                >
                                    Create Admin Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRegisterPage;
