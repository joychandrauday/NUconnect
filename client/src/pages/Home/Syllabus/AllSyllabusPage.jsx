import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const AllSyllabusPage = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: subjects = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await axiosSecure.get("/subjects");
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
  return (
    <div>
      <h1 className="text-3xl font-bold text-center pt-4 pb-10 capitalize">
        Depertment Wise Syllabus.({subjects.length})
      </h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 container mx-auto gap-4">
        {subjects.map((subject) => (
          <Link
            to={`/syllabus/${subject.slug}`}
            key={subject._id}
            className="border-4 border-gray-600 p-4 my-4 flex flex-col gap-2 items-center justify-center text-white relative group hover:bg-black "
            style={{
              background:
                "linear-gradient(342deg, rgba(103,80,121,1) 0%, rgba(190,23,23,1) 41%, rgba(13,90,106,1) 100%)",
            }}
          >
            <img
              src={subject?.icon}
              alt={subject.subjectName}
              className="w-2/6 bg-white p-2 rounded shadow-sm"
            />
            <p className="text-2xl font-bold ">{subject.subjectName}</p>
            <div className="flex font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bg-[#801111d5] w-full h-full items-center justify-center">
              View Details
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllSyllabusPage;
