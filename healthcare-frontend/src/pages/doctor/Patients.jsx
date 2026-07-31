import {
  Search,
  Eye,
  UserRound,
  Users,
  HeartPulse,
  AlertTriangle,
  Activity
} from "lucide-react";

import {
  useState,
  useEffect
} from "react";

import axios from "axios";

import {
  motion
} from "framer-motion";

import toast from "react-hot-toast";

export default function Patients(){

const [selectedPatient,setSelectedPatient] = useState(null);

const [patients,setPatients]=useState([]);

const [search,setSearch]=useState("");

const [loading,setLoading]=useState(true);

const filteredPatients =
patients.filter((patient)=>

patient.name
.toLowerCase()
.includes(
search.toLowerCase()
)
);

const viewPatient=(patient)=>{
setSelectedPatient(patient);
};

const critical =
patients.filter(
p =>
p.status?.toLowerCase() === "critical"
).length;

const recovering =
patients.filter(
p =>
[
"recovering",
"treatment",
"under treatment"
].includes(
p.status?.toLowerCase()
)
).length;

useEffect(()=>{

const fetchPatients = async()=>{

try{

const token = localStorage.getItem("token");

const res = await axios.get(
"http://localhost:5000/api/patients/doctor",

{
headers:{
Authorization:`Bearer ${token}`
}
}
);

console.log(
"Patients API:",
res.data
);

setPatients(
res.data.patients || res.data
);
}
catch(error){
console.log(
"PATIENT API ERROR:",
error.response?.data || error.message
);

toast.error(
error.response?.data?.message || 
"Unable to load patients"
);
}

finally{
setLoading(false);
}
};

fetchPatients();
},[]);

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

return (

<div className=" space-y-8 p-6 min-h-screen bg-gradient-to-br from-slate-100 via-teal-50 to-blue-100 ">

{/* HEADER */}

<motion.div

initial={{
opacity:0,
y:-20
}}

animate={{
opacity:1,
y:0
}}

className="
bg-gradient-to-r
from-teal-700
via-cyan-600
to-blue-600
rounded-3xl
p-8
text-white
shadow-xl
"
>

<div className="
flex
justify-between
items-center
">

<div>

<div className="
flex
items-center
gap-3
">

<UserRound size={35}/>

<h1 className="
text-4xl
font-black
">

My Patients

</h1>
</div>

<p className="
mt-3
text-cyan-100
">

Manage assigned patients and monitor health progress

</p>
</div>
</div>
</motion.div>

{/* STATS */}

<div className="
grid
md:grid-cols-3
gap-6
">

<div className="
bg-white/90
backdrop-blur-xl
rounded-3xl
p-6
shadow-xl
border
border-slate-200
flex
items-center
gap-5
hover:-translate-y-1
transition
duration-300
">

<div className="
bg-blue-100
p-4
rounded-full
">

<Users
className="text-blue-600"
/>
</div>
<div>

<p className="
text-slate-500
">

Total Patients

</p>

<h2 className="
text-3xl
font-black
">

{patients.length}

</h2>
</div>
</div>

<div className="
bg-white/90
backdrop-blur-xl
rounded-3xl
p-6
shadow-xl
border
border-slate-200
flex
items-center
gap-5
hover:-translate-y-1
transition
duration-300
">

<div className="
bg-red-100
p-4
rounded-full
">

<AlertTriangle
className="text-red-600"
/>
</div>

<div>

<p className="
text-slate-500
">

Critical Patients

</p>

<h2 className="
text-3xl
font-black
">

{critical}

</h2>
</div>
</div>

<div className="
bg-white/90
backdrop-blur-xl
rounded-3xl
p-6
shadow-xl
border
border-slate-200
flex
items-center
gap-5
hover:-translate-y-1
transition
duration-300
">

<div className="
bg-green-100
p-4
rounded-full
">

<HeartPulse
className="text-green-600"
/>
</div>

<div>
<p className="
text-slate-500
">

Recovering

</p>

<h2 className="
text-3xl
font-black
">

{recovering}

</h2>
</div>
</div>
</div>

{/* SEARCH */}

<div className="
bg-white/90
backdrop-blur-xl
rounded-3xl
shadow-xl
border
border-slate-200
p-5
flex
items-center
gap-4
focus-within:ring-2
focus-within:ring-teal-300
">

<Search
className="text-slate-400"
/>

<input
id="patientSearch"
name="patientSearch"
value={search}
onChange={(e)=>
setSearch(e.target.value)
}
placeholder="Search patient by name..."
className="
w-full
outline-none
text-lg
"
/>
</div>

{/* TABLE */}

<motion.div
initial={{
opacity:0
}}
animate={{
opacity:1
}}

className="
bg-white/90
backdrop-blur-xl
rounded-3xl
shadow-xl
overflow-hidden
border
border-slate-200
" >

<div className=" overflow-x-auto ">

<table className=" w-full ">

<thead className="
bg-gradient-to-r
from-teal-50
to-blue-50
text-slate-700
">

<tr>

<th className="
p-5
text-left
">
Patient
</th>

<th className="
p-5
text-left
">

Age

</th>

<th className="
p-5
text-left
">

Condition

</th>

<th className="
p-5
text-left
">

Status

</th>

<th className="
p-5
text-left
">

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
border-t
border-slate-100
hover:bg-teal-50/50
transition
" >

<td className="
p-5
flex
items-center
gap-4
">

<div className="
w-12
h-12
rounded-full
bg-gradient-to-br
bg-gradient-to-br
from-teal-500
via-cyan-500
to-blue-600
shadow-lg
text-white
flex
items-center
justify-center
font-bold
">

{
patient.name
.split(" ")
.map(x=>x[0])
.join("")
}

</div>

<div>

<h3 className="
font-bold
">

{patient.name}

</h3>

<p className="
text-sm
text-slate-500
">

{patient.gender}

</p>
</div>
</td>

<td className="p-5">

{patient.age}

</td>

<td className="p-5">

<div className="
flex
items-center
gap-2
">

<Activity
size={18}
className="text-teal-600"
/>

{patient.condition}
</div>
</td>

<td className="p-5">
<span
className={`
px-4
py-2
rounded-full
text-sm
font-semibold
shadow-sm

${
patient.status?.toLowerCase()==="critical"
?
"bg-red-100 text-red-700"
:
(
patient.status==="Recovering" ||
patient.status==="Treatment" ||
patient.status==="Under Treatment"
)
?
"bg-green-100 text-green-700"
:
patient.status==="Stable"
?
"bg-blue-100 text-blue-700"
:
"bg-yellow-100 text-yellow-700"
}
`}
>

{patient.status}
</span>
</td>

<td className="p-5">
<button
onClick={()=>
viewPatient(patient)
}
className="
flex
items-center
gap-2
text-teal-600
font-semibold
hover:text-teal-800
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
</motion.div>



{/* PATIENT DETAILS MODAL */}

{
selectedPatient && (

<div
className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
"
>


<div
className="
bg-white/95
backdrop-blur-xl
rounded-3xl
p-8
w-full
max-w-lg
shadow-2xl
border
border-slate-200
"
>

<div
className="
flex
justify-between
items-center
mb-6
"
>

<h2
className="
text-2xl
font-black
text-slate-800
"
>

Patient Details

</h2>



<button

onClick={()=>
setSelectedPatient(null)
}

className="
text-red-500
font-bold
text-xl
"
>

✕

</button>
</div>

<div className="
space-y-3
text-slate-700
">

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
<b>Disease:</b> 
{
selectedPatient.disease ||
selectedPatient.condition ||
"N/A"
}
</p>

<p>
<b>Status:</b> 
{selectedPatient.status}
</p>

<p>
<b>Blood Group:</b>
{
selectedPatient.bloodGroup ||
selectedPatient.blood ||
"N/A"
}
</p>

<p>
<b>Phone:</b>
{
selectedPatient.phone ||
"N/A"
}
</p>

<p>
<b>Medical Notes:</b>
{
selectedPatient.notes ||
"No notes"
}
</p>
</div>
</div>
</div>
)
}
</div>
);
}