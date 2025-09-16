import { useState, useEffect, useCallback } from 'react';
import { usersAPI } from '../utils/api';

export const useAlumniSearch = () => {
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

    const fetchAlumni = useCallback(async () => {
        try {
            setLoading(true);
            const queryParams = {
                search: searchTerm,
                ...filters,
                page: pagination.currentPage,
                limit: 12
            };

            Object.keys(queryParams).forEach(key => {
                if (!queryParams[key]) delete queryParams[key];
            });

            const response = await usersAPI.getUser(queryParams);

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
    }, [searchTerm, filters, pagination.currentPage]);

    useEffect(() => {
        fetchAlumni();
    }, [fetchAlumni]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
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

    return {
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
        setShowFilters,
        fetchAlumni
    };
};