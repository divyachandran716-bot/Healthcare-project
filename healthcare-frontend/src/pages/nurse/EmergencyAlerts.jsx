import {
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserRound
} from "lucide-react";

import {
  useState,
  useEffect
} from "react";

import API from "../../api/axios";
export default function EmergencyAlerts(){

const [alerts,setAlerts] = useState([]);

const [search,setSearch] = useState("");

const [loading,setLoading] = useState(true);

// FETCH EMERGENCY ALERTS

useEffect(()=>{

const fetchAlerts = async()=>{

try{


const res = await API.get(
  "/emergency-alerts"
);

console.log(
"ALERT DATA:",
res.data
);

setAlerts(
res.data.alerts || []
);
setLoading(false);
}
catch(error){

console.log(
"FETCH ALERT ERROR:",
error
);
setLoading(false);
}
};
fetchAlerts();
},[]);

// SEARCH

const filteredAlerts = alerts.filter((alert)=>
alert.patient?.name
?.toLowerCase()
.includes(
search.toLowerCase()
)
);

// RESOLVE ALERT

const markHandled = async(id)=>{
try{

const token =
localStorage.getItem("token");
await API.put(
  `/emergency-alerts/${id}`,
  {}
);

setAlerts(
alerts.map((alert)=>
alert._id===id
?
{
...alert,
status:"Resolved"
}
:
alert
)
);
}
catch(error){
console.log(
"UPDATE ERROR:",
error
);
}
};

if(loading){

return (

<div className="
flex
justify-center
items-center
h-screen
">
Loading Alerts...
</div>
)
}

return (

<div
className="
min-h-screen
bg-gradient-to-br
from-slate-100
via-cyan-50
to-blue-100
p-6
space-y-6
"
>
{/* HEADER */}

<div>

<h1 className="
text-3xl
font-bold
text-slate-800
">
Emergency Alerts 🚨
</h1>

<p className="
text-slate-500
mt-2
">
Monitor critical situations and emergency responses
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
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-xl
p-6
hover:-translate-y-1
transition-all
duration-300
"
>

<p className="text-slate-500">
Total Alerts
</p>

<h2 className="
text-3xl
font-bold
">
{alerts.length}
</h2>
</div>

<div
className="
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-xl
p-6
hover:-translate-y-1
transition-all
duration-300
"
>

<p className="text-slate-500">
Critical
</p>

<h2 className="
text-3xl
font-bold
text-red-600
">
{
alerts.filter(
(a)=>a.severity==="Critical"
).length
}
</h2>
</div>

<div
className="
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-xl
p-6
hover:-translate-y-1
transition-all
duration-300
"
>

<p className="text-slate-500">
Active
</p>

<h2 className="
text-3xl
font-bold
text-yellow-600
">
{
alerts.filter(
(a)=>a.status==="Active"
).length
}
</h2>
</div>

<div
className="
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-xl
p-6
hover:-translate-y-1
transition-all
duration-300
"
>
<p className="text-slate-500">
Resolved
</p>

<h2 className="
text-3xl
font-bold
text-green-600
">

{

alerts.filter(
(a)=>a.status==="Resolved"
).length
}
</h2>
</div>
</div>

{/* SEARCH */}

<div
className="
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-lg
p-4
flex
items-center
gap-4
"
>

<div
className="
w-10
h-10
rounded-xl
bg-red-100
flex
items-center
justify-center
"
>

<Search
size={22}
className="text-red-600"
/>

</div>


<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder="Search patient alert..."

className="
flex-1
bg-transparent
outline-none
text-slate-700
"

/>

</div>

{/* ALERT CARDS */}

{/* ALERT CARDS */}

<div
className="
grid
md:grid-cols-2
gap-6
"
>

{
filteredAlerts.map((alert)=>(

<div
key={alert._id}

className="
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-lg
p-6
hover:shadow-2xl
transition
duration-300
"
>

{/* Header */}

<div
className="
flex
justify-between
items-start
mb-4
"
>

<div>

<h2
className="
text-xl
font-bold
text-slate-800
"
>

{
alert.patient?.name || "Unknown Patient"
}

</h2>


<p
className="
text-sm
text-slate-500
mt-1
"
>

{
new Date(alert.createdAt)
.toLocaleDateString()
}

</p>

</div>


<span
className={`

px-3
py-1
rounded-full
text-sm
font-medium

${
alert.severity==="Critical"

?

"bg-red-100 text-red-700"

:

alert.severity==="High"

?

"bg-orange-100 text-orange-700"

:

"bg-yellow-100 text-yellow-700"

}

`}
>

{alert.severity}

</span>


</div>



{/* Alert Message */}

<div
className="
bg-red-50
rounded-2xl
p-4
"
>

<p
className="
text-slate-700
font-medium
"
>

{alert.message}

</p>


</div>



{/* Bottom Info */}

<div
className="
mt-4
flex
justify-between
items-center
text-sm
text-slate-500
"
>


<div
className="
flex
items-center
gap-2
"
>

<Clock size={16}/>

{

new Date(alert.createdAt)
.toLocaleTimeString()

}

</div>


<span
className={`

px-3
py-1
rounded-full

${
alert.status==="Resolved"

?

"bg-green-100 text-green-700"

:

"bg-yellow-100 text-yellow-700"

}

`}
>

{alert.status}

</span>


</div>



{/* Button */}

{
alert.status==="Active" &&

<button

onClick={()=>markHandled(alert._id)}

className="
mt-4
w-full
bg-gradient-to-r
from-teal-600
to-cyan-600
text-white
py-2
rounded-xl
hover:scale-105
transition
"

>

<CheckCircle
size={18}
className="inline mr-2"
/>

Mark Handled

</button>

}


</div>


))

}

</div>
</div>
)
}