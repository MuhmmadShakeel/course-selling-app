import React from "react";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../../redux/api/CoursesApi";
import {useNavigate} from 'react-router-dom'
function SingalCourse() {
  const navigate=useNavigate()
  const { id } = useParams(); 

const { data, isLoading, isError } =
  useGetCourseByIdQuery(id, { skip: !id });
  console.log(data);

  if (isLoading) {
    return <p className="text-center mt-10">Loading course...</p>;
  }

  if (isError) {
    return <p className="text-center mt-10 text-red-500">Failed to load course</p>;
  }

  const { title, description, price, image } = data?.course || {};

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition">
         <button 
        onClick={()=>navigate('/courses')
        }
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition">
          Back To Courses
        </button>
      <img
        src={image?.url || "https://via.placeholder.com/400"}
        alt={title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 mt-2 text-sm">{description}</p>
        <p className="mt-3 font-bold text-blue-600">${price}</p>

  <button
  onClick={() => navigate(`/courses/${id}`)}
  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition"
>
  Enroll Now
</button>

      </div>
    </div>
  );
}

export default SingalCourse;
