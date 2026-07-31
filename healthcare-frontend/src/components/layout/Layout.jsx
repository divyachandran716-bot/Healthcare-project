import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


export default function Layout(){


return (

<div className="flex">

  <Sidebar />


  <main className="
  ml-72
  flex-1
  min-h-screen
  ">

    <Navbar />

    <Outlet />

  </main>


</div>

)

}