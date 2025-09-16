import { adminAPI } from "./api";

export const downloadData = async (setLoading, setError) => {
  try {
    setLoading?.(true);
    setError?.("");

    // Call backend API
    const response = await adminAPI.downloadData({
      responseType: "blob", // ensure backend sends Excel/CSV properly
    });

    // Create blob and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "alumni_data.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();

    setLoading?.(false);
  } catch (err) {
    console.error(err);
    setError?.("Failed to download data");
    setLoading?.(false);
  }
};
