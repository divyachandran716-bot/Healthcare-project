import {
  Users,
  CalendarDays,
  FileText,
  Pill,
  Clock,
  ArrowRight,
  Stethoscope,
  AlertTriangle
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

import {
useState,
useEffect
} from "react";

import API from "../../api/axios";
import toast from "react-hot-toast";

export default function Dashboard(){

const navigate = useNavigate();

const [dashboard,setDashboard]=useState({
patients:0,
appointments:0,
reports:0,
prescriptions:0
});

const [appointments,setAppointments]=useState([]);

const [patients,setPatients]=useState([]);

const [doctor,setDoctor]=useState(null);

const [loading,setLoading]=useState(true);

const critical =patients.filter(
p=>p.status==="Critical"
).length;

const recovered =patients.filter(
p=>p.status==="Recovered"
).length;

const treatment =patients.filter(
p=>p.status==="Treatment" ||
p.status==="Under Treatment"
).length;

const stats=[
{
title:"Total Patients",
value:dashboard.patients,
icon:Users,
color:"text-blue-600"
},

{
title:"Appointments",
value:dashboard.appointments,
icon:CalendarDays,
color:"text-green-600"
},

{
title:"Prescriptions",
value:dashboard.prescriptions,
icon:Pill,
color:"text-purple-600"
},

{
title:"Medical Reports",
value:9,
icon:FileText,
color:"text-orange-600"
}
];

useEffect(()=>{

const fetchDashboard=async()=>{

try{

// const token = localStorage.getItem("token");

// logged-in doctor profile

const profile =
await API.get(
"/doctors/profile"
);

setDoctor(
profile.data.doctor
);

// dashboard counts

const dash =
await API.get(
"/doctors/dashboard"
);

setDashboard(
dash.data.dashboard
);

const appointmentRes =
await API.get(
"/appointments"
);

setAppointments(
appointmentRes.data.appointments || []
);

// doctor patients

const patientRes =
await API.get(
"/patients/doctor"
);

setPatients(
patientRes.data.patients || []
);
}

catch(error){
console.log(
"Dashboard Error:",
error
);

console.log(
"Response:",
error.response?.data
);

console.log(
"Status:",
error.response?.status
);

toast.error(
error.response?.data?.message ||
"Unable to load dashboard"
);
}

finally{
setLoading(false);
}
};

fetchDashboard();
},[]);

const todayAppointments =appointments.filter(app=>{

const today =
new Date()
.toISOString()
.slice(0,10);

return (
app.appointmentDate?.slice(0,10)
=== today
);
});

return (

<div className="space-y-8 p-6 min-h-screen bg-gradient-to-br from-slate-100 via-teal-50 to-blue-100 ">

{/* Header */}

<div className="flex justify-between items-center ">

<div>

<h1 className=" text-3xl font-bold text-slate-800 ">

Good Morning, Dr. Rajesh Kumar 👨‍⚕️

</h1>

<p className=" text-slate-500 mt-2 ">

Healthcare overview and patient management

</p>
</div>

<div className=" bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg ">

<Stethoscope size={22}/>

General Physician

</div>
</div>

{/* Doctor Profile */}

<div className=" bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-xl p-6 flex items-center gap-5 hover:shadow-2xl transition ">

<div className="
w-16
h-16
rounded-full
bg-gradient-to-br
from-teal-500
to-blue-600
text-white
shadow-lg
flex
items-center
justify-center
text-teal-700
font-bold
text-xl
">

DR

</div>

<div>
<h2 className="text-xl font-bold">
Rajesh Kumar
</h2>
<p className="text-slate-500">
{doctor?.qualification || "MBBS"} | {doctor?.department || doctor?.specialization}
</p>

<p className="
text-green-600
text-sm
mt-1
">

● Available Today

</p>
</div>
</div>

{/* Statistics */}

<div className="
grid
md:grid-cols-4
gap-6
">

{
stats.map((item)=>(

<div
key={item.title}
className="
bg-white/90
backdrop-blur-xl
rounded-3xl
border
border-slate-200
shadow-lg
p-6
hover:-translate-y-1
hover:shadow-xl
transition
duration-300
"
>

<div className="
flex
justify-between
items-center
">

<div>

<p className="
text-slate-500
">

{item.title}

</p>

<h2 className="
text-3xl
font-bold
mt-2
">

{item.value}

</h2>
</div>

<item.icon
size={35}
className={item.color}
/>
</div>
</div>
))
}
</div>

{/* Analytics + Schedule */}

<div className="
grid
md:grid-cols-2
gap-6
">

{/* Recovery */}

<div className="
bg-white/90
backdrop-blur-xl
rounded-3xl
border
border-slate-200
shadow-xl
p-6
">

<h2 className="
text-xl
font-bold
mb-5
">

Patient Recovery

</h2>

<div className="space-y-5">

<div>

<div className="
flex
justify-between
">

<span>
Recovered
</span>

<span>
{
patients.length
?
Math.round(
(recovered/patients.length)*100
)
:
0
}%
</span>
</div>

<div className="
h-3
bg-green-100
rounded-full
">

<div
className="
h-3
bg-green-500
rounded-full
"

style={{
width:`${
patients.length
?
Math.round(
(recovered/patients.length)*100
)
:
0
}%`
}}
/>
</div>
</div>

<div>

<div className="
flex
justify-between
">

<span>
Under Treatment
</span>

<span>
{
patients.length
?
Math.round(
(treatment/patients.length)*100
)
:
0
}%</span>
</div>

<div className="
h-3
bg-yellow-100
rounded-full
">

<div
className="
h-3
bg-yellow-500
rounded-full
transition-all
duration-500
"
style={{
width:`${
patients.length
?
Math.round(
(treatment / patients.length) * 100
)
:
0
}%`
}}
>
</div>
</div>
</div>

<div>

<div className="
flex
justify-between
">

<span>
Critical
</span>

<span>
{
patients.length
?
Math.round(
(critical/patients.length)*100
)
:
0
}%
</span>
</div>

<div className="
h-3
bg-red-100
rounded-full
">

<div
className="
h-3
bg-red-500
rounded-full
transition-all
duration-500
"
style={{
width:`${
patients.length
?
Math.round(
(critical / patients.length) * 100
)
:
0
}%`
}}
>
</div>
</div>
</div>
</div>
</div>

{/* Schedule */}

<div className="
bg-white/90
rounded-3xl
border
border-slate-200
shadow-xl
p-6
">

<h2 className="
text-xl
font-bold
mb-5
flex
gap-2
items-center
">

<Clock/>

Today's Schedule

</h2>

<div className="space-y-4">

{
todayAppointments.length===0 ?

<p className="text-gray-500">
No appointments today
</p>

:

todayAppointments.map(app=>(

<div

key={app._id}

className="
bg-gradient-to-r
from-teal-50
to-white
border
border-teal-100
p-4
rounded-2xl
hover:shadow-md
transition
flex
justify-between
"
>

<span>

{app.time} - {app.patient?.name}

</span>

<span className="
text-green-600
">

{app.status}

</span>
</div>
))
}
</div>
</div>
</div>

{/* Emergency Alert */}

<div className="
bg-gradient-to-r
from-red-50
to-orange-50
border
border-red-200
rounded-3xl
p-6
shadow-lg
">

<div className="
flex
gap-3
items-center
">

<AlertTriangle
className="text-red-600"
/>

<h2 className="
text-xl
font-bold
">

Emergency Alerts

</h2>
</div>

<p className="
text-red-700
mt-3
">

{critical}

Critical patient requires attention

</p>
</div>

{/* Quick Actions */}

<div className="
bg-gradient-to-r
from-teal-600
via-cyan-600
to-blue-600
rounded-3xl
p-6
text-white
shadow-xl
">

<h2 className="
text-xl
font-bold
mb-5
">

Quick Actions

</h2>

<div className="
grid
md:grid-cols-3
gap-4
">

<button
onClick={()=>navigate("/doctor/patients")}
className="
bg-white
text-teal-700
p-4
rounded-2xl
hover:scale-105
transition
shadow-md
flex
justify-between
items-center
"
>

Patients

<ArrowRight/>
</button>

<button
onClick={()=>navigate("/doctor/appointments")}
className="
bg-white
text-teal-700
p-4
rounded-xl
flex
justify-between
items-center
"
>

Appointments

<ArrowRight/>
</button>

<button
onClick={()=>navigate("/doctor/reports")}
className="
bg-white
text-teal-700
p-4
rounded-xl
flex
justify-between
items-center
"
>

Reports

<ArrowRight/>
</button>
</div>
</div>

{/* Recent Patients */}

<div className="
bg-white/90
backdrop-blur-xl
rounded-3xl
border
border-slate-200
shadow-xl
overflow-hidden
">

<h2 className="
text-xl
font-bold
p-6
">

Recent Patients

</h2>

<table className="w-full">

<thead className="
bg-gradient-to-r
from-teal-50
to-blue-50">

<tr>

<th className="p-4 text-left">
Name
</th>

<th className="p-4 text-left">
Condition
</th>

<th className="p-4 text-left">
Status
</th>
</tr>
</thead>

<tbody>

{
patients.map((patient)=>(

<tr
key={patient.name}
className="
border-t
border-slate-100
hover:bg-slate-50
transition
">

<td className="p-4">
{patient.name}
</td>

<td className="p-4">
{patient.condition}
</td>

<td className="p-4">

<span
className={`
px-3
py-1
rounded-full
text-sm

${
patient.status==="Critical"

?
"bg-red-100 text-red-700"

:

patient.status==="Recovering"

?
"bg-yellow-100 text-yellow-700"

:

"bg-green-100 text-green-700"

}
`}
>

{patient.status}

</span>
</td>
</tr>
))
}
</tbody>
</table>
</div>
</div>
);
}