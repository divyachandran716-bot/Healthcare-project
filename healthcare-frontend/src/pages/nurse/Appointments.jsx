import {
  Search,
  CalendarDays,
  Clock,
  UserRound,
  Stethoscope
} from "lucide-react";

import {
  useState,
  useEffect
} from "react";

import axios from "axios";

export default function Appointments(){

const [search,setSearch]=useState("");

const [appointments,setAppointments]=useState([]);

const [loading,setLoading]=useState(true);

const [selectedAppointment,setSelectedAppointment]=useState(null);

// FETCH APPOINTMENTS

useEffect(()=>{

const fetchAppointments=async()=>{

try{

const token =
localStorage.getItem("token");

const res = await axios.get(

"http://localhost:5000/api/appointments",

{

headers:{
Authorization:`Bearer ${token}`
}
}
);

console.log(
"APPOINTMENTS:",
res.data
);

setAppointments(
res.data.appointments || []
);

setLoading(false);
}
catch(error){
console.log(
"FETCH APPOINTMENTS ERROR:",
error
);
setLoading(false);
}
};
fetchAppointments();
},[]);

// SEARCH

const filteredAppointments = appointments.filter((item)=>

item.patient?.name

?.toLowerCase()

.includes(

search.toLowerCase()

)
);

if(loading){

return (

<div className="
flex
justify-center
items-center
h-screen
">

Loading Appointments...

</div>
)
}

return (

<div className="space-y-8">

{/* HEADER */}

<div className="
bg-gradient-to-r
from-teal-600
to-cyan-500
rounded-3xl
p-8
text-white
shadow-lg
">

<h1 className="
text-4xl
font-bold
">

Nurse Appointment Management 📅

</h1>

<p className="
mt-3
text-teal-50
">

Monitor patient appointments, doctor schedules and treatment flow

</p>

</div>



{/* SUMMARY CARDS */}

<div className="
grid
md:grid-cols-4
gap-6
">


<div
className="
bg-white
rounded-3xl
shadow-lg
p-6
hover:shadow-xl
transition
hover:-translate-y-1
"
>

<div className="
flex
justify-between
">

<p className="text-slate-500">
Today's Appointments
</p>

<CalendarDays
className="text-teal-600"
/>

</div>


<h2 className="
text-4xl
font-bold
mt-4
">

{appointments.length}

</h2>
</div>

<div
className="
bg-white
rounded-3xl
shadow-lg
p-6
hover:shadow-xl
transition
hover:-translate-y-1
"
>
<div className="
flex
justify-between
">

<p className="text-slate-500">
Confirmed
</p>

<Clock
className="text-green-600"
/>

</div>


<h2 className="
text-4xl
font-bold
text-green-600
mt-4
">

{
appointments.filter(
a=>a.status==="Confirmed"
).length
}

</h2>
</div>

<div
className="
bg-white
rounded-3xl
shadow-lg
p-6
hover:shadow-xl
transition
hover:-translate-y-1
"
>

<div className="
flex
justify-between
">

<p className="text-slate-500">
Pending
</p>

<Clock
className="text-yellow-500"
/>

</div>


<h2 className="
text-4xl
font-bold
text-yellow-500
mt-4
">

{
appointments.filter(
a=>a.status==="Pending"
).length
}

</h2>
</div>

<div
className="
bg-white
rounded-3xl
shadow-lg
p-6
hover:shadow-xl
transition
hover:-translate-y-1
"
>

<div className="
flex
justify-between
">

<p className="text-slate-500">
Completed
</p>

<CalendarDays
className="text-blue-600"
/>

</div>


<h2 className="
text-4xl
font-bold
text-blue-600
mt-4
">

{
appointments.filter(
a=>a.status==="Completed"
).length
}

</h2>
</div>
</div>





{/* SEARCH */}

<div className="
bg-white/80
backdrop-blur-lg
rounded-2xl
shadow-lg
border
border-teal-100
p-5
flex
items-center
gap-4
">

<Search
className="
text-teal-600
"
/>


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="
Search patient name...
"

className="
w-full
outline-none
text-lg
"

/>
</div>

{/* APPOINTMENTS */}

<div className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-7
">
{
filteredAppointments.map((appointment)=>(
<div

key={appointment._id}

className="
bg-white
rounded-3xl
shadow-md
border
border-slate-100
p-6
hover:shadow-xl
transition
hover:-translate-y-1
"


>


<div className="
flex
justify-between
items-center
">


<div className="
flex
items-center
gap-4
">


<div className="
bg-teal-100
p-4
rounded-2xl
">

<CalendarDays
className="
text-teal-700
"
/>

</div>



<div>

<h2 className="
text-xl
font-bold
text-slate-800
">

{
appointment.patient?.name ||
"Unknown Patient"
}

</h2>


<p className="
text-slate-500
">

{
new Date(
appointment.date
).toLocaleDateString()
}

</p>


</div>


</div>




<span

className={`
px-4
py-1
rounded-full
text-sm
font-semibold

${
appointment.status==="Confirmed"

?
"bg-green-100 text-green-700"

:

appointment.status==="Pending"

?
"bg-yellow-100 text-yellow-700"

:
"bg-blue-100 text-blue-700"

}

`}

>

{appointment.status}

</span>


</div>





<div className="
mt-6
bg-slate-50
rounded-2xl
p-5
space-y-4
">


<div className="
flex
gap-3
items-center
">

<UserRound
size={20}
className="text-teal-600"
/>

<span>

{
appointment.patient?.name ||
"Unknown"
}

</span>


</div>




<div className="
flex
gap-3
items-center
">


<Stethoscope
size={20}
className="text-purple-600"
/>


<span>

{
appointment.doctor?.name ||
appointment.doctor ||
"Not Assigned"
}

</span>


</div>




<div className="
flex
gap-3
items-center
">


<Clock
size={20}
className="text-orange-500"
/>


<span>

{
appointment.time ||
"Not Available"
}

</span>


</div>




<div className="
text-sm
text-slate-500
">

Department :

<b>

{
appointment.doctor?.department ||
"General Medicine"
}

</b>

</div>



</div>





<button

onClick={()=>setSelectedAppointment(appointment)}

className="
mt-6
w-full
bg-gradient-to-r
from-teal-600
to-cyan-500
text-white
py-3
rounded-2xl
font-semibold
hover:scale-105
transition
"

>

View Appointment

</button>



</div>


))

}



</div>





{/* MODAL */}

{
selectedAppointment && (

<div className="
fixed
inset-0
bg-black/50
backdrop-blur-sm
flex
items-center
justify-center
z-50
">


<div className="
bg-white
rounded-3xl
p-8
w-[420px]
shadow-2xl
">


<h2 className="
text-3xl
font-bold
text-teal-700
mb-6
">

Appointment Details 📅

</h2>



<div className="
space-y-4
text-slate-700
">


<p>
<b>Patient:</b>
{" "}
{selectedAppointment.patient?.name}
</p>


<p>
<b>Doctor:</b>
{" "}
{
selectedAppointment.doctor?.name ||
selectedAppointment.doctor
}

</p>


<p>
<b>Date:</b>
{" "}
{
new Date(
selectedAppointment.date
)
.toLocaleDateString()
}

</p>


<p>
<b>Time:</b>
{" "}
{selectedAppointment.time}

</p>


<p>
<b>Status:</b>
{" "}
{selectedAppointment.status}

</p>


</div>




<button

onClick={()=>setSelectedAppointment(null)}

className="
mt-8
w-full
bg-slate-800
text-white
py-3
rounded-2xl
hover:bg-slate-900
"

>

Close

</button>



</div>


</div>

)

}


</div>

)
}