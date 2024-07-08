import React from "react";
import { FaCheck, FaClock, FaPlay, FaStar, FaUser } from "react-icons/fa";
import { TbCheck, TbClock, TbPlayerPlay, TbStar, TbUser } from "react-icons/tb";
import { Link, ScrollRestoration } from "react-router-dom";

const SingleCourse = ({ course }) => {
  const {
    _id,
    title,
    price,
    description,
    department,
    duration,
    type,
    rating,
    totalEnrolled,
    active,
    featuredImage,
    seatsLeft,
    enrollDeadline,
    instructor,
    level,
  } = course;

  return (
    <div
      className="relative w-full mx-auto text-white rounded shadow-lg hover:shadow-2xl transition-shadow duration-300"
      style={{
        background:
          "radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%)",
      }}
    >
      <figure className="overflow-hidden">
        <img
          src={featuredImage}
          alt="Course Image"
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>
      <Link
        to={`/courses/${department}`}
        className="badge border-none absolute top-5 left-5 bg-yellow-400 text-black py-1 px-3 rounded-full hover:shadow-md hover:shadow-black"
      >
        {department}
      </Link>
      <div className="badge badge-primary absolute top-0 right-0 text-white  py-1 px-3 rounded-none shadow-md">
        {seatsLeft} seats left
      </div>
      <div className="p-4 rounded-b-lg backdrop-filter backdrop-blur-lg">
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="mb-2">
          Instructor:{" "}
          <Link
            to={`/instructor/${instructor.id}`}
            className="text-blue-700 font-bold"
          >
            {instructor?.name}
          </Link>
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-white  text-sm">Price: ${price}</span>
          <span className="text-white  text-sm flex items-center">
            <FaClock className="text-lg mr-1" /> {duration}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-white  text-sm flex items-center">
            <FaPlay className="text-lg mr-1" /> {level}
          </span>
          <span className="text-white  text-sm flex items-center">
            <FaStar className="text-lg mr-1" /> {rating}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-white text-sm flex items-center">
            Enrolled <FaUser className="text-lg ml-1 mr-1" /> {totalEnrolled}
          </span>

          <span>
            {enrollDeadline && (
              <div className="mb-4">
                <span className="text-white  text-sm">
                  Enroll before: {enrollDeadline}
                </span>
              </div>
            )}
          </span>
        </div>
        <button className="w-full btn bg-gradient-to-r border border-gray-600 from-primary to-slate-900  text-white font-bold rounded shadow-md hover:bg-gradient-to-l transition-all duration-300">
          <Link to={`/course/${_id}`}>View Details</Link>
        </button>
      </div>
      
    </div>
  );
};

export default SingleCourse;
