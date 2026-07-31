import {
  Outlet
} from "react-router-dom";

import DoctorSidebar from "./DoctorSidebar";
import DoctorNavbar from "./DoctorNavbar";


export default function DoctorLayout(){

return (

<div className="
min-h-screen
bg-slate-50
">


<DoctorSidebar />


<div className="
ml-72
">


<DoctorNavbar />


<main className="
pt-24
p-8
">

<Outlet />

</main>


</div>


</div>

);

}