import ExcelJS from "exceljs";
import User from "../models/user.model.js";

const formatDate = (date) => (date ? new Date(date).toISOString().split("T")[0] : "");

export const downloadAlumniExcel = async (req, res) => {
    try {
        const alumni = await User.find({ role: "alumni" });

        if (!alumni.length) {
            return res.status(404).json({
                success: false,
                message: "No alumni found",
                data: {},
            });
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Alumni Data");

        // Determine maximum number of experiences across all alumni
        let maxExperiences = 0;
        alumni.forEach(a => {
            if (Array.isArray(a.experience)) maxExperiences = Math.max(maxExperiences, a.experience.length);
        });

        // Base columns (alumni info)
        const baseColumns = [
            { header: "Name", key: "name", width: 20 },
            { header: "Email", key: "email", width: 30 },
            { header: "College", key: "collegeName", width: 25 },
            { header: "ABC ID", key: "abcId", width: 15 },
            { header: "Enrollment", key: "enrollment", width: 20 },
            { header: "Degree", key: "degree", width: 20 },
            { header: "Course", key: "course", width: 20 },
            { header: "Specialization", key: "specialization", width: 25 },
            { header: "Year of Joining", key: "yearOfJoining", width: 15 },
            { header: "Year of Passing", key: "yearOfPassing", width: 15 },
            { header: "Current Status", key: "currentStatus", width: 15 },
            { header: "Role", key: "role", width: 12 },
            { header: "Profile Image", key: "profileImage", width: 30 },
            { header: "Bio", key: "bio", width: 40 },
            { header: "Skills", key: "skills", width: 30 },
            { header: "City", key: "city", width: 20 },
            { header: "LinkedIn", key: "linkedinProfile", width: 30 },
            { header: "GitHub", key: "githubProfile", width: 30 },
            { header: "Account Status", key: "isActive", width: 15 },
            { header: "Member Since", key: "createdAt", width: 20 },
            { header: "Last Login", key: "lastLoginAt", width: 20 },
        ];

        // Add dynamic experience columns based on maxExperiences
        const expColumns = [];
        for (let i = 0; i < maxExperiences; i++) {
            expColumns.push(
                { header: `Company ${i + 1}`, key: `expCompany${i + 1}`, width: 25 },
                { header: `Position ${i + 1}`, key: `expPosition${i + 1}`, width: 25 },
                { header: `Start Date ${i + 1}`, key: `expStartDate${i + 1}`, width: 15 },
                { header: `End Date ${i + 1}`, key: `expEndDate${i + 1}`, width: 15 },
                { header: `Current Job ${i + 1}`, key: `expIsCurrent${i + 1}`, width: 12 },
                { header: `Job Description ${i + 1}`, key: `expDescription${i + 1}`, width: 40 },
            );
        }

        worksheet.columns = [...baseColumns, ...expColumns];
        worksheet.views = [{ state: "frozen", ySplit: 1 }];

        // Add rows
        alumni.forEach(alum => {
            const alumData = alum.toObject();
            const row = {
                name: alumData.name || "",
                email: alumData.email || "",
                collegeName: alumData.collegeName || "",
                abcId: alumData.abcId || "",
                enrollment: alumData.enrollment || "",
                degree: alumData.degree || "",
                course: alumData.course || "",
                specialization: alumData.specialization || "",
                yearOfJoining: alumData.yearOfJoining || "",
                yearOfPassing: alumData.yearOfPassing || "",
                currentStatus: alumData.currentStatus || "",
                role: alumData.role || "",
                profileImage: alumData.profileImage || "",
                bio: alumData.bio || "",
                skills: Array.isArray(alumData.skills) ? alumData.skills.join(", ") : "",
                city: alumData.city || "",
                linkedinProfile: alumData.linkedinProfile || "",
                githubProfile: alumData.githubProfile || "",
                isActive: alumData.isActive ? "Active" : "Inactive",
                createdAt: formatDate(alumData.createdAt),
                lastLoginAt: formatDate(alumData.lastLoginAt),
            };

            // Fill experience columns
            if (Array.isArray(alumData.experience)) {
                alumData.experience.forEach((exp, i) => {
                    row[`expCompany${i + 1}`] = exp.company || "";
                    row[`expPosition${i + 1}`] = exp.position || "";
                    row[`expStartDate${i + 1}`] = formatDate(exp.startDate);
                    row[`expEndDate${i + 1}`] = exp.isCurrent ? "Present" : formatDate(exp.endDate);
                    row[`expIsCurrent${i + 1}`] = exp.isCurrent ? "Yes" : "No";
                    row[`expDescription${i + 1}`] = exp.description || "";
                });
            }

            worksheet.addRow(row);
        });

        // Style header
        worksheet.getRow(1).eachCell(cell => {
            cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF800080" } };
        });

        const buffer = await workbook.xlsx.writeBuffer();
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=alumni_data_all_experiences.xlsx");
        res.send(buffer);
    } catch (error) {
        console.error("Error generating Excel:", error);
        res.status(500).json({ success: false, message: "Error generating Excel file", data: {} });
    }
};
