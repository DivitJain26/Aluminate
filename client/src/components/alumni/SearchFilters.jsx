import { Search, Filter, X, Download } from "lucide-react";

export default function SearchFilters({
    searchTerm,
    setSearchTerm,
    filters,
    handleFilterChange,
    clearFilters,
    showFilters,
    setShowFilters,
    totalCount,
    // isAdmin, // 👈 pass this prop from AuthContext or parent
    handleDownload // 👈 callback to handle CSV/Excel/PDF download
}) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search alumni by name, college, course, or company..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                >
                    <Filter className="w-4 h-4" />
                    <span>Advanced Filters</span>
                </button>

                <div className="flex items-center space-x-4">
                    {(searchTerm || Object.values(filters).some(f => f)) && (
                        <>
                            <span className="text-sm text-gray-600">
                                {totalCount} alumni found
                            </span>
                            <button
                                onClick={clearFilters}
                                className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                            >
                                <X className="w-4 h-4" />
                                <span>Clear all</span>
                            </button>
                        </>
                    )}


                    <button
                        onClick={handleDownload}
                        className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-xl shadow hover:bg-purple-700 transition"
                    >
                        <Download className="w-4 h-4" />
                        <span>Download Data</span>
                    </button>

                </div>
            </div>

            {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            College
                        </label>
                        <input
                            type="text"
                            placeholder="Filter by college"
                            value={filters.collegeName}
                            onChange={(e) => handleFilterChange("collegeName", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Course
                        </label>
                        <input
                            type="text"
                            placeholder="Filter by course"
                            value={filters.course}
                            onChange={(e) => handleFilterChange("course", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Specialization
                        </label>
                        <input
                            type="text"
                            placeholder="Filter by specialization"
                            value={filters.specialization}
                            onChange={(e) => handleFilterChange("specialization", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Year of Passing
                        </label>
                        <input
                            type="number"
                            placeholder="Filter by year"
                            value={filters.yearOfPassing}
                            onChange={(e) => handleFilterChange("yearOfPassing", e.target.value)}
                            min="2000"
                            max={new Date().getFullYear()}
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
