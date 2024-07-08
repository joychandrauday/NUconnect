import { useState, useEffect } from "react";
import axios from "axios"; // Assuming axios is being used for HTTP requests
import { toast } from "react-toastify"; // Assuming react-toastify is being used for notifications
import useAxiosPublic from "./useAxiosPublic";

const useInstructor = (instructor) => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic=useAxiosPublic()
  console.log(instructor);
  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await axiosPublic.get(`/instructor/${instructor}`);
        setTeacher(response.data);
      } catch (err) {
        setError(err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructor();
  }, [axiosPublic,instructor]);

  return { teacher, loading, error };
};

export default useInstructor;
