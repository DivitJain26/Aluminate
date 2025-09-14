export default function AlumniCard ({ name, role, college, course, graduationYear, company, skills }) {
  return (
    <div className="p-6 bg-white shadow-md rounded-2xl">
      {/* Profile Header */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-semibold text-lg">
          {name?.charAt(0) || "A"}
        </div>
        <div className="ml-4 flex-1">
          <h3 className="text-lg font-semibold text-purple-900 truncate">{name}</h3>
          <p className="text-purple-600 text-sm font-medium">{role}</p>
        </div>
      </div>

      {/* Info Section */}
      <div className="space-y-3 mb-6">
        <p className="text-sm text-purple-600 truncate">{college}</p>
        <p className="text-sm text-purple-600 truncate">{course}</p>
        <p className="text-sm text-purple-600">Graduated {graduationYear}</p>
        <p className="text-sm text-purple-600 truncate">{company}</p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1 mt-2">
          {skills?.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200">
        Start Conversation
      </button>
    </div>
  );
};


