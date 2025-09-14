import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const registrationSchema = z
  .object({
    accountType: z.enum(["student", "alumni"]),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters"),
    email: z.email({ message: "Please provide a valid email address" }),
    password: z
      .string()
      .min(8, "Minimum password length is 8 characters")
      .regex(/[a-z]/, { message: "Must include a lowercase letter" })
      .regex(/[A-Za-z]/, { message: "Must include at least one alphabet" })
      .regex(/[^A-Za-z0-9]/, { message: "Must include a special character" }),
    confirmPassword: z.string(),
    bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
    skills: z.array(z.string().max(50)).optional(),

    // Student fields (optional by default, validated conditionally)
    universityName: z.string().max(200).optional(),
    abcId: z.string().max(50).optional(),
    enrollment: z.string().max(50).optional(),
    course: z.string().max(100).optional(),
    specialization: z.string().max(100).optional(),
    yearOfJoining: z
      .number()
      .min(2000)
      .max(new Date().getFullYear() + 5)
      .optional(),
    yearOfPassing: z
      .number()
      .min(2000)
      .max(new Date().getFullYear() + 10)
      .optional(),

    // Alumni fields (optional by default, validated conditionally)
    alumniUniversityName: z.string().max(200).optional(),
    alumniPassingYear: z
      .number()
      .min(1950)
      .max(new Date().getFullYear())
      .optional(),
    currentCompany: z.string().max(200).optional(),
    currentPosition: z.string().max(100).optional(),
  })
  // Password match
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  // Student conditional validation
  .refine(
    (data) =>
      data.accountType !== "student" ||
      (data.universityName &&
        data.abcId &&
        data.enrollment &&
        data.course &&
        data.specialization &&
        data.yearOfJoining !== undefined &&
        data.yearOfPassing !== undefined &&
        data.yearOfPassing >= data.yearOfJoining),
    {
      message:
        "All student fields are required and year of passing must be after year of joining",
      path: ["yearOfPassing"],
    }
  )
  // Alumni conditional validation
  // Alumni conditional validation
  .refine(
    (data) => {
      if (data.accountType !== "alumni") return true;
      return (
        Boolean(data.alumniUniversityName) &&
        typeof data.alumniPassingYear === "number" &&
        !isNaN(data.alumniPassingYear)
      );
    },
    {
      message: "Alumni must provide university name and valid passing year",
      path: ["alumniUniversityName"],
    }
  );

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    unregister,
  } = useForm({
    resolver: zodResolver(registrationSchema),
    defaultValues: { accountType: "student" },
  });

  const accountType = watch("accountType");

  useEffect(() => {
    if (accountType === "alumni") {
      unregister("universityName");
      unregister("abcId");
      unregister("enrollment");
      unregister("course");
      unregister("specialization");
      unregister("yearOfJoining");
      unregister("yearOfPassing");
    } else if (accountType === "student") {
      unregister("alumniUniversityName");
      unregister("alumniPassingYear");
      unregister("currentCompany");
      unregister("currentPosition");
    }
  }, [accountType, unregister]);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      const newSkills = [...skills, skillInput.trim()];
      setSkills(newSkills);
      setValue("skills", newSkills);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    const newSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(newSkills);
    setValue("skills", newSkills);
  };

  const onSubmit = async (data) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName: data.name });

      // Save additional info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        accountType: data.accountType,
        name: data.name,
        email: data.email,
        bio: data.bio || "",
        skills: data.skills || [],
        studentInfo:
          data.accountType === "student"
            ? {
                universityName: data.universityName,
                abcId: data.abcId,
                enrollment: data.enrollment,
                course: data.course,
                specialization: data.specialization,
                yearOfJoining: data.yearOfJoining,
                yearOfPassing: data.yearOfPassing,
              }
            : null,
        alumniInfo:
          data.accountType === "alumni"
            ? {
                alumniUniversityName: data.alumniUniversityName,
                alumniPassingYear: data.alumniPassingYear,
                currentCompany: data.currentCompany,
                currentPosition: data.currentPosition,
              }
            : null,
      });

      alert("Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      alert("Error during registration: " + err.message);
    }
  };

  const accountTypes = [
    {
      id: "student",
      label: "Student",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l9-5-9-5-9 5 9 5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
        </svg>
      ),
      description: "Current student seeking connections",
    },
    {
      id: "alumni",
      label: "Alumni",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      description: "Graduate ready to mentor and network",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Sidebar*/}
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
            <h2 className="text-2xl font-bold mb-6">Join Our Community</h2>
            <p className="mb-6 text-purple-200">
              Connect with your college community, network with alumni, and
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
                Network with alumni worldwide
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
                Find career opportunities
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
                Share your experiences
              </li>
            </ul>
            <div className="mt-10 pt-6 border-t border-purple-700">
              <p className="text-sm text-purple-200">
                Already have an account?
              </p>
              <Link
                to="/login"
                className="inline-block mt-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="md:w-3/5 p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-800">
                Create Account
              </h1>
              <p className="text-gray-600">
                Join our alumni network and stay connected
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Account Type Toggle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Account Type *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {accountTypes.map((type) => (
                    <label key={type.id} className="cursor-pointer">
                      <input
                        {...register("accountType")}
                        type="radio"
                        value={type.id}
                        name="accountType"
                        className="sr-only"
                      />
                      <div
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          accountType === type.id
                            ? "border-purple-500 bg-purple-50 shadow-md"
                            : "border-gray-200 hover:border-purple-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-center mb-2">
                          <div
                            className={`p-2 rounded-full ${
                              accountType === type.id
                                ? "bg-purple-500 text-white"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {type.icon}
                          </div>
                        </div>
                        <div className="text-center">
                          <h3
                            className={`font-semibold ${
                              accountType === type.id
                                ? "text-purple-700"
                                : "text-gray-700"
                            }`}
                          >
                            {type.label}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    {...register("name")}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
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
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500 hover:text-purple-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          ></path>
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
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500 hover:text-purple-600"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          ></path>
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
              </div>

              {/* Conditional Fields Based on Account Type */}
              {accountType === "student" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      University Name *
                    </label>
                    <input
                      {...register("universityName")}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your university name"
                    />
                    {errors.universityName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.universityName.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ABC ID *
                      </label>
                      <input
                        {...register("abcId")}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g. ABC12345"
                      />
                      {errors.abcId && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.abcId.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Enrollment Number *
                      </label>
                      <input
                        {...register("enrollment")}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g. ADT23SOCB001"
                      />
                      {errors.enrollment && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.enrollment.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course *
                      </label>
                      <input
                        {...register("course")}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g. B.Tech, MBA"
                      />
                      {errors.course && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.course.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Specialization *
                      </label>
                      <input
                        {...register("specialization")}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="e.g. Computer Science"
                      />
                      {errors.specialization && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.specialization.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year of Joining *
                      </label>
                      <input
                        {...register("yearOfJoining", { valueAsNumber: true })}
                        type="number"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="YYYY"
                      />
                      {errors.yearOfJoining && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.yearOfJoining.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year of Passing *
                      </label>
                      <input
                        {...register("yearOfPassing", { valueAsNumber: true })}
                        type="number"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="YYYY"
                      />
                      {errors.yearOfPassing && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.yearOfPassing.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {accountType === "alumni" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passed out from University *
                      </label>
                      <input
                        {...register("alumniUniversityName")}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your university name"
                      />
                      {errors.alumniUniversityName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.alumniUniversityName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passing Year *
                      </label>
                      <input
                        {...register("alumniPassingYear", {
                          valueAsNumber: true,
                        })}
                        type="number"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="YYYY"
                      />
                      {errors.alumniPassingYear && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.alumniPassingYear.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Currently Employed At
                      </label>
                      <input
                        {...register("currentCompany")}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your current company"
                      />
                      {errors.currentCompany && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.currentCompany.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position
                      </label>
                      <input
                        {...register("currentPosition")}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter your current position"
                      />
                      {errors.currentPosition && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.currentPosition.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills
                </label>
                <div className="flex">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    className="flex-grow px-4 py-2.5 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Add a skill"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addSkill())
                    }
                  />
                  <button
                    type="button"
                    className="bg-purple-600 text-white px-4 rounded-r-lg hover:bg-purple-700 transition-colors"
                    onClick={addSkill}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {skill}
                      <button
                        type="button"
                        className="ml-2 text-purple-500 hover:text-purple-800"
                        onClick={() => removeSkill(skill)}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  {...register("bio")}
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Tell us about yourself"
                ></textarea>
                {errors.bio && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg hover:cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              By creating an account, you agree to our{" "}
              <a
                href="#"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="font-medium text-purple-600 hover:text-purple-500"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
