import React, { useContext } from "react";
import { Link, ScrollRestoration, useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

import {
  FaCheck,
  FaClock,
  FaCopy,
  FaGraduationCap,
  FaMarkdown,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { RxCrossCircled } from "react-icons/rx";
import { MdQuiz } from "react-icons/md";
import TeacherComponent from "./TeacherComponent";
import { AuthContext } from './../../providers/AuthProvider';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {user}=useContext(AuthContext);
  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/course/${id}`);
      return res.data;
    },
    enabled: !!id,
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
    _id,
    title,
    description,
    instructor,
    duration,
    department,
    faqs,
    modules,
    reviews,
    type,
    rating,
    totalEnrolled,
    price,
    featuredImage,
    seatsLeft,
    notes,
    quizzes,
    active,
    liveCourse
  } = course;
  const handleEnroll=(_id)=>{
    console.log('po');
  }
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <div className="w-full lg:w-2/3 text-left flex flex-col gap-2 bg-white bg-opacity-80 p-6 rounded-lg backdrop-filter backdrop-blur-lg shadow-lg">
          <h1 className="text-4xl font-bold capitalize text-gradient-to-r from-purple-500 to-primary">
            {title}
          </h1>
          <p className="text-lg text-gray-700">{description}</p>
          <div className="flex flex-col gap-2 ">
            <p className="text-lg text-gray-700">
              Instructor:{" "}
              <Link
                to={`/instructor/${instructor?.id}`}
                className="text-primary font-bold"
              >
                {instructor?.name}
              </Link>
            </p>
            <div className="flex flex-col gap-4 mt-4 lg:px-12">
              <div className="flex items-center justify-between text-lg text-gray-700">
                <span className="flex items-center">
                  <FaClock className="mr-2 text-primary" /> Duration: {duration}
                </span>
                <span className="flex items-center">
                  {quizzes > 0 ? (
                    <span className="flex gap-2 items-center ">
                      <MdQuiz className="text-primary text-2xl" />
                      {quizzes} interactive quizzes
                    </span>
                  ) : (
                    <span className="flex gap-2 items-center ">
                      <RxCrossCircled className="text-red-500 text-2xl" /> no
                      quizzes
                    </span>
                  )}
                </span>
                <span className="flex items-center">
                  <FaStar className="mr-2 text-primary" /> Rating: {rating}
                </span>
              </div>
              <div className="flex items-center justify-between text-lg text-gray-700">
                <span className="flex items-center">
                  <FaUser className="mr-2 text-primary" /> Enrolled:{" "}
                  {totalEnrolled}
                </span>
                <span className="flex items-center">
                  <FaGraduationCap className="mr-2 text-primary text-2xl" />{" "}
                  Price: ${price}
                </span>
                <span className="flex items-center">
                  {notes ? (
                    <span className="flex gap-2 items-center ">
                      <FaCopy className="text-primary text-2xl" /> Specialised
                      handnote.
                    </span>
                  ) : (
                    <span className="flex gap-2 items-center ">
                      <RxCrossCircled className="text-red-500 text-2xl" /> No
                      Handnotes.
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="wrap lg:mt-12">
              <Tabs>
                <TabList>
                  <Tab>Course Modules</Tab>
                  <Tab>FAQ</Tab>
                  <Tab>Course Reviews</Tab>
                  <Tab>Instructor</Tab>
                </TabList>

                <TabPanel>
                  {modules.map((module) => (
                    <div key={module.moduleId}>
                      <div className="collapse collapse-arrow">
                        <input
                          type="radio"
                          name="my-accordion-2"
                          defaultChecked
                        />
                        <div className="collapse-title text-xl font-medium">
                          {module.title}
                        </div>
                        <div className="collapse-content">
                          <p>{module.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabPanel>

                <TabPanel>
                  {faqs.map((faq) => (
                    <div key={faq.moduleId}>
                      <div className="collapse collapse-arrow">
                        <input
                          type="radio"
                          name="my-accordion-2"
                          defaultChecked
                        />
                        <div className="collapse-title text-xl font-medium">
                          {faq.question}
                        </div>
                        <div className="collapse-content">
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabPanel>

                <TabPanel>
                  {reviews.map((review) => (
                    <div key={review.moduleId}>
                      <div className="card border shadow-xl mb-4 ">
                        <div className="card-body">
                          <div className="flex items-center gap-6">
                            <img
                              src={review?.image}
                              alt={review.studentName}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div>
                              <div className="flex items-center gap-4 ">
                                <h2 className="card-title">
                                  {review.studentName}
                                </h2>
                                <span className="text-sm text-gray-800 flex items-center gap-1">
                                  <FaStar />
                                  {review.rating}
                                </span>
                              </div>
                              <p>{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </TabPanel>

                <TabPanel>
                  <div key={instructor}>
                    <Link
                      to={`/instructor/${instructor}`}
                      className="card bg-base-100 hover:translate-y-[-4px] transition-translate hover:shadow-primary duration-300 shadow-lg border mb-4"
                    >
                      <TeacherComponent instructor={instructor}/>
                    </Link>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
        <div className="w-full h-96 lg:w-1/3 relative flex flex-col items-center shadow-md p-4">
          <div className="">
            <div className="w-full overflow-hidden rounded-lg cursor-pointer shadow-lg">
              <img
                src={featuredImage}
                alt={title}
                className="w-full h-72  object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-5 w-full">
              <span className="font-semibold shadow text-md absolute top-0 left-0 p-4 badge bg-purple-500 text-white border-none rounded-none">
                Seats Left: {seatsLeft}
              </span>
              <Link
                to={`/courses/${department}`}
                className="font-semibold shadow text-md absolute top-9 left-0 p-4 badge bg-purple-500 text-white border-none rounded-none"
              >
                {department}
              </Link>
              <span className="font-semibold text-md absolute top-[73px] shadow left-0 p-4 badge bg-purple-500 text-white border-none rounded-none">
                {
                  liveCourse? 'Live Class':'recorded class'
              }
              </span>
              <button
                onClick={() => handleEnroll()}
                className={`flex items-center justify-center px-5 py-3  w-full mx-auto transition-colors duration-200 capitalize font-bold text-white ${
                  active && user
                    ? "bg-gradient-to-r from-[#003366] to-primary shadow-lg hover:bg-gradient-to-l"
                    : "bg-gray-400 cursor-not-allowed opacity-50"
                }`}
                disabled={!active || !user}
              >
                <FaGraduationCap className="mr-2 text-2xl" />
                {user? 'Enroll Now':'you must log in to enroll!!'}
                {user?'':<Link to="/login" className="text-primary link ml-4">Sign In</Link>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ScrollRestoration/>
    </div>
  );
};

export default CourseDetails;
