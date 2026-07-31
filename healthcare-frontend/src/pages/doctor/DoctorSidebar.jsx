import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Pill,
  LogOut,
  Stethoscope
} from "lucide-react";


import {
  NavLink,
  useNavigate
} from "react-router-dom";

import toast from "react-hot-toast";



const menu=[

{
name:"Dashboard",
path:"/doctor",
icon:LayoutDashboard
},

{
name:"Patients",
path:"/doctor/patients",
icon:Users
},

{
name:"Appointments",
path:"/doctor/appointments",
icon:CalendarDays
},

{
name:"Prescriptions",
path:"/doctor/prescriptions",
icon:Pill
},

{
name:"Reports",
path:"/doctor/reports",
icon:FileText
}

];





export default function DoctorSidebar(){

const navigate = useNavigate();


const handleLogout = ()=>{

localStorage.removeItem("token");
localStorage.removeItem("user");

toast.success(
"Logged out successfully"
);

navigate("/login");

};



return (

<aside

className="
fixed
left-0
top-0
w-72
h-screen
bg-white/90
backdrop-blur-xl
border-r
border-slate-200
shadow-xl
p-6
z-40
overflow-y-auto
"

>





{/* Logo */}


<div

className="
flex
items-center
gap-3
mb-10
"

>

<div

className="
bg-gradient-to-br
from-teal-500
to-cyan-600
p-3
rounded-2xl
text-white
shadow-lg
"

>

<Stethoscope size={28}/>

</div>


<div>

<h1

className="
text-xl
font-black
text-slate-800
"

>

MediCare

</h1>


<p

className="
text-xs
text-teal-600
font-semibold
"

>

Doctor Portal

</p>


</div>


</div>







<nav

className="
space-y-3
"

>


{

menu.map((item)=>{


const Icon=item.icon;


return (


<NavLink

key={item.name}

to={item.path}


className={({isActive})=>

`

flex
items-center
gap-4
px-5
py-3.5
rounded-2xl
font-semibold
transition-all
duration-300


${
isActive

?

"bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-200"

:

"text-slate-600 hover:bg-teal-50 hover:text-teal-700"

}

`

}


>


<Icon size={21}/>


<span>

{item.name}

</span>


</NavLink>


)


})

}


</nav>








{/* Logout */}


<button

onClick={handleLogout}

className="
flex
items-center
gap-4
mt-12
px-5
py-3.5
rounded-2xl
w-full
text-red-600
font-semibold
hover:bg-red-50
transition
"

>


<LogOut size={21}/>


Logout


</button>






</aside>

);

}