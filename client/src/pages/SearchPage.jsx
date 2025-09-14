export default function SearchPage() {
    return (
        <div className="flex relative">
            {/* Sidebar */}
            {/* <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} /> */}

            {/* Main Content */}
            <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* --- Your Original Code Starts --- */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    {/* Search */}
                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search alumni by name, college, course, or company..."
                                className="w-full pl-10 pr-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Filter Toggle */}
                    <div className="flex items-center justify-between mb-4">
                        <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-700">
                            <span>Advanced Filters</span>
                        </button>

                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-purple-600">12 alumni found</span>
                            <button className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm">
                                <span>Clear all</span>
                            </button>
                        </div>
                    </div>

                    {/* Advanced Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-purple-200">
                        <input
                            type="text"
                            placeholder="Filter by college"
                            className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                            type="text"
                            placeholder="Filter by course"
                            className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                            type="text"
                            placeholder="Filter by specialization"
                            className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                        <input
                            type="number"
                            placeholder="Filter by year"
                            className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Alumni Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {[...Array(6)].map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                        A
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <h3 className="text-lg font-semibold text-purple-900 truncate">
                                            John Doe
                                        </h3>
                                        <p className="text-purple-600 text-sm font-medium">Alumni</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <p className="text-sm text-purple-600 truncate">Example College</p>
                                    <p className="text-sm text-purple-600 truncate">
                                        B.Tech - Computer Science
                                    </p>
                                    <p className="text-sm text-purple-600">Graduated 2023</p>
                                    <p className="text-sm text-purple-600 truncate">
                                        Software Engineer at Example Corp
                                    </p>

                                    <div className="flex flex-wrap gap-1 mt-2">
                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                            React
                                        </span>
                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                            Node.js
                                        </span>
                                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                                            MongoDB
                                        </span>
                                    </div>
                                </div>

                                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200">
                                    Start Conversation
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between bg-white rounded-xl shadow-md p-4">
                    <div className="text-sm text-purple-600">
                        Showing page 1 of 5 (60 total alumni)
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-2 rounded-lg border border-purple-300 hover:bg-purple-50">
                            Prev
                        </button>
                        <span className="px-3 py-1 bg-purple-600 text-white rounded-lg">1</span>
                        <button className="p-2 rounded-lg border border-purple-300 hover:bg-purple-50">
                            Next
                        </button>
                    </div>
                </div>

                {/* Empty State */}
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-purple-200 mx-auto mb-4 rounded-full"></div>
                    <h3 className="text-lg font-medium text-purple-900 mb-2">
                        No alumni found
                    </h3>
                    <p className="text-purple-600">Try adjusting your search or filters</p>
                </div>
                {/* --- Your Original Code Ends --- */}
            </div>
        </div>

    );
}
