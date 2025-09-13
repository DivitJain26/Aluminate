import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Minimum password length is 6 characters'],
        select: false, // Don't return password in queries
    },

    collegeName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200
    },

    abcId: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },

    enrollment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },

    course: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    specialization: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },

    yearOfJoining: {
        type: Number,
        required: true,
        min: 2000,
        max: new Date().getFullYear() + 5
    },

    yearOfPassing: {
        type: Number,
        required: true,
        min: 2000,
        max: new Date().getFullYear() + 10
    },

    currentStatus: {
        type: String,
        enum: ['student', 'alumni'],
        default: 'student'
    },

    role: {
        type: String,
        enum: ['student', 'alumni', 'admin'],
        default: 'student'
    },

    profileImage: {
        type: String,
        default: ''
    },

    bio: {
        type: String,
        maxlength: 500,
        default: ''
    },

    skills: [{
        type: String,
        trim: true,
        maxlength: 50
    }],

    currentCompany: {
        type: String,
        trim: true,
        maxlength: 200,
        default: ''
    },

    currentPosition: {
        type: String,
        trim: true,
        maxlength: 100,
        default: ''
    },

    linkedinProfile: {
        type: String,
        trim: true,
        default: ''
    },

    githubProfile: {
        type: String,
        trim: true,
        default: ''
    },

    isActive: {
        type: Boolean,
        default: true
    },

    lastLoginAt: {
        type: Date,
        default: Date.now
    },

    refreshToken: {
        type: String,
        select: false, // Don't return refresh token in queries
    }
}, {
    timestamps: true
});

// Pre-save hook to hash password before saving
userSchema.pre('save', async function (next) {
    try {
        // Hash password if it's modified
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt);
        }

        // Determine status and role based on passing year
        const currentYear = new Date().getFullYear();
        if (this.yearOfPassing <= currentYear) {
            this.currentStatus = 'alumni';
            if (this.role === 'student') { // Don't override admin role
                this.role = 'alumni';
            }
        } else {
            this.currentStatus = 'student';
            if (this.role === 'alumni') { // Don't override admin role
                this.role = 'student';
            }
        }

        next();
    } catch (error) {
        next(error);
    }
})

// Instance method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Method to get public profile
userSchema.methods.getPublicProfile = function () {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

// Static method to get user stats
userSchema.statics.getStats = async function () {
    const stats = await this.aggregate([
        {
            $group: {
                _id: '$currentStatus',
                count: { $sum: 1 }
            }
        }
    ]);

    const result = { students: 0, alumni: 0 };
    stats.forEach(stat => {
        result[stat._id === 'student' ? 'students' : 'alumni'] = stat.count;
    });

    return result;
};

const User = mongoose.model('User', userSchema);
export default User;