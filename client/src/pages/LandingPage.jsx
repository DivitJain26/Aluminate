import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-500 text-white flex flex-col">
            {/* Navbar */}
            <nav className="flex justify-between items-center px-8 py-4 bg-purple-950 bg-opacity-70">
                <h1 className="text-2xl font-bold tracking-wide">Aluminate</h1>
                <div className="space-x-4">
                    <Link
                        to="/login"
                        className="bg-white text-purple-800 px-4 py-2 rounded-md font-medium hover:bg-purple-200 transition"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="bg-purple-600 px-4 py-2 rounded-md font-medium hover:bg-purple-500 transition"
                    >
                        Register
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-16 gap-12 min-h-[80vh]">
                {/* Left Side: Text + Buttons */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Stay Connected, <span className="text-purple-200">Forever</span>.
                    </h2>
                    <p className="max-w-xl text-lg md:text-xl text-purple-100 mb-10">
                        Join a thriving community of students and alumni. Network, find mentors,
                        and explore career opportunities – all in one place.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
                        <Link
                            to="/register"
                            className="bg-white text-purple-800 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-purple-200 transition"
                        >
                            Get Started
                        </Link>

                        <a
                            href="#about"
                            className="bg-purple-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-purple-500 transition"
                        >
                            Learn More
                        </a>
                    </div>
                </div>

                {/* Right Side: Hero Icon / Image */}
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src="/college.svg"
                        alt="College Illustration"
                        className="w-full max-w-md md:max-w-lg drop-shadow-xl"
                    />
                </div>
            </div>


            {/* Info Section */}
            <div id="about" className="bg-white text-purple-900 py-12 px-6 text-center">
                <h3 className="text-3xl font-bold mb-8">Why Aluminate?</h3>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="p-6 bg-purple-100 rounded-lg shadow">
                        <h4 className="font-semibold text-xl mb-2">Networking</h4>
                        <p>
                            Connect with peers, seniors, and industry leaders from your
                            institution.
                        </p>
                    </div>
                    <div className="p-6 bg-purple-100 rounded-lg shadow">
                        <h4 className="font-semibold text-xl mb-2">Mentorship</h4>
                        <p>
                            Alumni guide students with career insights, skill development, and
                            advice.
                        </p>
                    </div>
                    <div className="p-6 bg-purple-100 rounded-lg shadow">
                        <h4 className="font-semibold text-xl mb-2">Opportunities</h4>
                        <p>
                            Discover jobs, internships, and collaborations through your alumni
                            network.
                        </p>
                    </div>
                </div>
            </div>

            {/* College Registration Section */}
            <div className="bg-white text-purple-900 py-10 px-6">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
                    {/* Left: Image */}
                    <div>
                        <img
                            src="/college-admin.svg" // replace with your svg
                            alt="College Registration"
                            className="w-full max-w-sm md:max-w-md drop-shadow-lg"
                        />
                    </div>


                    {/* Right: Text + Button */}
                    <div className="flex justify-center items-center">
                        <div className="text-center md:text-left flex flex-col items-center md:items-start">
                            <h3 className="text-3xl font-bold mb-4">For Institutions</h3>
                            <p className="text-lg mb-6 max-w-md">
                                Want to register your college on
                                <span className="font-semibold"> Aluminate </span>
                                and give your students & alumni a platform to stay connected?
                                Create a vibrant community where achievements are celebrated,
                                opportunities are shared, and meaningful networks thrive beyond graduation.
                            </p>
                            <Link
                                to='admin-register'
                                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-purple-500 transition"
                            >
                                Admin Registration
                            </Link>
                        </div>
                    </div>
                </div>
            </div>



            {/* Footer */}
            <footer className="bg-purple-950 text-purple-200 py-6 text-center text-sm">
                <p>© {new Date().getFullYear()} Aluminate. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default LandingPage
