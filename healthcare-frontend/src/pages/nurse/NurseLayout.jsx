import { Outlet } from "react-router-dom";

import NurseSidebar from "./NurseSidebar";

import {
  Bell,
  Search
} from "lucide-react";


export default function NurseLayout(){


return (

<div className="
flex
min-h-screen
bg-gradient-to-br
from-slate-50
to-teal-50
">


{/* SIDEBAR */}

<div className="
fixed
left-0
top-0
h-screen
">

<NurseSidebar/>

</div>





{/* MAIN */}

<div className="
flex-1
ml-64
">






{/* HEADER */}

<header
className="
h-14
bg-white
border-b
border-slate-200
shadow-sm
flex
items-center
justify-between
px-5
sticky
top-0
z-40
"
>


{/* TITLE */}

<div>

<h2
className="
text-lg
font-bold
text-slate-800
"
>
Nurse Portal 👩‍⚕️
</h2>


<p
className="
text-[11px]
text-slate-500
"
>
Patient Care Management System
</p>


</div>



{/* RIGHT SIDE */}

<div
className="
flex
items-center
gap-4
"
>


{/* SEARCH */}

<div
className="
hidden
md:flex
items-center
gap-2
bg-slate-100
px-3
py-1.5
rounded-lg
"
>


<Search
size={16}
className="text-slate-400"
/>


<input
placeholder="Search..."
className="
bg-transparent
outline-none
w-28
text-sm
"
/>


</div>




{/* NOTIFICATION */}

<button
className="
relative
bg-teal-50
p-2
rounded-lg
hover:bg-teal-100
transition
"
>

<Bell
size={20}
className="text-teal-700"
/>


<span
className="
absolute
top-1
right-1
w-2
h-2
bg-red-500
rounded-full
"
/>

</button>





{/* PROFILE */}

<div
className="
flex
items-center
gap-2
px-2
py-1.5
rounded-xl
border
border-slate-100
shadow-sm
"
>


<div
className="
w-9
h-9
rounded-full
bg-gradient-to-r
from-teal-500
to-cyan-500
flex
items-center
justify-center
text-white
font-bold
text-sm
"
>

NP

</div>



<div>

<p
className="
font-semibold
text-sm
text-slate-800
"
>
Nurse Priya
</p>


<div
className="
flex
items-center
gap-1
"
>

<span
className="
w-2
h-2
bg-green-500
rounded-full
"
/>


<p
className="
text-[11px]
text-green-600
"
>
Online
</p>


</div>


</div>


</div>



</div>


</header>







{/* PAGE CONTENT */}

<main className="
p-8
">


<Outlet/>


</main>





</div>



</div>


)

}