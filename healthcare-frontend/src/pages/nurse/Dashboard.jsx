import {
  Users,
  HeartPulse,
  Activity,
  FileText,
  Clock,
  AlertTriangle,
  ArrowRight,
  Stethoscope
} from "lucide-react";

import {
  useNavigate
} from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard(){

  const navigate = useNavigate();

const [dashboard,setDashboard] = useState({

assignedPatients:0,

vitalChecks:0,

nursingNotes:0,

medications:0,

appointments:0,

reports:0,

criticalPatients:0

});

const [patients, setPatients] = useState([]);

const [nurse,setNurse] = useState({
  name:"",
  department:"",
  availability:""
});

const [loading,setLoading] = useState(true);

useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const dashboardRes = await axios.get(
        "http://localhost:5000/api/nurses/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(dashboardRes.data.dashboard);
setNurse(
  dashboardRes.data.nurse || {
    name:"",
    department:"",
    availability:""
  }
);

      const patientRes = await axios.get(
        "http://localhost:5000/api/nurses/patients",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPatients(patientRes.data.patients);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);

if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      Loading...
    </div>
  );
}

const stats = [
  {
    title: "Assigned Patients",
    value: dashboard.assignedPatients,
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Vital Checks",
    value: dashboard.vitalChecks,
    icon: HeartPulse,
    color: "text-red-600",
  },
  {
    title: "Nursing Notes",
    value: dashboard.nursingNotes,
    icon: FileText,
    color: "text-purple-600",
  },
  {
    title: "Medications",
    value: dashboard.medications,
    icon: Activity,
    color: "text-green-600",
  },
];

return (

<div className="
min-h-screen
space-y-8
bg-gradient-to-br
from-slate-100
via-cyan-50
to-blue-100
p-8
">

{/* Header */}

<div className="
flex
justify-between
items-center
">

<div>

<h1 className="text-4xl font-bold text-slate-800">
Welcome Back 👋
</h1>

<p className="text-slate-500 mt-2">
Delivering quality patient care with confidence.
</p>

<p className="text-slate-500 mt-1">
Patient care and nursing activities overview
</p>
</div>

<div className="
bg-teal-600
text-white
px-5
py-3
rounded-xl
flex
items-center
gap-2
">

<Stethoscope size={22}/>
Staff Nurse
</div>
</div>

{/* Nurse Profile */}

<div className="
bg-gradient-to-r
from-teal-600
to-cyan-600
text-white
shadow-xl
rounded-3xl
border
p-6
flex
items-center
gap-5
">

<div className="
w-16
h-16
rounded-full
bg-teal-100
flex
items-center
justify-center
font-bold
text-teal-700
text-xl
">

👩‍⚕️
</div>


<div>

<h2 className="text-xl font-bold">
{nurse.name}
</h2>

<p className="text-white/80">
{nurse.department}
</p>

<p className="
text-green-200
text-sm
mt-1
">
● {nurse.availability || "Available"}
</p>
</div>
</div>

{/* Statistics Cards */}

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
bg-white/80
backdrop-blur-xl
shadow-xl
rounded-3xl
border
border-slate-200
p-6
hover:-translate-y-2
hover:shadow-2xl
transition-all
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

<div className="
w-14
h-14
rounded-2xl
bg-slate-100
flex
items-center
justify-center
">

<item.icon
size={28}
className={item.color}
/>
</div>
</div>
</div>
))
}
</div>

{/* Care Monitoring */}

<div className="
grid
md:grid-cols-2
gap-6
">


{/* Patient Care Status */}

<div className="
bg-white/90
backdrop-blur-xl
rounded-3xl
p-6
shadow-xl
hover:shadow-2xl
transition
">


<h2 className="
text-xl
font-bold
mb-5
text-slate-800
">
Patient Care Status
</h2>


<div className="space-y-5">


{/* Stable */}

<div>

<div className="
flex
justify-between
text-slate-600
font-medium
">

<span>
Stable Patients
</span>

<span>
70%
</span>

</div>


<div className="
h-3
bg-green-100
rounded-full
overflow-hidden
mt-2
">

<div className="
h-3
bg-gradient-to-r
from-green-400
to-green-600
rounded-full
w-[70%]
">
</div>

