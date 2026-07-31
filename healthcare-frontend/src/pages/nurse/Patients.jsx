import {
  Search,
  Eye,
  HeartPulse
} from "lucide-react";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Patients(){

const [search, setSearch] = useState("");
const [patientsData, setPatientsData] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedPatient, setSelectedPatient] = useState(null);


useEffect(() => {

  fetchPatients();

}, []);




const fetchPatients = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/nurses/patients",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

        setPatientsData(res.data.patients);

}

catch(error){

console.log(
"Patient loading error:",
error
);

}

finally{

setLoading(false);

}


};

const filteredPatients =
patientsData.filter((patient)=>

patient.name
?.toLowerCase()
.includes(
search.toLowerCase()
)

);


const stablePatients =
patientsData.filter(
(patient)=>
patient.status==="Stable"
).length;


const criticalPatients =
patientsData.filter(
(patient)=>
patient.status==="Critical"
).length;

const icuPatients =
patientsData.filter(
(patient)=>
patient.status==="ICU" ||
patient.status==="Critical"
).length;

if (loading) {
  return (
<div className="
flex
justify-center
items-center
h-screen
">

Loading Patients...

</div>

);

}



return (

<div className="
min-h-screen
space-y-6
bg-gradient-to-br
from-slate-100
via-cyan-50
to-blue-100
p-6
">

{/* Header */}

<div>

<div className="flex justify-between items-center">

    <div>
        <h1 className="text-4xl font-bold text-slate-800">
            Patient Care Management
        </h1>

        <p className="text-slate-500 mt-2">
            Monitor assigned patients and vital health data
        </p>
    </div>

  <div className="
bg-gradient-to-r
from-teal-600
to-cyan-600
text-white
px-6
py-4
rounded-3xl
shadow-xl
flex
items-center
gap-3
">

<div>

<p className="
text-sm
opacity-80
">
ICU Ward
</p>

<h2 className="
text-2xl
font-bold
">

{icuPatients}

</h2>
</div>

<div className="
bg-white/20
rounded-full
p-3
">

<HeartPulse
size={28}
/>
</div>
</div>
</div>
</div>

{/* Summary Cards */}

<div className="
grid
md:grid-cols-3
gap-6
">

{/* Stable Patients */}

<div className="
bg-white/80
backdrop-blur-xl
border
border-green-200
rounded-3xl
shadow-lg
p-6
hover:-translate-y-1
transition
">

<div className="
flex
items-center
gap-4
">

<HeartPulse
size={40}
className="text-green-600"
/>

<div>

<p className="
text-slate-500
font-medium
">
Stable Patients
</p>

<h2 className="
text-4xl
font-bold
text-green-600
">
{stablePatients}
</h2>
</div>
</div>
</div>

{/* Critical Patients */}

<div className="
bg-white/80
backdrop-blur-xl
border
border-red-200
rounded-3xl
shadow-lg
p-6
hover:-translate-y-1
transition
">

<div>

<p className="
text-slate-500
font-medium
">
Critical Patients
</p>

<h2 className="
text-4xl
font-bold
text-red-600
">
{criticalPatients}
</h2>

<p className="
text-sm
text-red-400
mt-2
">
Require immediate monitoring
</p>
</div>
</div>

{/* Total Assigned */}

<div className="
bg-white/80
backdrop-blur-xl
border
border-blue-200
rounded-3xl
shadow-lg
p-6
hover:-translate-y-1
transition
">

<div>

<p className="
text-slate-500
font-medium
">
Total Assigned
</p>

<h2 className="
text-4xl
font-bold
text-blue-600
">
{patientsData.length}
</h2>

<p className="
text-sm
text-slate-400
mt-2
">
Patients under care
</p>
</div>
</div>
</div>

{/* Search Patient */}

<div className="
bg-white/80
backdrop-blur-xl
border
border-white/50
rounded-3xl
p-5
shadow-lg
flex
items-center
gap-4
">

<Search
size={24}
className="text-teal-600"
/>

<input
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
placeholder="Search patient by name..."
className="
flex-1
bg-transparent
outline-none
text-slate-700
placeholder:text-slate-400
text-lg
"
/>

{
search && (

<button
onClick={()=>setSearch("")}
className="
text-sm
bg-slate-100
px-4
py-2
rounded-xl
hover:bg-slate-200
"
>
Clear
</button>
)
}
</div>

{/* Patient Table */}

<div className="
bg-white/90
backdrop-blur-xl
rounded-3xl
overflow-hidden
shadow-xl
">
<table className="
w-full
">

<thead className="
bg-gradient-to-r
from-teal-600
to-cyan-600
text-white
">

<tr>

<th className="p-4 text-left">
Name
</th>

<th className="p-4 text-left">
Age
</th>

<th className="p-4 text-left">
Disease
</th>

<th className="p-4 text-left">
Priority
</th>

<th className="p-4 text-left">
Vitals
</th>

<th className="p-4 text-left">
Action
</th>
</tr>
</thead>

<tbody>

{
filteredPatients.map((patient)=>(

<tr
key={patient._id}
className="
hover:bg-cyan-50
transition-all
duration-300
"
>

<td className="
p-4
font-semibold
text-slate-700
">
{patient.name}
</td>

<td className="
p-4
">
{patient.age}
</td>

<td className="
p-4
">
{patient.disease}
</td>

{/* Priority */}

<td className="
p-4
">

<span
className={`
px-3
py-1
rounded-full
text-sm
font-medium

${
patient.status==="Critical"
?
"bg-red-100 text-red-700"
:
patient.status==="Treatment"
?
"bg-yellow-100 text-yellow-700"
:
"bg-green-100 text-green-700"
}
`}
>

{
patient.status==="Critical"
?
"High"
:
patient.status==="Treatment"
?
"Medium"
:
"Low"
}

</span>
</td>

{/* Vitals */}

<td className="
p-4
">

<span
className={`
px-3
py-1
rounded-full
text-sm
font-medium

${
patient.status==="Critical"
?
"bg-red-100 text-red-700"
:
patient.status==="Treatment"
?
"bg-orange-100 text-orange-700"
:
"bg-green-100 text-green-700"
}
`}
>

{
patient.status==="Critical"
?
"Critical"
:
patient.status==="Treatment"
?
"Monitoring"
:
"Stable"
}
</span>
</td>

{/* View Button */}

<td className="
p-4
">

<button
onClick={() =>
setSelectedPatient(patient)
}
className="
bg-teal-100
text-teal-700
p-2
rounded-xl
hover:bg-teal-200
transition
"
>

<Eye size={20}/>
</button>
</td>
</tr>
))
}
</tbody>
</table>
</div>

{
selectedPatient && (

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
bg-white
rounded-3xl
p-8
w-96
shadow-2xl
">

<div className="
flex
justify-between
items-center
mb-5
">

<h2 className="
text-2xl
font-bold
text-slate-800
">
Patient Details
</h2>

<button
onClick={()=>
setSelectedPatient(null)
}
className="
text-red-500
font-bold
"
>
✕
</button>
</div>

<p>
<b>Name:</b> {selectedPatient.name}
</p>

<p>
<b>Age:</b> {selectedPatient.age}
</p>

<p>
<b>Gender:</b> {selectedPatient.gender}
</p>

<p>
<b>Disease:</b> {selectedPatient.disease}
</p>

<p>
<b>Status:</b> {selectedPatient.status}
</p>

<p>
<b>Condition:</b> {selectedPatient.condition}
</p>
</div>
</div>
)
}
</div>
)
}