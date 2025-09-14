import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ pagination, handlePageChange }) {
    return (
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
    );
}