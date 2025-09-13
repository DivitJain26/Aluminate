import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define Zod schema for form validation
const registrationSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name cannot exceed 50 characters'),

    email: z.email({ message: 'Please provide a valid email address' }),

    password: z.string()
        .min(8, 'Minimum password length is 8 characters')
        .regex(/[a-z]/, { message: "Must include a lowercase letter" })
        .regex(/[A-Za-z]/, { message: "Must include at least one alphabet character" })
        .regex(/[^A-Za-z0-9]/, { message: "Must include a special character" }),

    confirmPassword: z.string(),

    collegeName: z.string()
        .max(200, 'College name cannot exceed 200 characters'),

    abcId: z.string()
        .min(1, 'ABC ID is required')
        .max(50, 'ABC ID cannot exceed 50 characters'),

    enrollment: z.string()
        .min(1, 'Enrollment Number is required')
        .max(50, 'Enrollment Number cannot exceed 50 characters'),

    course: z.string()
        .max(100, 'Course cannot exceed 100 characters'),

    specialization: z.string()
        .max(100, 'Specialization cannot exceed 100 characters'),

    yearOfJoining: z.number()
        .min(2000, 'Year must be 2000 or later')
        .max(new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future'),

    yearOfPassing: z.number()
        .min(2000, 'Year must be 2000 or later')
        .max(new Date().getFullYear() + 10, 'Year cannot be more than 10 years in the future'),

    profileImage: z.string().optional(),

    bio: z.string()
        .max(500, 'Bio cannot exceed 500 characters')
        .optional(),

    skills: z.array(z.string().max(50)).optional(),

    currentCompany: z.string()
        .max(200, 'Company name cannot exceed 200 characters')
        .optional(),

    currentPosition: z.string()
        .max(100, 'Position cannot exceed 100 characters')
        .optional(),

    linkedinProfile: z.url('Please provide a valid URL').optional().or(z.literal('')),

    githubProfile: z.url('Please provide a valid URL').optional().or(z.literal(''))

})
    .refine((data) => data.yearOfPassing >= data.yearOfJoining, {
        message: "Year of passing must be after year of joining",
        path: ["yearOfPassing"],

    })

    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(registrationSchema),
    });

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            const newSkills = [...skills, skillInput.trim()];
            setSkills(newSkills);
            setValue('skills', newSkills);
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove) => {
        const newSkills = skills.filter(skill => skill !== skillToRemove);
        setSkills(newSkills);
        setValue('skills', newSkills);
    };

    const onSubmit = (data) => {
        console.log(data);
        // Handle registration logic here
        alert('Registration successful!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                    {/* Sidebar with refined design */}
                    <div className="md:w-2/5 bg-gradient-to-br from-purple-900 to-indigo-900 p-8 text-white hidden md:block">
                        <div className="flex items-center mb-8">
                            <div className="w-10 h-10 rounded-lg bg-purple-700 flex items-center justify-center mr-3">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold">Alumni Connect</h1>
                        </div>
                        <h2 className="text-2xl font-bold mb-6">Join Our Community</h2>
                        <p className="mb-6 text-purple-200">Connect with your college community, network with alumni, and discover opportunities.</p>
                        <ul className="space-y-4">
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                Network with alumni worldwide
                            </li>
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                Find career opportunities
                            </li>
                            <li className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                </div>
                                Share your experiences
                            </li>
                        </ul>
                        <div className="mt-10 pt-6 border-t border-purple-700">
                            <p className="text-sm text-purple-200">Already have an account?</p>
                            <Link
                                to="/login"
                                className="inline-block mt-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all">
                                Sign In
                            </Link>
                        </div>
                    </div>

                    <div className="md:w-3/5 p-8">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
                            <p className="text-gray-600">Join our alumni network and stay connected</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input
                                        {...register('name')}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Enter your full name"
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                                </div>

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
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                                    <div className="relative">
                                        <input
                                            {...register('password')}
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

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                                    <div className="relative">
                                        <input
                                            {...register('confirmPassword')}
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            placeholder="Confirm your password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-3 text-gray-500 hover:text-purple-600"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">College Name *</label>
                                <input
                                    {...register('collegeName')}
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Enter your college name"
                                />
                                {errors.collegeName && <p className="text-red-500 text-xs mt-1">{errors.collegeName.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ABC ID *</label>
                                    <input
                                        {...register('abcId')}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="e.g. ABC12345"
                                    />
                                    {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Number *</label>
                                    <input
                                        {...register('enrollment')}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="e.g. ADT23SOCB001"
                                    />
                                    {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                                    <input
                                        {...register('course')}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="e.g. B.Tech, MBA"
                                    />
                                    {errors.course && <p className="text-red-500 text-xs mt-1">{errors.course.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
                                    <input
                                        {...register('specialization')}
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="e.g. Computer Science"
                                    />
                                    {errors.specialization && <p className="text-red-500极速text-xs mt-1">{errors.specialization.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:极速grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Year of Joining *</label>
                                    <input
                                        {...register('yearOfJoining', { valueAsNumber: true })}
                                        type="number"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="YYYY"
                                    />
                                    {errors.yearOfJoining && <p className="text-red-500 text-xs mt-1">{errors.yearOfJoining.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Year of Passing *</label>
                                    <input
                                        {...register('yearOfPassing', { valueAsNumber: true })}
                                        type="number"
                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="YYYY"
                                    />
                                    {errors.yearOfPassing && <p className="text-red-500 text-xs mt-1">{errors.yearOfPassing.message}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                                <div className="flex">
                                    <input
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                        className="flex-grow px-4 py-2.5 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Add a skill"
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
                                        <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center">
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    {...register('bio')}
                                    rows="3"
                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Tell us about yourself"
                                ></textarea>
                                {errors.bio && <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>}
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                                >
                                    Create Account
                                </button>
                            </div>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-600">
                            By creating an account, you agree to our{' '}
                            <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="font-medium text-purple-600 hover:text-purple-500">
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