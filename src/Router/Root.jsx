

import {
  createBrowserRouter,
} from "react-router";
import MainlyOut from '../Component/MainlyOut';
import Login from '../Pages/LogIn';
import Register from '../Pages/Register';
import Rooms from '../Component/Rooms';
import PrivetRoute from '../Provider/PrivetRoute';
import MyBookings from '../Component/MyBookings';
import Home from "../Component/Home/Home";
// import ErrorPage from '../Pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: "/",
    Component:MainlyOut,
    children:[
        {
            path:"/",
            loader: () => fetch('/hobby.json'),
            Component:Home
        },
        {
          path:"/login",
          Component:Login
        },
        {
          path:"/register",
          Component:Register
        },
        {
          path:"/rooms",
          Component:Rooms
        },
        {
          path:"/my-bookings",
          element: <PrivetRoute>
            <MyBookings></MyBookings>
          </PrivetRoute>
        }
    ],
    // errorElement:<ErrorPage></ErrorPage>
  },
]);