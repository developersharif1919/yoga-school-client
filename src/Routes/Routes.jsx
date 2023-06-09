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
        }
      ]
    },
    
  ]);