import React, { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Provider/Provider";

const useAdmin = () => {
  const { user,loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin,isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading && !!localStorage.getItem('access-token') , 
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user.email}`);
      
      return res.data?.admin;
    },
  });
  return [isAdmin,isAdminLoading];
};

export default useAdmin;
