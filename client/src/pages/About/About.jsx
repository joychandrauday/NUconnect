import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-primary text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
            About Us
          </h1>
          <p className="text-lg w-4/6 mx-auto md:text-xl text-gray-300">
            Welcome to our website dedicated to the National University of
            Bangladesh. We have created this platform to help students easily
            access the information they need and make their academic journey
            smoother. On our site, you will find:
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 relative">
          <Link
            to={"/syllabus"}
            className="bg-gray-800 p-6 rounded-lg shadow-lg group relative cursor-pointer"
          >
            <h2 className="text-2xl font-semibold mb-4 text-secondary">
              Syllabus
            </h2>
            <p className="text-gray-400">
              Detailed syllabuses for all departments to aid in your academic
              preparation.
            </p>
            <div className="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bg-primary bg-opacity-90 w-full h-full items-center justify-center top-0 left-0 shadow-md rounded-lg shadow-black">
              View Details
            </div>
          </Link>
          <Link
            to={"/"}
            className="bg-gray-800 p-6 rounded-lg shadow-lg relative cursor-pointer group"
          >
            <h2 className="text-2xl font-semibold mb-4 text-secondary">
              Suggestions
            </h2>
            <p className="text-gray-400">
              Various subject suggestions to help you prepare for exams.
            </p>
            <div className="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bg-primary bg-opacity-90 w-full h-full items-center justify-center top-0 left-0 shadow-md rounded-lg shadow-black">
              View Details
            </div>
          </Link>
          <Link
            to={"/courses"}
            className="bg-gray-800 p-6 rounded-lg shadow-lg relative cursor-pointer group"
          >
            <h2 className="text-2xl font-semibold mb-4 text-secondary">
              All Courses
            </h2>
            <p className="text-gray-400">
              All academic courses in one place. enroll your desired courses now
              and learn from our experienced teacher.
            </p>
            <div className="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bg-primary bg-opacity-90 w-full h-full items-center justify-center top-0 left-0 shadow-md rounded-lg shadow-black">
              View Details
            </div>
          </Link>
        </div>
        <div className="lg:flex gap-16">
          <div className="mt-12 basis-1/2">
            <h2 className="text-3xl font-bold text-right text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg md:text-xl text-gray-300 text-right">
              Our mission is to empower students with accessible and up-to-date
              academic resources, enabling them to excel in their studies and
              future careers. We strive to create a supportive and informative
              platform that meets the diverse needs of all students at the
              National University of Bangladesh.
            </p>
          </div>
          <div className="mt-12 basis-1/2 text-center">
            <h2 className="text-3xl text-left font-bold text-white mb-4">
              Connect With Us
            </h2>
            <div className="flex justify-start space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-400 transition"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                <FaTwitter size={30} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-400 transition"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-600 transition"
              >
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
