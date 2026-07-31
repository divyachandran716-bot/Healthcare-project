import {
Bell,
UserCircle,
Activity
} from "lucide-react";


export default function Navbar(){


return (

<header

className="
h-20
bg-white/80
backdrop-blur-xl
border-b
border-slate-200
flex
items-center
justify-between
px-8
shadow-sm
"

>


{/* Logo */}

<div className="
flex
items-center
gap-3
">


<div className="
bg-gradient-to-br
from-teal-500
to-blue-600
p-2.5
rounded-2xl
shadow-md
">


<Activity

size={24}

className="text-white"

/>


</div>




<div>


<h2 className="
text-xl
font-extrabold
bg-gradient-to-r
from-teal-600
to-blue-600
bg-clip-text
text-transparent
">

Healthcare Analytics

</h2>


<p className="
text-xs
text-slate-500
">

AI Powered Hospital Management

</p>


</div>


</div>





{/* Right Section */}


<div className="
flex
items-center
gap-6
">





{/* Notification */}


<div className="
relative
cursor-pointer
">


<Bell

size={24}

className="
text-slate-600
hover:text-teal-600
transition
"

/>


<span className="
absolute
-top-1
-right-2
bg-red-500
text-white
text-xs
w-5
h-5
rounded-full
flex
items-center
justify-center
">

3

</span>


</div>








{/* User */}


<div className="
flex
items-center
gap-3
bg-slate-50
px-4
py-2
rounded-2xl
border
border-slate-200
">


<UserCircle

size={40}

className="
text-teal-600
"

/>



<div>


<p className="
font-bold
text-slate-700
">

Admin

</p>


<p className="
text-xs
text-slate-500
">

Administrator

</p>


</div>


</div>





</div>



</header>


)

}