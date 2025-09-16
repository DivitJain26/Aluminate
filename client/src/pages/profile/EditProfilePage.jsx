import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

export default function EditProfilePage() {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: user.name ?? "",
            email: user.email ?? "",
            bio: user.bio ?? "",
            course: user.course ?? "",
            specialization: user.specialization ?? "",
            yearOfJoining: user.yearOfJoining ?? "",
            yearOfPassing: user.yearOfPassing ?? "",
            skills: user.skills ?? [],
            currentCompany: user.currentCompany ?? "",
            currentPosition: user.currentPosition ?? "",
            linkedinProfile: user.linkedinProfile ?? "",
            githubProfile: user.githubProfile ?? "",
            profileImage: user.profileImage ?? "https://via.placeholder.com/100",
        },
    });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setValue("profileImage", imageUrl); // update react-hook-form state
        }
    };

    const onSubmit = (data) => {
        console.log(data);

        updateProfile(data);
        navigate("/my-profile");
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-purple-50 flex justify-center items-center">
            <div className="w-full max-w-2xl">
                {/* Page Heading */}
                <h1 className="text-2xl font-bold text-black text-center mb-6">
                    Edit Profile
                </h1>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow-lg rounded-2xl w-full p-6 space-y-6"
                >
                    {/* Profile Image */}
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <img
                                src={user.profileImage}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-purple-200"
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current.click()}
                                className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-white shadow-md hover:bg-purple-700"
                            >
                                <Camera className="w-4 h-4" />
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Non-editable fields */}
                    <div>
                        <p>
                            <span className="font-semibold">Name:</span> {user.name}
                        </p>
                        <p>
                            <span className="font-semibold">Email:</span> {user.email}
                        </p>
                        <p>
                            <span className="font-semibold">Institution:</span>{" "}
                            {user.collegeName ?? "MIT ADT University"}
                        </p>
                    </div>

                    {/* Editable fields */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            {...register("bio")}
                            className="w-full mt-1 p-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course</label>
                        <input
                            type="text"
                            {...register("course")}
                            className="w-full mt-1 p-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Specialization
                        </label>
                        <input
                            type="text"
                            {...register("specialization")}
                            className="w-full mt-1 p-2 border rounded-lg"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">
                                Admission Year
                            </label>
                            <input
                                type="text"
                                {...register("yearOfJoining")}
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium text-gray-700">
                                Graduation Year
                            </label>
                            <input
                                type="text"
                                {...register("yearOfPassing")}
                                className="w-full mt-1 p-2 border rounded-lg"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Skills</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {watch("skills")?.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1"
                                >
                                    {skill}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newSkills = [...watch("skills")];
                                            newSkills.splice(idx, 1);
                                            setValue("skills", newSkills, { shouldValidate: true });
                                        }}
                                        className="text-purple-700 font-bold"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            <input
                                type="text"
                                placeholder="Add skill and press Enter"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        const newSkill = e.target.value.trim();
                                        if (newSkill) {
                                            setValue("skills", [...(watch("skills") || []), newSkill], {
                                                shouldValidate: true,
                                            });
                                            e.target.value = "";
                                        }
                                    }
                                }}
                                className="border rounded px-2 py-1"
                            />
                        </div>
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Current Company
                        </label>
                        <input
                            type="text"
                            {...register("currentCompany")}
                            className="w-full mt-1 p-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Current Position
                        </label>
                        <input
                            type="text"
                            {...register("currentPosition")}
                            className="w-full mt-1 p-2 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            LinkedIn Profile
                        </label>
                        <input
                            type="text"
                            {...register("linkedinProfile")}
                            className="w-full mt-1 p-2 border rounded-lg"
                            placeholder="https://linkedin.com/in/username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            GitHub Profile
                        </label>
                        <input
                            type="text"
                            {...register("githubProfile")}
                            className="w-full mt-1 p-2 border rounded-lg"
                            placeholder="https://github.com/username"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
