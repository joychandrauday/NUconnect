import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { TbClock, TbPlayerPlay, TbStar, TbUser } from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { FaCheck, FaGraduationCap } from "react-icons/fa";

const CourseDetails = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    data: course = [],
    isLoading,
    isError,
  } = useQuery(["course"], async () => {
    const res = await axiosPublic.get(`/course/${id}`);
    return res.data;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  if (isError || !course) {
    return <div>Error fetching course data</div>;
  }

  const {
    title,
    description,
    instructor,
    duration,
    type,
    rating,
    studentsEnrolled,
    price,
    featuredImage,
    seatsLeft,
    notes,
    quiz,
    active,
  } = course;

  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-1/2 text-left flex flex-col gap-5 bg-white bg-opacity-80 p-6 rounded-lg backdrop-filter backdrop-blur-lg shadow-lg">
          <h1 className="text-4xl font-bold pt-4 capitalize text-gradient-to-r from-purple-500 to-blue-500">
            {title}
          </h1>
          <p className="text-lg text-gray-700">{description}</p>
          <div className="flex flex-col gap-2">
            <p className="text-lg text-gray-700">
              Instructor:{" "}
              <Link to={"/instructor"} className="text-blue-700 font-bold">
                {instructor?.name}
              </Link>{" "}
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center justify-between text-lg text-gray-700">
                <span className="flex items-center">
                  <TbClock className="mr-2 text-blue-500" /> Duration: {duration}
                </span>
                <span className="flex items-center">
                  <TbPlayerPlay className="mr-2 text-blue-500" /> Type: {type}
                </span>
                <span className="flex items-center">
                  <TbStar className="mr-2 text-blue-500" /> Rating: {rating}
                </span>
              </div>
              <div className="flex items-center justify-between text-lg text-gray-700">
                <span className="flex items-center">
                  <TbUser className="mr-2 text-blue-500" /> Enrolled: {studentsEnrolled}
                </span>
              </div>
              <div className="flex items-center justify-between text-lg text-gray-700">
                <span className="flex items-center">
                  <FaGraduationCap className="mr-2 text-blue-500" /> Price: ${price}
                </span>
              </div>
              <div className="flex items-center justify-between text-lg text-gray-700 mt-4">
                <span className="flex items-center">
                  Notes: {notes ? <FaCheck className="text-green-500" /> : <ImCross className="text-red-500" />}
                </span>
                <span className="flex items-center">
                  Quiz: {quiz ? <FaCheck className="text-green-500" /> : <ImCross className="text-red-500" />}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 relative flex flex-col items-center">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-72 object-cover rounded-lg shadow-lg mb-4 transition-transform duration-300 hover:scale-105"
          />
          <div className="flex flex-col items-center justify-center gap-5 w-full">
            <span className="font-semibold text-md absolute top-0 left-0 p-4 badge bg-purple-500 text-white rounded-md">
              Seats Left: {seatsLeft}
            </span>
            <button
              onClick={() => navigate(`/enroll/${id}`)}
              className={`flex items-center justify-center px-5 py-3 rounded-md w-4/5 mx-auto transition-colors duration-200 capitalize font-bold text-white ${
                active
                  ? "bg-gradient-to-r from-green-400 to-blue-500 shadow-lg hover:bg-gradient-to-l"
                  : "bg-gray-400 cursor-not-allowed opacity-50"
              }`}
              disabled={!active}
            >
              <FaGraduationCap className="mr-2 text-2xl" />
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
