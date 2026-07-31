import {
  Search,
  Eye,
  Pill,
  UserRound,
  FileText
} from "lucide-react";

import {
  useState,
  useEffect
} from "react";

import axios from "axios";

import toast from "react-hot-toast";

export default function Prescriptions(){

const [search,setSearch]=useState("");

const [selectedPrescription,setSelectedPrescription] = useState(null);

const [prescriptions,setPrescriptions]=useState([]);

const [loading,setLoading]=useState(true);

const filteredPrescriptions = prescriptions.filter((item)=>{

const patientName =
item.patient?.name || "";

return patientName
.toLowerCase()
.includes(
search.toLowerCase()
);
});

const viewPrescription=(item)=>{
setSelectedPrescription(item);
};

useEffect(()=>{

const fetchPrescriptions = async()=>{

try{

const token = localStorage.getItem("token");

const response = await axios.get(

"http://localhost:5000/api/prescriptions",

{

headers:{
Authorization:`Bearer ${token}`
}
}
);

console.log(
"Prescription API:",
response.data
);

setPrescriptions(
response.data.prescriptions || []
);
}
catch(error){

console.log(
"Prescription Error:",
error.response?.data
);

toast.error(
"Unable to load prescriptions"
);
}

finally{
setLoading(false);
}
};

fetchPrescriptions();
},[]);

return (

<div className="
space-y-8
p-6
min-h-screen
bg-gradient-to-br
from-slate-100
via-teal-50
to-blue-100
">

{/* Header */}

<div>

<h1 className="
text-3xl
font-bold
text-slate-800
flex
items-center
gap-3
">

<div className="
bg-teal-100
p-3
rounded-2xl
">

<Pill
className="text-teal-600"
size={30}
/>
</div>

Prescriptions

</h1>

<p className="
text-slate-500
mt-2
">

Create and manage patient medications

</p>
</div>

{/* Summary Cards */}

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
gap-3
items-center
">

<div className="
bg-blue-100
p-3
rounded-2xl
">

<FileText
className="text-blue-600"
size={30}
/>

</div>

<div>

<p className="text-gray-500">
Total Prescriptions
</p>

<h2 className="text-3xl font-bold">
{prescriptions.length}
</h2>
</div>
</div>
</div>

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
gap-3
items-center
">

<div className="
bg-green-100
p-3
rounded-2xl
">

<Pill
className="text-green-600"
size={30}
/>

</div>

<div>

<p className="text-gray-500">
Active Medicines
</p>

<h2 className="
text-3xl
font-bold
">

{
prescriptions.filter(
item=>item.status==="Active"
).length
}
</h2>
</div>
</div>
</div>

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
gap-3
items-center
">

<div className="
bg-purple-100
p-3
rounded-2xl
">

<UserRound
className="text-purple-600"
size={30}
/>
</div>

<div>

<p className="text-gray-500">
Patients
</p>

<h2 className="
text-3xl
font-bold
">

{
new Set(
prescriptions.map(
item=>item.patient?._id
)
).size
}
</h2>
</div>
</div>
</div>
</div>

{/* Search */}

<div className="
bg-white/90
backdrop-blur-xl
border
border-slate-200
rounded-3xl
shadow-lg
p-4
flex
items-center
gap-3
focus-within:ring-2
focus-within:ring-teal-300
">

<Search
className="text-gray-400"
/>

<input
value={search}
onChange={(e)=>
setSearch(e.target.value)
}

placeholder="Search patient prescription..."
className="
w-full
outline-none
"
/>
</div>

{/* Prescription Table */}

<div className="
bg-white/90
backdrop-blur-xl
rounded-3xl
border
border-slate-200
shadow-xl
overflow-hidden
">

<table className="
w-full
">

<thead className="
bg-gradient-to-r
from-teal-50
to-blue-50
text-slate-700
">

<tr>

<th className="p-4 text-left">
Patient
</th>

<th className="p-4 text-left">
Medicine
</th>

<th className="p-4 text-left">
Dosage
</th>

<th className="p-4 text-left">
Duration
</th>

<th className="p-4 text-left">
Status
</th>

<th className="p-4 text-left">
Action
</th>
</tr>
</thead>

<tbody>

{
filteredPrescriptions.map((item)=>(

<tr
key={item.id}

className="
border-t
border-slate-100
hover:bg-teal-50/50
transition
"
>

<td className="
p-4
font-medium
">

{item.patient?.name || "Unknown"}
</td>

<td className="p-4">

{item.medicine}

</td>

<td className="p-4">

{item.dosage}

</td>

<td className="p-4">

{item.duration}

</td>

<td className="p-4">

<span
className={`
px-4
py-2
rounded-full
text-sm
font-semibold
shadow-sm

${
item.status==="Active"
?
"bg-green-100 text-green-700"
:
"bg-blue-100 text-blue-700"
}
`}
>

{item.status}

</span>
</td>

<td className="p-4">

<button
onClick={()=>viewPrescription(item)}
className="
bg-teal-50
text-teal-700
p-2
rounded-xl
hover:bg-teal-100
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
selectedPrescription && (

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

Prescription Details

</h2>

<p>
<b>Patient:</b>{" "}
{
selectedPrescription.patient?.name
}
</p>

<p>
<b>Medicine:</b>{" "}
{
selectedPrescription.medicine
}
</p>

<p>
<b>Dosage:</b>{" "}
{
selectedPrescription.dosage
}
</p>

<p>
<b>Duration:</b>{" "}
{
selectedPrescription.duration
}
</p>

<p>
<b>Status:</b>{" "}
{
selectedPrescription.status
}
</p>

<button
onClick={()=>setSelectedPrescription(null)}
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