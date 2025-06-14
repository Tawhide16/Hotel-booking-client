

import {
  createBrowserRouter,
} from "react-router";
import MainlyOut from '../Component/MainlyOut';
import Login from '../Pages/LogIn';
import Register from '../Pages/Register';

import PrivetRoute from '../Provider/PrivetRoute';
import MyBookings from '../Component/MyBookings';
import Home from "../Component/Home/Home";
import Rooms from "../Pages/Rooms/Rooms";
import RoomsDetails from "../Pages/Rooms/RoomsDetails";
import Faq from "../Component/Home/Faq";

import ErrorPage from '../Pages/ErrorPage';
import PriceBox from "../Pages/Rooms/PriceBox";
import AboutUs from "../Component/AboutUs";
import ContactUs from "../Component/ContactUs";

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
          path:"/faq",
          Component:Faq,
          loader: () => fetch('/f.json')
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
          path:"/aboutUs",
          Component:AboutUs
        },
        {
          path:"/contactUs",
          Component:ContactUs
        },
        {
          path:"/rooms/:id",
          Component:RoomsDetails,
          loader: ({params}) => fetch(`https://b11a11-server-side-tawhide16.vercel.app/rooms/${params.id}`)
        },
        {
          path:"/my-bookings",
          element: <PrivetRoute>
            <MyBookings></MyBookings>
          </PrivetRoute>
        },
        {
          path:"/price-box",
          element: <PrivetRoute>
            <PriceBox></PriceBox>
          </PrivetRoute>
        }
    ],
    errorElement:<ErrorPage></ErrorPage>
  },
]);