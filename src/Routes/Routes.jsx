import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
// import PrivateRoute from "./PrivateRoute";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import Dashboard from "../layout/Dashboard";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import Instructors from "../pages/Instructors/Instructors";
import InstructorRoute from "./InstructorRoute";
import AddAClass from "../pages/Dashboard/AddAClass/AddAClass";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";
import Classes from "../pages/Classes/Classes";
import MySelectedClass from "../pages/Dashboard/MySelectedClass/MySelectedClass";
import StudentHome from "../pages/Dashboard/StudentHome/StudentHome";
import Payment from "../pages/Dashboard/Payment/Payment";


 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:'/',
            element: <Home></Home>
        },
        {
          path:'/signup',
          element: <SignUp></SignUp>
        },
        {
          path:'/login',
          element: <Login></Login>
        },
        {
          path:'/instructors',
          element: <Instructors></Instructors>
        },
        {
          path:'/Classes',
          element: <Classes></Classes>
        }
      ]
    },
    {
      path:'/dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
          path:'/dashboard/allusers',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path:'/dashboard/ManageClasses',
          element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
        },
        {
          path:'/dashboard/AddAClass',
          element: <InstructorRoute><AddAClass></AddAClass></InstructorRoute>
        },
        {
          path:'/dashboard/MyClasses',
          element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
        },
        {
          path:'/dashboard/MySelectedClass',
          element: <PrivateRoute><MySelectedClass></MySelectedClass></PrivateRoute>
        },
        {
          path:'/dashboard/StudentHome',
          element: <PrivateRoute><StudentHome></StudentHome></PrivateRoute>
        },
        {
          path:'/dashboard/Payment',
          element:<PrivateRoute><Payment></Payment></PrivateRoute>
        }
      ]
    },
    
  ]);