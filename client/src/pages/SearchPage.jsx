import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  X, 
  Building, 
  BookOpen, 
  Calendar, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight, 
  User 
} from "lucide-react";

import { usersAPI } from '../utils/api.js';

export default function SeachPage() {
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        collegeName: '',
        course: '',
        specialization: '',
        yearOfPassing: '',
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        hasNextPage: false,
        hasPrevPage: false,
    });
    const [showFilters, setShowFilters] = useState(false);

    // useEffect(() => {
    //     const dummyAlumni = [
    //         {
    //             _id: "1",
    //             fullName: "Alice Johnson",
    //             collegeName: "Harvard University",
    //             course: "M.Sc",
    //             specialization: "Data Science",
    //             yearOfPassing: 2023,
    //             currentCompany: "Microsoft",
    //             currentPosition: "Data Scientist",
    //             skills: ["Python", "Machine Learning", "SQL"],
    //         },
    //         {
    //             _id: "2",
    //             fullName: "David Lee",
    //             collegeName: "IIT Bombay",
    //             course: "B.Tech",
    //             specialization: "Electrical Engineering",
    //             yearOfPassing: 2021,
    //             currentCompany: "Samsung",
    //             currentPosition: "Chip Designer",
    //             skills: ["VHDL", "C++", "Embedded Systems"],
    //         },
    //     ];
    // }, []);

    // setAlumni(dummyAlumni);
    
    // setPagination({
    //     currentPage: 1,
    //     totalPages: 1,
    //     totalCount: dummyAlumni.length,
    //     hasNextPage: false,
    //     hasPrevPage: false,
    // });
    // setLoading(false);

    useEffect(() => {
        fetchAlumni();
    }, [searchTerm, filters, pagination.currentPage])

    const fetchAlumni = async () => {
        try {
            setLoading(true);
            const queryParams = {
                search: searchTerm,
                ...filters,
                page: pagination.currentPage,
                limit: 12
            };

            // Remove empty filters
            Object.keys(queryParams).forEach(key => {
                if (!queryParams[key]) delete queryParams[key];
            });

            const response = await usersAPI.getAlumni(queryParams);

            if (response.data.success) {
                setAlumni(response.data.data.alumni);
                setPagination(response.data.data.pagination);
            }
        } catch (error) {
            console.error('Error fetching alumni:', error);
            setAlumni([]);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const clearFilters = () => {
        setSearchTerm('');
        setFilters({
            collegeName: '',
            course: '',
            specialization: '',
            yearOfPassing: '',
        });
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const handlePageChange = (page) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
    };


    if (loading && alumni.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
                    <div className="bg-gray-300 h-20 rounded-xl mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-300 h-64 rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Page Title */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-black mb-2">Alumni Directory</h1>
                    <p className="text-gray-600">
                        Connect with graduates from your college network
                    </p>
                </div>

                {/* Search + Filters */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    {/* Search */}
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

                    {/* Filter Toggle */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Advanced Filters</span>
                        </button>

                        {(searchTerm || Object.values(filters).some((f) => f)) && (
                            <div className="flex items-center space-x-4">
                                <span className="text-sm text-gray-600">
                                    {pagination.totalCount} alumni found
                                </span>
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                                >
                                    <X className="w-4 h-4" />
                                    <span>Clear all</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Advanced Filters */}
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
                                    onChange={(e) =>
                                        handleFilterChange("collegeName", e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        handleFilterChange("specialization", e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        handleFilterChange("yearOfPassing", e.target.value)
                                    }
                                    min="2000"
                                    max={new Date().getFullYear()}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Alumni Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {alumni.map((person) => (
                        <div
                            key={person._id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
                        >
                            <div className="p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                        {person.name?.charAt(0)?.toUpperCase() || "A"}
                                    </div>
                                    <div className="ml-4 flex-1">
                                        <h3 className="text-lg font-semibold text-purple-900 truncate">
                                            {person.name}
                                        </h3>
                                        <p className="text-purple-600 text-sm font-medium">Alumni</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6 text-gray-700">
                                    <div className="flex items-center">
                                        <Building className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" />
                                        <span className="text-sm truncate" title={person.collegeName}>
                                            {person.collegeName}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <BookOpen className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" />
                                        <span className="text-sm truncate">
                                            {person.course} - {person.specialization}
                                        </span>
                                    </div>

                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" />
                                        <span className="text-sm">Graduated {person.yearOfPassing}</span>
                                    </div>

                                    {person.currentCompany && (
                                        <div className="flex items-center">
                                            <Building className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" />
                                            <span className="text-sm truncate" title={person.currentCompany}>
                                                {person.currentPosition
                                                    ? `${person.currentPosition} at `
                                                    : ""}
                                                {person.currentCompany}
                                            </span>
                                        </div>
                                    )}

                                    {person.skills && person.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {person.skills.slice(0, 3).map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                            {person.skills.length > 3 && (
                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                    +{person.skills.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <button
                                    disabled={loading}
                                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-xl hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Start Conversation
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-between bg-white rounded-2xl shadow-md p-4">
                        <div className="text-sm text-gray-600">
                            Showing page {pagination.currentPage} of {pagination.totalPages} (
                            {pagination.totalCount} total alumni)
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handlePageChange(pagination.currentPage - 1)}
                                disabled={!pagination.hasPrevPage}
                                className="p-2 rounded-lg border border-gray-300 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <span className="px-3 py-1 bg-purple-600 text-white rounded-lg">
                                {pagination.currentPage}
                            </span>

                            <button
                                onClick={() => handlePageChange(pagination.currentPage + 1)}
                                disabled={!pagination.hasNextPage}
                                className="p-2 rounded-lg border border-gray-300 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {alumni.length === 0 && !loading && (
                    <div className="text-center py-12">
                        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No alumni found
                        </h3>
                        <p className="text-gray-600">
                            {searchTerm || Object.values(filters).some((f) => f)
                                ? "Try adjusting your search or filters"
                                : "No alumni have joined the platform yet"}
                        </p>
                    </div>
                )}
            </div>
        </div>


    );
}
