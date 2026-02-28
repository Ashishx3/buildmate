export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 border">
      {/* Image */}
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-2xl font-bold text-gray-800">
          {project.title}
        </h2>

        <p className="text-gray-600 text-sm line-clamp-3">
          {project.description}
        </p>

        {/* Languages */}
        <div className="flex flex-wrap gap-2 mt-2">
          {project.languages?.map((lang, i) => (
            <span
              key={i}
              className="bg-gray-200 text-xs px-2 py-1 rounded-full"
            >
              {lang}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          { (
            <>
              <a
                href={project.sourceCode}
                target="_blank"
                className="flex-1 text-center bg-black text-white py-2 rounded-lg"
              >
                View Code
              </a>
              <a
                href={project.liveLink}
                target="_blank"
                className="flex-1 text-center border border-black py-2 rounded-lg"
              >
                Live Link
              </a>
            </>
          )  (
            <>
              <button
                onClick={() => onEdit(project)}
                className="flex-1 bg-yellow-500 text-white py-2 rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(project._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
