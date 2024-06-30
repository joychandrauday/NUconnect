import { useQuery } from "@tanstack/react-query";
import React from "react";
import icon from "../../../assets/images/connections.png";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SingleDetailSyllabus from "./SingleDetailSyllabus";
import { TbFlagPlus, TbPlus } from "react-icons/tb";

const SyllabusSingle = () => {
  const { slug } = useParams();
  const navigate=useNavigate()
  const axiosPublic = useAxiosPublic();
  const {
    data: subject = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["subject"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/detailed-syllabus/${slug}`);
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

  if (subject.length === 0) {
    return (
      <div>
        <div className="flex flex-col items-center max-w-sm justify-center mx-auto text-center gap-5 pt-16">
          <img src={icon} alt="" className="w-2/5 overly" />

          <h1 className="text-3xl font-bold text-center pt-4 pb-10 capitalize">
            no syllabus found
          </h1>
          <button
              onClick={() => navigate('/')} 
              className='flex items-center justify-center w-1/2 px-5 py-1 text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto   hover:bg-gray-100 '
            >
              <TbPlus></TbPlus>

              <span>Add A Syllabus</span>
            </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pt-4 pb-10 capitalize">
        Detailed Syllabus of Department of {subject.slug}
      </h1>
      <div className="container mx-auto">
        <Tabs className={"text-center"}>
          <TabList>
            <Tab>First Year</Tab>
            <Tab>Second Year</Tab>
            <Tab>Third Year</Tab>
            <Tab>Fourth Year</Tab>
          </TabList>

          <TabPanel>
            <SingleDetailSyllabus
              courses={subject?.details.firstYear?.courses || []}
            />
          </TabPanel>
          <TabPanel>
            <SingleDetailSyllabus
              courses={subject?.details.secondYear?.courses || []}
            />
          </TabPanel>
          <TabPanel>
            <SingleDetailSyllabus
              courses={subject?.details.thirdYear?.courses || []}
            />
          </TabPanel>
          <TabPanel>
            <SingleDetailSyllabus
              courses={subject?.details.fourthYear?.courses || []}
            />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default SyllabusSingle;
