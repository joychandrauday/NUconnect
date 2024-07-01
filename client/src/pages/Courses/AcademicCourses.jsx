import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SingleCourse from "./SingleCourse";

const AcademicCourses = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: courses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await axiosSecure.get("/courses");
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
  console.log(courses);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center pt-4 pb-10 capitalize">
        All Courses.
      </h1>
      <div className="grid grid-cols-3 gap-4 container mx-auto">
        {
            courses.map(course =>(
                <SingleCourse course={course} key={course._id}/>
            ))
        }
      </div>
    </div>
  );
};

export default AcademicCourses;
