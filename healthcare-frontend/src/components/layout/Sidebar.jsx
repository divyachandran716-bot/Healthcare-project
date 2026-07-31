import {
  LayoutDashboard,
  Users,
  Stethoscope,
  UserRound,
  CalendarDays,
  FileText,
  Pill,
  Activity,
  Brain,
  LogOut,
  Receipt,
  Siren
} from "lucide-react";

// import { Siren } from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";


const menu = [

{
name:"Dashboard",
path:"/admin",
icon:LayoutDashboard
},

{
name:"Patients",
path:"/admin/patients",
icon:Users
},

{
name:"Doctors",
path:"/admin/doctors",
icon:Stethoscope
},

{
name:"Nurses",
path:"/admin/nurses",
icon:UserRound
},

{
name:"Appointments",
path:"/admin/appointments",
icon:CalendarDays
},

{
name:"Reports",
path:"/admin/reports",
icon:FileText
},

{
name:"Pharmacy",
path:"/admin/pharmacy",
icon:Pill
},

{
name:"Pharmacy Billing",
path:"/admin/pharmacy-billing",
icon:Receipt
},

{
name:"Analytics",
path:"/admin/analytics",
icon:Activity
},

{
name:"AI Insights",
path:"/admin/ai-insights",
icon:Brain
},

{
name:"Emergency Alerts",
path:"/admin/emergency-alerts",
icon:Siren
}

];


export default function Sidebar(){

const navigate = useNavigate();


const logout = ()=>{

localStorage.removeItem("token");

localStorage.removeItem("role");

localStorage.removeItem("user");


navigate("/");

};

return (

<aside className="
fixed
top-0
left-0
w-72
h-screen
bg-white/80
backdrop-blur-xl
border-r
border-slate-200
p-6
shadow-sm
flex
flex-col
z-50
overflow-y-auto
">


{/* Logo */}

<div className="
mb-8
">

<div className="
flex
items-center
gap-3
">

<div className="
bg-gradient-to-br
from-teal-500
to-blue-600
p-3
rounded-2xl
shadow-lg
">

🏥

</div>


<div>

<h1 className="
text-2xl
font-extrabold
bg-gradient-to-r
from-teal-600
to-blue-600
bg-clip-text
text-transparent
">

MediCare

</h1>


<p className="
text-xs
text-slate-500
">

Healthcare Analytics

</p>


</div>


</div>

</div>





{/* Menu */}

<nav className="
space-y-2
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
gap-3
px-4
py-3
rounded-2xl
transition
duration-300


${
isActive

?

"bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg shadow-teal-200"

:

"text-slate-600 hover:bg-slate-100 hover:translate-x-1"

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


<span className="
font-medium
">

{item.name}

</span>


</NavLink>


)

})

}


</nav>







{/* Logout */}

<button

onClick={logout}

className="
flex
items-center
gap-3
mt-6
px-4
py-3
rounded-2xl
text-red-600
hover:bg-red-50
transition
font-medium
"

>

<LogOut size={21}/>

Logout


</button>




</aside>

)
}