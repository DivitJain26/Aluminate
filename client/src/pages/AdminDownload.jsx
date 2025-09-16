import { useState } from "react";
import { adminAPI } from "../utils/api"; // clean usage

export default function AdminDownload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    try {
      setLoading(true);
      setError("");

      // Call backend API through utils
      const response = await adminAPI.downloadData();

      // Create blob from response
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "alumni_data.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to download data");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-purple-700 mb-6">
          Admin Data Download
        </h1>

        <button
          onClick={handleDownload}
          disabled={loading}
          className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
            loading
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {loading ? "Downloading..." : "Download Alumni Data"}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
