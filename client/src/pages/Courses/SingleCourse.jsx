import React from "react";
import { TbCheck, TbClock, TbPlayerPlay, TbStar, TbUser } from "react-icons/tb";
import { Link } from "react-router-dom";

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
        className="badge absolute top-5 left-5 bg-yellow-400 text-black py-1 px-3 rounded-full hover:shadow-md hover:shadow-black"
      >
        {department}
      </Link>
      <div className="badge badge-primary absolute top-0 right-0 text-white font-semibold py-1 px-3 rounded-none shadow-md">
        {seatsLeft} seats left
      </div>
      <div className="p-4 rounded-b-lg backdrop-filter backdrop-blur-lg">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        <p className="mb-2">
          Instructor:{" "}
          <span className="text-blue-700 font-bold">{instructor?.name}</span>
        </p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-semibold text-sm">
            Price: ${price}
          </span>
          <span className="text-white font-semibold text-sm flex items-center">
            <TbClock className="text-lg mr-1" /> {duration}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-semibold text-sm flex items-center">
            <TbPlayerPlay className="text-lg mr-1" /> {type}
          </span>
          <span className="text-white font-semibold text-sm flex items-center">
            <TbStar className="text-lg mr-1" /> {rating}
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-white font-semibold text-sm flex items-center">
            Enrolled <TbUser className="text-lg ml-1 mr-1" /> {totalEnrolled}
          </span>
          <span className="text-white font-semibold text-sm flex items-center">
            Active: {active ? <TbCheck className="text-lg" /> : "No"}
          </span>
        </div>
        {enrollDeadline && (
          <div className="mb-4">
            <span className="text-white font-semibold text-sm">
              Enrollment Deadline: {enrollDeadline}
            </span>
          </div>
        )}
        <button className="w-full btn border-none bg-gradient-to-r from-primary to-secondary text-white font-bold rounded shadow-md hover:bg-gradient-to-l transition-all duration-300">
          <Link to={`/course/${_id}`}>View Details</Link>
        </button>
      </div>
    </div>
  );
};

export default SingleCourse;
