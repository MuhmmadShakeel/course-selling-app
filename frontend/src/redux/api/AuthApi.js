import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/user",
    credentials: "include", // optional (cookies/JWT)
  }),

  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    userSignup: builder.mutation({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),

    userLogin: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useUserSignupMutation,
  useUserLoginMutation,
} = authApi;

export default authApi;
