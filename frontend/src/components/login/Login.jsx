import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUserLoginMutation } from "../../redux/api/AuthApi";
import { Authcontext } from "../../context/ContextStore";
import { useContext } from "react";
function Login() {
  const {isLogin, setIsLogin}=useContext(Authcontext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [
    userLogin,
    { data, isLoading, isError, error, isSuccess },
  ] = useUserLoginMutation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

 useEffect(() => {
  if (isSuccess) {
    const token=data.token
    // console.log(token)
        localStorage.setItem('token',token)
        setIsLogin(true)
    toast.success("Login successful 🎉");
    
    navigate("/");
  }

  if (isError) {
    toast.error(error?.data?.message || "Login failed");
  }
}, [isSuccess, isError, error, navigate]);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // ✅ FIXED
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await userLogin(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div data-aos="zoom-in" className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
          />

          <button
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
