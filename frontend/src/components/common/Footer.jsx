import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-black to-blue-950 text-white">
      
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Common<span className="text-blue-400">Course</span>
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Learn modern, industry-ready skills with expert-designed courses
            and high-quality video content.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-blue-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-blue-300 transition">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/videos" className="hover:text-blue-300 transition">
                Videos
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-300 transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/blog" className="hover:text-blue-300 transition">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-blue-300 transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:text-blue-300 transition">
                Support
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-blue-300 transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Email: support@commoncourse.com</li>
            <li>Phone: +92 300 1234567</li>
            <li>Location: Pakistan</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} CommonCourse. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
