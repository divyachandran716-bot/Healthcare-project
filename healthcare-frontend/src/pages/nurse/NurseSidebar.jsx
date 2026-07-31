import {
  LayoutDashboard,
  Users,
  HeartPulse,
  FileText,
  AlertTriangle,
  CalendarDays,
  ClipboardList,
  LogOut,
  UserRound
} from "lucide-react";


import {
  NavLink,
  useNavigate
} from "react-router-dom";



const menu=[

{
name:"Dashboard",
path:"/nurse",
icon:LayoutDashboard
},

{
name:"Patients",
path:"/nurse/patients",
icon:Users
},

{
name:"Vital Signs",
path:"/nurse/vitals",
icon:HeartPulse
},

{
name:"Nursing Notes",
path:"/nurse/notes",
icon:ClipboardList
},

{
name:"Emergency Alerts",
path:"/nurse/emergency-alerts",
icon:AlertTriangle
},

{
name:"Appointments",
path:"/nurse/appointments",
icon:CalendarDays
},

{
name:"Medical Reports",
path:"/nurse/reports",
icon:FileText
}

];





export default function NurseSidebar(){


const navigate=useNavigate();



const handleLogout=()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


navigate("/login");


};

return (


<aside className="
fixed
left-0
top-0
w-64
h-screen
bg-white
shadow-xl
border-r
border-slate-100
p-6
flex
flex-col
">





{/* LOGO */}


<div className="
mb-8
bg-gradient-to-r
from-teal-600
to-cyan-500
rounded-3xl
p-5
text-white
">


<h1 className="
text-3xl
font-bold
">

🏥 MediCare

</h1>


<p className="
text-sm
text-teal-50
mt-1
">

Nurse Portal

</p>


</div>







{/* MENU */}


<nav className="
space-y-3
flex-1
">


{

menu.map((item)=>{


const Icon=item.icon;


return (


<NavLink

key={item.name}

to={item.path}


className={({isActive})=>`

group
flex
items-center
gap-4
px-5
py-3
rounded-2xl
font-medium
transition-all
duration-300


${
isActive

?

"bg-gradient-to-r from-teal-600 to-cyan-500 text-white shadow-lg scale-[1.02]"

:

"text-slate-600 hover:bg-teal-50 hover:text-teal-700"

}

`}


>


<Icon

size={21}

className="

group-hover:scale-110

transition

"

/>


<span>

{item.name}

</span>



</NavLink>


)


})


}


</nav>








{/* PROFILE */}


<div className="
bg-slate-50
rounded-2xl
p-4
mb-4
flex
items-center
gap-3
">


<div className="
w-12
h-12
rounded-full
bg-teal-100
flex
items-center
justify-center
">

<UserRound
className="text-teal-700"
/>

</div>


<div>


<p className="
font-semibold
text-slate-700
">

Nurse Priya

</p>


<p className="
text-xs
text-green-600
">

● Online

</p>


</div>


</div>








{/* LOGOUT */}


<button

onClick={handleLogout}

className="
flex
items-center
gap-3
px-5
py-3
rounded-2xl
w-full
text-red-600
font-medium
hover:bg-red-50
transition
"


>


<LogOut size={21}/>


Logout


</button>





</aside>


)

}