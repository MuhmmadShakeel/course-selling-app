import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {useNavigate} from 'react-router-dom'
import { useUserSignupMutation } from "../../redux/api/AuthApi";
function Signup() {
  const navigate=useNavigate()
  const [userSignup, { data, isLoading, isError, error }] =
    useUserSignupMutation();

  const [formData, setFormData] = useState({
    name: "",
    fullname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (data) {
      console.log("Signup Success:", data);
      navigate('/login')
    }
    if (isError) {
      console.log("Signup Error:", error);
    }
  }, [data, isError, error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userSignup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div data-aos="zoom-in" className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <input
            name="fullname"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <button
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
