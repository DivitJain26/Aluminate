import { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import SearchFilters from '../components/alumni/SearchFilters';
import AlumniGrid from '../components/alumni/AlumniGrid';
import Pagination from '../components/alumni/Pagination';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import { useAlumniSearch } from '../hooks/useAlumniSearch';
import { useAuth } from '../hooks/useAuth';
import { downloadData } from '../utils/download';

export default function SearchPage() {
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [error, setError] = useState("");

    const { isAdmin } = useAuth();

    const {
        alumni,
        loading,
        searchTerm,
        setSearchTerm,
        filters,
        handleFilterChange,
        clearFilters,
        pagination,
        handlePageChange,
        showFilters,
        setShowFilters
    } = useAlumniSearch();

    if (loading && alumni.length === 0) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="min-h-screen bg-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <PageHeader
                    title="Alumni Directory"
                    subtitle="Connect with graduates from your college network"
                />

                <SearchFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filters={filters}
                    handleFilterChange={handleFilterChange}
                    clearFilters={clearFilters}
                    showFilters={showFilters}
                    setShowFilters={setShowFilters}
                    totalCount={pagination.totalCount}
                    // isAdmin={isAdmin()}
                    handleDownload={() => downloadData(setDownloadLoading, setError)}
                />

                <AlumniGrid alumni={alumni} loading={loading} />

                {pagination.totalPages > 1 && (
                    <Pagination
                        pagination={pagination}
                        handlePageChange={handlePageChange}
                    />
                )}

                {alumni.length === 0 && !loading && (
                    <EmptyState
                        hasFilters={searchTerm || Object.values(filters).some(f => f)}
                    />
                )}
            </div>
        </div>
    );
}