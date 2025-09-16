import User from "../models/user.model.js"; // adjust path if needed
import mongoose from "mongoose";


export const getProfiles = async (req, res) => {
    try {
        const {
            search,
            collegeName,
            course,
            specialization,
            yearOfPassing,
            skills,
            page = 1,
            limit = 20
        } = req.query;

        // Base query: alumni and active users
        const query = {
            currentStatus: 'alumni',
            isActive: true,
            _id: { $ne: req.user?._id } // exclude current user if logged in
        };

        // Text search across multiple fields including experience
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { collegeName: { $regex: search, $options: 'i' } },
                { course: { $regex: search, $options: 'i' } },
                { specialization: { $regex: search, $options: 'i' } },
                { city: { $regex: search, $options: 'i' } },
                { 'experience.company': { $regex: search, $options: 'i' } },
                { 'experience.position': { $regex: search, $options: 'i' } },
            ];
        }

        if (collegeName) query.collegeName = { $regex: collegeName, $options: 'i' };
        if (course) query.course = { $regex: course, $options: 'i' };
        if (specialization) query.specialization = { $regex: specialization, $options: 'i' };
        if (yearOfPassing) query.yearOfPassing = parseInt(yearOfPassing);

        if (skills) {
            const skillsArray = skills.split(',').map(skill => skill.trim());
            query.skills = { $in: skillsArray };
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);

        // Execute query
        const [alumni, totalCount] = await Promise.all([
            User.find(query)
                .sort({ name: 1 })
                .skip(skip)
                .limit(parseInt(limit)),
            User.countDocuments(query)
        ]);

        const totalPages = Math.ceil(totalCount / parseInt(limit));
        const hasNextPage = parseInt(page) < totalPages;
        const hasPrevPage = parseInt(page) > 1;

        res.json({
            success: true,
            data: {
                alumni,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalCount,
                    hasNextPage,
                    hasPrevPage,
                    limit: parseInt(limit)
                }
            }
        });

    } catch (error) {
        console.error('Get profiles error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch alumni profiles',
            data: null
        });
    }
};



export const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID format",
                data: null
            });
        }

        // Fetch user (Mongoose document, not lean)
        const user = await User.findOne({
            _id: id,
            isActive: true
        }).select("+refreshToken"); // only if needed

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            });
        }

        res.json({
            success: true,
            message: "User profile fetched successfully",
            data: user.getPublicProfile() //  use schema method
        });

    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to get user profile",
            data: null
        });
    }
};


