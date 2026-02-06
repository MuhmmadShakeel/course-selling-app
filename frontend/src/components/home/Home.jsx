import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="bg-gradient-to-r from-black to-blue-950 min-h-[calc(100vh-4rem)] flex items-center">
      <div className="container mx-auto px-6 text-center text-white">

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Common<span className="text-blue-400">Course</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-300 mb-10 leading-relaxed">
          Learn industry-ready skills with
          <span className="text-white font-medium">
            {" "}expert-designed courses{" "}
          </span>
          and practical video content built for modern developers.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/courses"
            className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg text-sm md:text-base font-semibold"
          >
            Explore Courses
          </Link>

          <Link
            to="/videos"
            className="border border-blue-500 hover:bg-blue-500/10 transition px-6 py-3 rounded-lg text-sm md:text-base font-semibold"
          >
            Watch Course Videos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
