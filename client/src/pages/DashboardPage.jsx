import { useAuth } from "../hooks/useAuth";


export default function DashboardPage() {
    const {user} = useAuth();
    const name = user.name ?? "there" // replace with actual user name (from props/context)

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 flex">
            {/* Sidebar */}
            {/* <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> */}


            {/* Main Content */}
            <div className="flex-1 max-w-7xl mx-auto px-6 py-8 relative">
                {/* Menu Button (fixed top-left corner) */}

                {/* Welcome Section (slightly bigger but left-aligned) */}
                <div className="bg-purple-600 text-white rounded-xl p-8 mb-8 shadow-md h-85 flex items-center justify-between">
                    {/* Left side: text */}
                    <div>
                        <h2 className="text-3xl font-bold">Welcome, {name} 🎉</h2>
                        <p className="mt-4 text-purple-100 text-lg max-w-md">
                            Stay connected with your alumni and explore new opportunities.
                            Find mentorship, career guidance, and networking events to help you grow.
                        </p>
                    </div>

                    {/* Right side: SVG */}
                    <img
                        src="/connect2.svg"
                        alt="College illustration"
                        className="h-90 w-120 object-contain"
                    />
                </div>

                <div className="flex-1 min-h-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
                        {/* Stats Grid (4 boxes) */}
                        <div className="grid grid-cols-2 gap-2 lg:col-span-2 h-full">
                            {[
                                { title: "Connected Alumni", value: "128" },
                                { title: "Total Alumni", value: "560" },
                                { title: "Total Students", value: "900" },
                                { title: "Connected Students", value: "340" },
                            ].map((stat, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white rounded-lg shadow-md p-10 flex flex-col justify-center items-center h-full"
                                >
                                    <h3 className="text-base font-semibold text-purple-700">
                                        {stat.title}
                                    </h3>
                                    <p className="mt-1 text-xl font-bold">{stat.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* What's New Box */}
                        <div className="bg-white rounded-lg shadow-md p-4 h-full">
                            <h3 className="text-xl font-bold text-purple-700 mb-4">What's New</h3>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li>Alumni Meetup scheduled for Sept 25</li>
                                <li>15 new job postings this week</li>
                                <li>Student-alumni mentorship program launched</li>
                                <li> Spotlight: Alumni success stories updated</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
