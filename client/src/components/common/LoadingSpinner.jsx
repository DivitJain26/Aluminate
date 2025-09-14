export default function LoadingSpinner() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 flex items-center justify-center text-purple-900">
            <div className="text-center">
                {/* Spinner */}
                <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-purple-600 border-t-transparent mb-6"></div>

                {/* Text */}
                <h3 className="text-xl font-semibold mb-2">Loading Aluminate...</h3>
                <p className="text-purple-700">Please wait while we set things up</p>
            </div>
        </div>
    );
}
