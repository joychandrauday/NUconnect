import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import SyllabusSingle from "../pages/Home/Syllabus/SyllabusSingle";
import AllSyllabusPage from "../pages/Home/Syllabus/AllSyllabusPage";
import AcademicCourses from "../pages/Courses/AcademicCourses";
import SingleCourse from "../pages/Courses/SingleCourse";
import CourseDetails from "../pages/Courses/CourseDetails";
import DepartMentWise from "../pages/Courses/DepartMentWise";
import Instructors from "../pages/Instructors/Instructors";
import InstructorsDetails from "../pages/Instructors/InstructorsDetails";
import AddCourses from "../pages/Home/Syllabus/AddSyllabus";
import AddSyllabus from "../pages/Home/Syllabus/AddSyllabus";
import AddAcademicCourses from "../pages/Courses/AddAcademicCourses";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/syllabus/:slug",
        element: <SyllabusSingle />,
      },
      {
        path: "/syllabus",
        element: <AllSyllabusPage />,
      },
      {
        path: "/courses",
        element: <AcademicCourses />,
      },
      {
        path: "/course/:id",
        element: <CourseDetails />,
      },
      {
        path: "/courses/:department",
        element: <DepartMentWise />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/instructor/:id",
        element: <InstructorsDetails />,
      },
      {
        path: "/addsyllabus",
        element: <AddSyllabus />,
      },
      {
        path: "/addsyllabus/:slug",
        element: <AddSyllabus />,
      },
      {
        path: "/add-courses",
        element: <AddAcademicCourses />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);
