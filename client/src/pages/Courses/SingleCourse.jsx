import React from "react";
import { FcStart } from "react-icons/fc";
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
    studentsEnrolled,
    active,
    featuredImage,
    seatsLeft,
    instructor,
  } = course;
  return (
    <div>
      <div className="card border cursor-pointer bg-white relative rounded-none shadow-xl">
        <figure className="bg-white hover:bg-gray-100 p-4">
          <img
            src={featuredImage}
            alt="book image"
            className="w-full
             shadow-md  shadow-black"
          />
        </figure>
        <Link
          to={`/courses/${department}`}
          className="badge badge-warning font-semibold rounded-none absolute capitalize"
        >
          {department}
        </Link>
        <div className="badge badge-accent font-semibold rounded-none absolute top-6 capitalize">
          {seatsLeft} seats left.
        </div>
        <div className="card-body">
          <h2 className="card-title text-black">{title}</h2>
          <p>
            Instructor:{" "}
            <span className="text-blue-950 font-bold">{instructor?.name}</span>{" "}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-black font-semibold text-sm">Price: ${price}</span>
            <span className="text-black font-semibold text-sm flex items-center"><TbClock className="text-xl" />: {duration}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black font-semibold text-sm flex items-center"><TbPlayerPlay className="text-xl"/>: {type}</span>
            <span className="text-black font-semibold text-sm flex items-center"><TbStar className="text-xl" />: {rating}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black font-semibold text-sm flex items-center gap-2">
              Enrolled <TbUser />: {studentsEnrolled}
            </span>
            <span className="text-black font-semibold text-sm flex items-center">
              Active: {active ? <TbCheck className="text-xl"></TbCheck> : "No"}
            </span>
          </div>
          <div className="flex gap-2 justify-between">
            <button className="w-full bg-primary btn text-white capitalize" type="primary">
              <Link to={`/course/${_id}`}>View details</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
