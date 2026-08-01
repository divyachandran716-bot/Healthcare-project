import {
  CalendarDays,
  Search,
  Eye,
  Clock,
  UserRound,
  CheckCircle,
  AlertCircle
} from "lucide-react";

import {
  useState,
  useEffect
} from "react";

import API from "../../api/axios";
import toast from "react-hot-toast";

export default function Appointments(){

const [selectedAppointment,setSelectedAppointment] = useState(null);

const [appointments,setAppointments] = useState([]);

const [search,setSearch] = useState("");

const [loading,setLoading] = useState(true);

// FETCH APPOINTMENTS

useEffect(()=>{

const fetchAppointments = async()=>{

try{


const response = await API.get(
  "/appointments"
);

console.log(
"Appointments API:",
response.data
);

setAppointments(

response.data.appointments || []

);
}

catch(error){

console.log(
"Appointment Error:",
error.response?.data || error.message
);

toast.error(
"Unable to load appointments"
);
}

finally{

setLoading(false);

}
};

fetchAppointments();
},[]);

// SEARCH FILTER

const filteredAppointments = appointments.filter((appointment)=>{

const patientName =

appointment.patient?.name ||

appointment.patient ||

"";

return patientName

.toLowerCase()

.includes(

search.toLowerCase()

);
});

// STATS

const confirmed = appointments.filter(

appointment=>

appointment.status==="Confirmed"

).length;

const pending = appointments.filter(

appointment=>

appointment.status==="Pending"

).length;

const completed = appointments.filter(

appointment=>

appointment.status==="Completed"

).length;

// VIEW APPOINTMENT

const viewAppointment = (appointment)=>{
   setSelectedAppointment(appointment);
};

if(loading){

return(

<div className="
h-96
flex
items-center
justify-center
">

<div className="
animate-spin
rounded-full
h-12
w-12
border-b-4
border-teal-600
">
</div>
</div>
)
}

return(

<div className=" space-y-8 p-6 min-h-screen bg-gradient-to-br from-slate-100 via-teal-50 to-blue-100 ">

{/* HEADER */}

<div>

<h1 className=" text-4xl font-black text-slate-800 flex items-center gap-3 ">

<CalendarDays
className=" text-teal-600 drop-shadow " />

Appointments

</h1>

<p className="
text-slate-500
mt-2
">

Manage patient consultations and schedules

</p>
</div>

{/* SUMMARY CARDS */}

<div className="
grid
md:grid-cols-3
gap-6
">

<div className="
bg-white/90
backdrop-blur-xl
rounded-3xl
border
border-slate-200
shadow-xl
p-6
hover:-translate-y-1
transition
duration-300
">

<div className="
flex
items-center
gap-4
">

<div className="
bg-green-100
p-3
rounded-2xl
">

<CheckCircle
className="text-green-600"
size={35}
/>

</div>

<div>

<p className="
text-slate-500
">
Confirmed
</p>

<h2 className="
text-3xl
font-bold
">

{confirmed}

</h2>
</div>
</div>
</div>

<div className=" bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-xl p-6 hover:-translate-y-1 transition duration-300 ">

<div className="
flex
items-center
gap-4
">

<div className="
bg-yellow-100
p-3
rounded-2xl
">

<Clock
className="
text-yellow-600
"
size={35}
/>
</div>

<div>

<p className="
text-slate-500
">

Pending

</p>

<h2 className="
text-3xl
font-bold
">

{pending}

</h2>
</div>
</div>
</div>

<div className=" bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200 shadow-xl p-6 hover:-translate-y-1 transition duration-300 ">

<div className="
flex
items-center
gap-4
">

<div className="
bg-blue-100
p-3
rounded-2xl
">

<UserRound
className="
text-blue-600
"
size={35}
/>
</div>

<div>

<p className="
text-slate-500
">

Total Appointments

</p>

<h2 className="
text-3xl
font-bold
">

{appointments.length}

</h2>
</div>
</div>
</div>
</div>

{/* SEARCH */}

<div className=" bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl shadow-lg p-4 flex items-center gap-3 focus-within:ring-2 focus-within:ring-teal-300 ">

<Search
className="
text-slate-400
" />

<input
value={search}
onChange={(e)=>
setSearch(e.target.value)
}

placeholder="
Search patient appointment...
"
className="
w-full
outline-none
text-lg
" />
</div>

{/* TABLE */}

<div className=" bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl overflow-hidden shadow-xl ">

<div className="
overflow-x-auto
">

<table className="
w-full
">

<thead className=" bg-gradient-to-r from-teal-50 to-blue-50 text-slate-700 ">

<tr>

<th className="
p-4
text-left
">

Patient

</th>

<th className="
p-4
text-left
">

Date

</th>

<th className="
p-4
text-left
">

Time

</th>

<th className="
p-4
text-left
">

Type

</th>

<th className="
p-4
text-left
">

Status

</th>

<th className="
p-4
text-left
">

Action

</th>
</tr>
</thead>

<tbody>

{
filteredAppointments.length===0 ?

<tr>
<td
colSpan="6"
className="
p-10
text-center
text-slate-500
" >

No appointments found

</td>
</tr>

:

filteredAppointments.map((appointment)=>(

<tr

key={appointment._id}
className="
border-t
border-slate-100
hover:bg-teal-50/50
transition
" >

<td className="
p-4
font-semibold
">

{
appointment.patient?.name ||
appointment.patient ||
"Unknown Patient"
}
</td>

<td className="
p-4
">

{
appointment.date
?
new Date(
appointment.date
)
.toLocaleDateString()
:
"-"
}
</td>

<td className="
p-4
">

{
appointment.time ||
"-"
}
</td>

<td className="
p-4
">

{
appointment.type ||
"Consultation"
}
</td>

<td className="
p-4
">

<span

className={`
px-4
py-2
rounded-full
text-sm
font-semibold
shadow-sm

${
appointment.status==="Confirmed"
?
"bg-green-100 text-green-700"
:
appointment.status==="Completed"
?
"bg-blue-100 text-blue-700"
:
appointment.status==="Critical"
?
"bg-red-100 text-red-700"
:
"bg-yellow-100 text-yellow-700"
}
`}
>

{appointment.status}

</span>
</td>

<td className="
p-4
">

<button
onClick={()=>viewAppointment(appointment)}

className="
flex
items-center
gap-2
bg-teal-50
text-teal-700
px-4
py-2
rounded-xl
hover:bg-teal-100
transition
font-semibold
"
>

<Eye size={20}/>

View

</button>
</td>
</tr>
))
}
</tbody>
</table>
</div>
</div>

{
selectedAppointment && (

<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
">

<div className="
bg-white/95
backdrop-blur-xl
rounded-3xl
p-8
w-96
shadow-2xl
border
border-slate-200
">

<h2 className="
text-xl
font-bold
mb-4
">
Appointment Details
</h2>

<p>
<b>Patient:</b>{" "}
{selectedAppointment.patient?.name || "Unknown"}
</p>

<p>
<b>Date:</b>{" "}
{selectedAppointment.date || "-"}
</p>

<p>
<b>Time:</b>{" "}
{selectedAppointment.time || "-"}
</p>

<p>
<b>Status:</b>{" "}
{selectedAppointment.status}
</p>

<p>
<b>Type:</b>{" "}
{selectedAppointment.type || "Consultation"}
</p>

<button
onClick={()=>setSelectedAppointment(null)}
className="
mt-5
bg-gradient-to-r
from-teal-600
to-blue-600
text-white
px-5
py-3
rounded-xl
shadow-lg
hover:scale-105
transition
"
>

Close

</button>
</div>
</div>
)
}
</div>
);
}