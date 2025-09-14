export default function LoadingSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
                <div className="bg-gray-300 h-20 rounded-xl mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-gray-300 h-64 rounded-xl"></div>
                    ))}
                </div>
            </div>
        </div>
    );
}