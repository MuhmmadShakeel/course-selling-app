import React from "react";
import { useGetCoursesQuery } from "../../redux/api/CoursesApi";
import { useNavigate } from "react-router-dom";
function Courses() {
  const navigate=useNavigate()
  const { data, isLoading, isError, error } = useGetCoursesQuery();

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading courses...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">
          Failed to load courses. Please try again.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-6">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Our Courses
          </h1>
          <p className="max-w-2xl mx-auto text-gray-600">
            Browse industry-focused courses designed to build real-world skills.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data?.courses?.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition p-6"
            >
              <img
                src={course.image?.url}
                alt={course.title}
                className="h-40 w-full object-cover rounded-lg mb-4"
              />

              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {course.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {course.description}
              </p>

              <button onClick={() => navigate(`/courses/${course._id}`)}
                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg text-sm font-medium">
                  View Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Courses;
