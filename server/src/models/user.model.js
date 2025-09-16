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
        minlength: [8, 'Minimum password length is 8 characters'],
        select: false,
    },

    // Conditional fields
    collegeName: {
        type: String,
        trim: true,
        maxlength: 200,
        required: function () { return this.role !== 'admin'; }
    },

    abcId: {
        type: String,
        trim: true,
        maxlength: 50,
        required: function () { return this.role !== 'admin'; }
    },

    enrollment: {
        type: String,
        trim: true,
        maxlength: 50,
        required: function () { return this.role !== 'admin'; }
    },

    degree: {
        type: String,
        trim: true,
        maxlength: 100,
    },

    course: {
        type: String,
        trim: true,
        maxlength: 100,
        required: function () { return this.role !== 'admin'; }
    },

    specialization: {
        type: String,
        trim: true,
        maxlength: 100,
        required: function () { return this.role !== 'admin'; }
    },

    yearOfJoining: {
        type: Number,
        min: 2000,
        max: new Date().getFullYear() + 5,
        required: function () { return this.role !== 'admin'; }
    },

    yearOfPassing: {
        type: Number,
        min: 2000,
        max: new Date().getFullYear() + 10,
        required: function () { return this.role !== 'admin'; }
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

    city: {
        type: String,
        trim: true,
        maxlength: 100,
        default: ''
    },

    experience: [
        {
            company: {
                type: String,
                required: true,
                trim: true,
                maxlength: 200
            },

            position: {
                type: String,
                required: true,
                trim: true,
                maxlength: 100
            },

            startDate: {
                type: Date,
                required: true
            },

            endDate: {
                type: Date,
                default: null // null if currently working
            },

            description: {
                type: String,
                trim: true,
                maxlength: 1000,
                default: ''
            },
            
            isCurrent: {
                type: Boolean,
                default: false
            }
        }
    ],

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
        select: false
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