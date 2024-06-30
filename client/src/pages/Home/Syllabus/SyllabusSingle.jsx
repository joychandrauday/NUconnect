import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SingleDetailSyllabus from "./SingleDetailSyllabus";

const SyllabusSingle = () => {
  const { slug } = useParams();
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

  if (isError) {
    return <div>Error fetching packages data</div>;
  }
  console.log(subject);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center pt-4 pb-10 capitalize">
        Detailed Syllabus of Department of {subject.slug}
      </h1>
      <div className="container mx-auto">
        <Tabs className={'text-center'}>
          <TabList>
            <Tab>First Year</Tab>
            <Tab>Second Year</Tab>
            <Tab>Third Year</Tab>
            <Tab>Fourth Year</Tab>
          </TabList>

          <TabPanel>
            <SingleDetailSyllabus courses={subject.English.firstYear.courses}/>
          </TabPanel>
          <TabPanel>
            <SingleDetailSyllabus courses={subject.English.secondYear.courses}/>
          </TabPanel>
          <TabPanel>
            <SingleDetailSyllabus courses={subject.English.thirdYear.courses}/>
          </TabPanel>
          <TabPanel>
            <SingleDetailSyllabus courses={subject.English.fourthYear.courses}/>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default SyllabusSingle;
