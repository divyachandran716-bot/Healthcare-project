import {
  Bell,
  UserCircle
} from "lucide-react";


export default function DoctorNavbar(){

return (

<header className="
fixed
top-0
right-0
left-72
h-20
bg-white/90
backdrop-blur-xl
border-b
shadow-sm
flex
items-center
justify-between
px-8
z-50
">


<h2 className="
text-xl
font-bold
text-slate-700
">
Doctor Portal
</h2>



<div className="
flex
items-center
gap-5
">


<Bell
className="text-slate-500"
/>


<div className="
flex
items-center
gap-3
">


<UserCircle
size={38}
className="text-teal-600"
/>


<div>

<p className="
font-semibold
text-slate-800
">
Dr. Rajesh Kumar
</p>


<p className="
text-xs
text-teal-600
font-semibold
">
Doctor Portal
</p>


</div>


</div>


</div>


</header>

);

}