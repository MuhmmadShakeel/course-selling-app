import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/Images/logo.avif";
import { Authcontext } from "../../context/ContextStore";
import { useContext } from "react";
function Navbar() {
    const {isLogin, setIsLogin}=useContext(Authcontext)
  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive ? "text-blue-400" : "text-white"
    } hover:text-blue-300`;

  return (
    <header className="bg-gradient-to-r from-black to-blue-950 shadow-md">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-16">
          
          {/* Logo + Brand */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Commoncourse Logo"
              className="w-10 h-10 object-contain"
            />
            <h1 className="text-xl font-semibold tracking-wide text-white">
              Commoncourse
            </h1>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
            <li>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses" className={navLinkClass}>
                Courses
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </li>
          </ul>

   
   
{/* Auth Buttons */}
<div className="hidden md:flex items-center gap-4">
  {isLogin ? (
    <button
      onClick={() => {
        setIsLogin(false);        
        localStorage.removeItem("token"); 
      }}
      className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg text-sm font-medium text-white"
    >
      Logout
    </button>
  ) : (
    <>
      <Link
        to="/login"
        className="text-sm text-white hover:text-blue-300 transition"
      >
        Login
      </Link>

      <Link
        to="/signup"
        className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-sm font-medium text-white"
      >
        Sign Up
      </Link>
    </>
  )}
</div>


      
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