</div>

</div>



{/* Monitoring */}

<div>

<div className="
flex
justify-between
text-slate-600
font-medium
">

<span>
Monitoring
</span>

<span>
20%
</span>

</div>


<div className="
h-3
bg-yellow-100
rounded-full
overflow-hidden
mt-2
">

<div className="
h-3
bg-gradient-to-r
from-yellow-400
to-yellow-600
rounded-full
w-[20%]
">
</div>

</div>

</div>




{/* Critical */}

<div>

<div className="
flex
justify-between
text-slate-600
font-medium
">

<span>
Critical
</span>

<span>
10%
</span>

</div>


<div className="
h-3
bg-red-100
rounded-full
overflow-hidden
mt-2
">

<div className="
h-3
bg-gradient-to-r
from-red-400
to-red-600
rounded-full
w-[10%]
">
</div>

</div>

</div>


</div>

</div>





{/* Today's Tasks */}


<div className="
bg-white/90
backdrop-blur-xl
rounded-3xl
p-6
shadow-xl
hover:shadow-2xl
transition
">


<h2 className="
text-xl
font-bold
flex
items-center
gap-2
mb-5
text-slate-800
">


<Clock
className="text-teal-600"
/>


Today's Tasks


</h2>



<div className="space-y-4">



<div className="
bg-blue-50
rounded-2xl
p-4
flex
justify-between
items-center
shadow-sm
">


<span className="font-medium text-slate-700">
08:30 AM - Check Vitals
</span>


<span className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
text-sm
font-semibold
">

Done

</span>


</div>





<div className="
bg-slate-50
rounded-2xl
p-4
flex
justify-between
items-center
shadow-sm
">


<span className="font-medium text-slate-700">
10:00 AM - Medication Round
</span>


<span className="
bg-yellow-100
text-yellow-700
px-3
py-1
rounded-full
text-sm
font-semibold
">

Pending

</span>


</div>


</div>


</div>


</div>

{/* Emergency Alert */}

<div className="
bg-gradient-to-r
from-red-600
to-pink-600
text-white
shadow-xl
rounded-3xl
border
border-red-200
rounded-2xl
p-6
">

<div className="
flex
gap-3
items-center
">

<AlertTriangle
className="text-white"
/>

<h2 className="
text-xl
font-bold
">
Emergency Alerts
</h2>
</div>

<p className="
text-white/90
mt-3
">

{dashboard.criticalPatients} patients require immediate monitoring
</p>
</div>

{/* Quick Actions */}

<div className="
bg-teal-600
rounded-2xl
p-6
text-white
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
onClick={()=>navigate("/nurse/patients")}
className="
bg-white
text-teal-700
rounded-2xl
p-4
flex
justify-between
items-center
"
>
Patients
<ArrowRight/>
</button>

<button
onClick={()=>navigate("/nurse/vitals")}
className="
bg-white
text-teal-700
rounded-xl
p-4
flex
justify-between
items-center
"
>
Vital Signs
<ArrowRight/>
</button>

<button
onClick={()=>navigate("/nurse/notes")}
className="
bg-white
text-teal-700
rounded-xl
p-4
flex
justify-between
items-center
"
>
Nursing Notes
<ArrowRight/>
</button>
</div>
</div>

{/* Recent Patients */}

<div className="
bg-white/90
backdrop-blur-xl
rounded-3xl
shadow-xl
overflow-hidden
">


<h2 className="
text-xl
font-bold
p-6
text-slate-800
">
Recent Patients
</h2>



<table className="
w-full
">


<thead className="
bg-gradient-to-r
from-teal-50
to-blue-50
">


<tr>

<th className="
p-4
text-left
text-slate-600
font-semibold
">
Name
</th>


<th className="
p-4
text-left
text-slate-600
font-semibold
">
Condition
</th>


<th className="
p-4
text-left
text-slate-600
font-semibold
">
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
hover:bg-cyan-50
transition
"

>


<td className="
p-4
font-medium
text-slate-700
">

{patient.name}

</td>



<td className="
p-4
text-slate-600
">

{patient.condition}

</td>




<td className="
p-4
">


<span

className={`

px-4
py-1
rounded-full
text-sm
font-semibold


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