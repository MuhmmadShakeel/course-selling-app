import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

 const courseApi = createApi({
  reducerPath: "courseApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/courses",
  }),

  tagTypes: ["Courses"],

  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses",
      providesTags: ["Courses"],
    }),

    
  getCourseById: builder.query({
  query: (id) => `/${id}`, 
      providesTags: ["Courses"],
    }),

   buycourse:builder.query({
    query : (id) => `/${id}`,
     providesTags:['Courses']
 })
  }),
});

export const {useGetCoursesQuery,useGetCourseByIdQuery}=courseApi
export default courseApi;
