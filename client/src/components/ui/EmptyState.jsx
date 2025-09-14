import { User } from "lucide-react";

export default function EmptyState({ hasFilters }) {
    return (
        <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                No alumni found
            </h3>
            <p className="text-gray-600">
                {hasFilters
                    ? "Try adjusting your search or filters"
                    : "No alumni have joined the platform yet"}
            </p>
        </div>
    );
}