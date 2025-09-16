// controllers/adminController.js
import User from "../models/user.model.js";
import ExcelJS from "exceljs";

// Convert alumni data to Excel
export const downloadAlumniExcel = async (req, res) => {
  try {
    // Fetch only non-sensitive fields
    const alumni = await User.find({ role: "alumni" }).select(
      "name email collegeName abcId enrollment course specialization yearOfJoining yearOfPassing currentStatus skills currentCompany currentPosition linkedinProfile githubProfile"
    );

    if (!alumni.length) {
      return res.status(404).json({
        success: false,
        message: "No alumni found",
        data: {},
      });
    }

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Alumni Data");

    // Define columns
    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "College", key: "collegeName", width: 25 },
      { header: "ABC ID", key: "abcId", width: 15 },
      { header: "Enrollment", key: "enrollment", width: 20 },
      { header: "Course", key: "course", width: 20 },
      { header: "Specialization", key: "specialization", width: 25 },
      { header: "Year of Joining", key: "yearOfJoining", width: 15 },
      { header: "Year of Passing", key: "yearOfPassing", width: 15 },
      { header: "Current Status", key: "currentStatus", width: 15 },
      { header: "Skills", key: "skills", width: 30 },
      { header: "Company", key: "currentCompany", width: 25 },
      { header: "Position", key: "currentPosition", width: 25 },
      { header: "LinkedIn", key: "linkedinProfile", width: 30 },
      { header: "GitHub", key: "githubProfile", width: 30 },
    ];

    // Add rows
    alumni.forEach((alum) => {
      worksheet.addRow({
        ...alum.toObject(),
        skills: Array.isArray(alum.skills) ? alum.skills.join(", ") : "",
      });
    });

    // Style header row
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF800080" }, // Proper ARGB format
      };
    });

    // ✅ Fix: Write to buffer instead of directly streaming
    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=alumni_data.xlsx");

    res.send(buffer); // clean Excel download
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error generating Excel file",
      data: {},
    });
  }
};
