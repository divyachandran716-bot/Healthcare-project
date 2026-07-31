import {
  Search,
  Plus,
  HeartPulse,
  Thermometer,
  Activity,
  Droplets
} from "lucide-react";

import {
  useState,
  useEffect
} from "react";

import axios from "axios";


export default function VitalSigns(){

const [showModal,setShowModal] = useState(false);

const [vitalForm,setVitalForm] = useState({
  patient:"",
  bloodPressure:"",
  pulse:"",
  temperature:"",
  oxygenLevel:""
});
const [search,setSearch] = useState("");

const [vitalData,setVitalData] = useState([]);

const [loading,setLoading] = useState(true);




useEffect(()=>{

fetchVitals();

},[]);





const fetchVitals = async()=>{

try{


const token = localStorage.getItem("token");


const res = await axios.get(

"http://localhost:5000/api/vitals",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


setVitalData(
res.data.vitals || []
);


}

catch(error){

console.log(
"Vitals loading error:",
error
);

}

finally{

setLoading(false);

}


};






const filteredVitals = vitalData.filter((item)=>

item.patient?.name
?.toLowerCase()
.includes(
search.toLowerCase()
)

);





if(loading){

return(

<div className="
flex
justify-center
items-center
h-screen
text-xl
font-bold
">

Loading Vital Signs...

</div>

);

}


const addVital = async()=>{

try{

const token = localStorage.getItem("token");


const res = await axios.post(

"http://localhost:5000/api/vitals",

vitalForm,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


setVitalData([
res.data.vital,
...vitalData
]);


setShowModal(false);


setVitalForm({

patient:"",
bloodPressure:"",
pulse:"",
temperature:"",
oxygenLevel:""

});


alert("Vital added successfully");


}
catch(error){

console.log(
"Add vital error:",
error.response?.data
);

}

};


return(

<div className="
min-h-screen
bg-gradient-to-br
from-slate-100
via-cyan-50
to-blue-100
p-6
space-y-6
">


{/* HEADER */}

<div className="
flex
justify-between
items-center
">


<div>

<h1 className="
text-4xl
font-bold
text-slate-800
">

Vital Signs Monitoring ❤️‍🩹

</h1>


<p className="
text-slate-500
mt-2
">

Monitor patient health parameters and alerts

</p>


</div>


<button

onClick={()=>setShowModal(true)}

className="
bg-gradient-to-r
from-teal-600
to-cyan-600
text-white
px-6
py-3
rounded-2xl
flex
items-center
gap-2
shadow-lg
hover:scale-105
transition
"

>

<Plus size={20}/>

Add Vital

</button>


</div>

{/* SUMMARY CARDS */}


<div className="
grid
md:grid-cols-4
gap-6
">


<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-xl
p-6
hover:-translate-y-1
transition-all
duration-300
">

<div className="
flex
gap-4
items-center
">

<HeartPulse
size={40}
className="text-red-600"
/>


<div>

<p className="text-slate-500">

Pulse

</p>


<h2 className="
text-3xl
font-bold
">

{
vitalData[0]?.pulse || "-"
}
 bpm
</h2>
</div>
</div>
</div>

<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-xl
p-6
hover:-translate-y-1
transition-all
duration-300
">

<Activity
size={40}
className="text-blue-600"
/>

<p className="text-slate-500">

Blood Pressure

</p>

<h2 className="text-3xl font-bold">

{
vitalData[0]?.bloodPressure || "-"
}

</h2>
</div>

<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-xl
p-6
hover:-translate-y-1
transition-all
duration-300
">

<Thermometer
size={40}
className="text-orange-600"
/>

<p className="text-slate-500">

Temperature

</p>

<h2 className="text-3xl font-bold">

{
vitalData[0]?.temperature || "-"
}

°F

</h2>
</div>

<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-xl
p-6
hover:-translate-y-1
transition-all
duration-300
">

<Droplets
size={40}
className="text-cyan-600"
/>

<p className="text-slate-500">

Oxygen Level

</p>

<h2 className="text-3xl font-bold">

{
vitalData[0]?.oxygenLevel || "-"
}

%

</h2>
</div>
</div>

{/* SEARCH */}

<div className="
bg-white
rounded-2xl
p-4
shadow
flex
items-center
gap-3
">

<Search
className="text-teal-600"
/>

<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder="Search patient name..."

className="
outline-none
w-full
"
/>
</div>

{/* TABLE */}

<div className="
bg-white
rounded-3xl
shadow-lg
overflow-hidden
">

<table className="w-full">

<thead className="
bg-gradient-to-r
from-teal-600
to-cyan-600
text-white
">

<tr>

<th className="p-4 text-left">
Patient
</th>

<th className="p-4 text-left">
BP
</th>

<th className="p-4 text-left">
Pulse
</th>

<th className="p-4 text-left">
Temperature
</th>

<th className="p-4 text-left">
Oxygen
</th>

<th className="p-4 text-left">
Status
</th>
</tr>
</thead>

<tbody>

{
filteredVitals.map((item)=>(

<tr
key={item._id}
className="
hover:bg-cyan-50
transition-all
duration-300
"
>

<td className="
p-4
font-semibold
">

{
item.patient?.name || "Unknown"
}
</td>

<td className="p-4">

{
item.bloodPressure || "-"
}

</td>

<td className="p-4">

{
item.pulse || "-"
}

 bpm

</td>

<td className="p-4">

{
item.temperature || "-"
}

°F

</td>

<td className="p-4">

{
item.oxygenLevel || "-"
}

%

</td>

<td className="p-4">

<span

className={`

px-3
py-1
rounded-full
text-sm

${
item.oxygenLevel < 90

?

"bg-red-100 text-red-700"

:

item.oxygenLevel < 95

?

"bg-yellow-100 text-yellow-700"

:

"bg-green-100 text-green-700"

}

`}

>

{
item.oxygenLevel < 90

?

"Critical"

:

item.oxygenLevel < 95

?

"Monitoring"

:

"Normal"

}

</span>
</td>
</tr>
))
}
</tbody>
</table>
</div>
{
showModal && (

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
bg-white
rounded-3xl
p-8
w-[400px]
shadow-2xl
"
>

<h2 className="
text-2xl
font-bold
text-teal-700
mb-5
">

Add Vital Signs

</h2>


<input

placeholder="Patient ID"

className="
w-full
border
p-3
rounded-xl
mb-3
"

onChange={(e)=>

setVitalForm({
...vitalForm,
patient:e.target.value
})

}

/>



<input

placeholder="Blood Pressure"

className="
w-full
border
p-3
rounded-xl
mb-3
"

onChange={(e)=>

setVitalForm({
...vitalForm,
bloodPressure:e.target.value
})

}

/>



<input

placeholder="Pulse"

className="
w-full
border
p-3
rounded-xl
mb-3
"

onChange={(e)=>

setVitalForm({
...vitalForm,
pulse:e.target.value
})

}

/>



<input

placeholder="Temperature"

className="
w-full
border
p-3
rounded-xl
mb-3
"

onChange={(e)=>

setVitalForm({
...vitalForm,
temperature:e.target.value
})

}

/>



<input

placeholder="Oxygen Level"

className="
w-full
border
p-3
rounded-xl
mb-5
"

onChange={(e)=>

setVitalForm({
...vitalForm,
oxygenLevel:e.target.value
})

}

/>


<div className="
flex
gap-3
">


<button

onClick={addVital}

className="
bg-teal-600
text-white
px-5
py-2
rounded-xl
"

>

Save

</button>



<button

onClick={()=>setShowModal(false)}

className="
bg-gray-200
px-5
py-2
rounded-xl
"

>

Cancel

</button>


</div>


</div>

</div>

)
}
</div>
);
}