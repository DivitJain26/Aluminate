import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// Zod schema for form validation
const loginSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      // Firebase login
      await signInWithEmailAndPassword(auth, data.email, data.password);

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Sidebar with refined design - Same as registration page */}
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
              <h1 className="text-2xl font-bold">Alumni Connect</h1>
            </div>
            <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>
            <p className="mb-6 text-purple-200">
              Reconnect with your college community, network with alumni, and
              discover opportunities.
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
                Access exclusive alumni resources
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
                Connect with fellow graduates
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
                Stay updated with college events
              </li>
            </ul>
            <div className="mt-10 pt-6 border-t border-purple-700">
              <p className="text-sm text-purple-200">
                Don't have an account yet?
              </p>
              <Link
                to="/register"
                href="/register"
                className="inline-block mt-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Login Form */}
          <div className="md:w-3/5 p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">Sign In</h1>
              <p className="text-gray-600">
                Welcome back! Please enter your details
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 text-gray-500 hover:text-purple-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    {...register("rememberMe")}
                    type="checkbox"
                    id="rememberMe"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-600 hover:text-purple-500"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg hover:cursor-pointer"
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

export default Login;
