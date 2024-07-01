import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import {
  TbCheck,
  TbClock,
  TbCursorOff,
  TbPlayerPlay,
  TbStar,
  TbUser,
} from "react-icons/tb";
import { ImCross } from "react-icons/im";
import { FaCheck, FaGraduationCap } from "react-icons/fa";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    data: course = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/course/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }
  if (isError) {
    return <div>Error fetching packages data</div>;
  }
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
    notes,
    quiz,
  } = course;
  return (
    <div className="container mx-auto py-12">
      <div className="flex gap-16">
        <div className="w-1/2 text-left flex flex-col gap-5">
          <h1 className="text-3xl font-bold pt-4 capitalize">{title}</h1>
          <p className="text-lg">{description}</p>
          <div className="flex flex-col gap-2">
            <p>
              Instructor:{" "}
              <Link to={"/instructor"} className="text-blue-950 font-bold">
                {instructor?.name}
              </Link>{" "}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-black font-semibold text-xl">
                Price: ${price}
              </span>
              <span className="text-black font-semibold text-xl flex items-center">
                <TbClock className="text-xl" />: {duration}
              </span>
              <span className="text-black font-semibold text-xl flex items-center">
                <TbPlayerPlay className="text-xl" />: {type}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-black font-semibold text-xl flex items-center gap-2">
                Enrolled <TbUser />: {studentsEnrolled}
              </span>
              <span className="text-black font-semibold text-xl flex items-center">
                <TbStar className="text-xl" />: {rating}
              </span>
              <span className="text-black font-semibold text-xl flex items-center">
                Active: {active ? <FaCheck className="text-xl" /> : <ImCross />}
              </span>
            </div>
            <div className="flex w-full">
              <div className="card bg-base-300 rounded-box grid h-10 flex-grow place-items-center">
                <span className="text-black font-semibold text-xl flex items-center gap-3">
                  Notes:{" "}
                  {notes ? (
                    <FaCheck className="text-xl"></FaCheck>
                  ) : (
                    <ImCross />
                  )}
                </span>
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="card bg-base-300 rounded-box grid h-10 flex-grow place-items-center">
                <span className="text-black font-semibold text-xl flex items-center gap-3">
                  Quiz :{" "}
                  {quiz ? <FaCheck className="text-xl"></FaCheck> : <ImCross />}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 relative">
          <img src={"https://placehold.co/600x400/png"} alt="not found" />
          <div className="flex items-center justify-center gap-5">
            <span className="text-black font-semibold text-md absolute top-0 left-0 p-4 badge rounded-none">
              Seats Left: {seatsLeft}
            </span>
            <button
              onClick={() => navigate(`/enroll/${_id}`)}
              className="flex items-center justify-center  px-5 py-1 rounded-none transition-colors duration-200 capitalize font-bold text-black border w-full gap-4 btn text-2xl btn-warning"
            > <FaGraduationCap className="text-2xl"/>
              enroll now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
