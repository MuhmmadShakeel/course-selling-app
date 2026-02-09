import { configureStore } from "@reduxjs/toolkit";
import courseApi from "../api/CoursesApi";
import authApi from "../api/AuthApi";
export const store = configureStore({
  reducer: {
    [courseApi.reducerPath]: courseApi.reducer,
    [authApi.reducerPath]:authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(courseApi.middleware).concat(authApi.middleware), // ✅ returns an array
});
