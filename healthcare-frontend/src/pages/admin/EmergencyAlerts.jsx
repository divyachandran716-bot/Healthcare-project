import { useEffect, useState } from "react";
import API from "../../api/axios";
import {
  AlertTriangle,
  Siren,
  UserRound,
  Clock,
  CheckCircle,
  Plus,
  X
} from "lucide-react";


export default function EmergencyAlerts(){


const [alerts,setAlerts] = useState([]);

const [showModal,setShowModal] = useState(false);




const [form,setForm] = useState({

patient:"",
alertType:"",
condition:"",
priority:"Critical",
description:""

});





const config={

headers:{
Authorization:`Bearer ${token}`
}

};






// Fetch Alerts


const fetchAlerts = async()=>{


try{


const response = await API.get(
  "/emergency-alerts"
);


console.log(response.data);


setAlerts(

response.data.alerts ||
response.data ||
[]

);



}

catch(error){

console.log(
"Emergency alert error",
error
);

}


};





useEffect(()=>{

fetchAlerts();

},[]);








// Create Alert


const createAlert = async(e)=>{


e.preventDefault();


try{


await API.post(
  "/emergency-alerts",
  form
);


setShowModal(false);


setForm({

patient:"",
alertType:"",
condition:"",
priority:"Critical",
description:""

});


fetchAlerts();


}

catch(error){

console.log(error);

}


};









// Resolve Alert


const resolveAlert = async(id)=>{


try{


await API.put(
  `/emergency-alerts/${id}`,
  {
    status:"Resolved"
  }
);


fetchAlerts();


}

catch(error){

console.log(error);

}


};







const critical =
alerts.filter(
a=>a.priority==="Critical"
).length;


const active =
alerts.filter(
a=>a.status!=="Resolved"
).length;



const resolved =
alerts.filter(
a=>a.status==="Resolved"
).length;








const priorityStyle=(priority)=>{


if(priority==="Critical")

return "bg-red-100 text-red-700";


if(priority==="High")

return "bg-orange-100 text-orange-700";


if(priority==="Medium")

return "bg-yellow-100 text-yellow-700";


return "bg-green-100 text-green-700";


};






return (

<div className="
min-h-screen
p-6
bg-gradient-to-br
from-slate-100
via-red-50
to-orange-100
">


{/* Header */}


<div className="
flex
justify-between
items-center
mb-6
">


<div>


<h1 className="
text-4xl
font-extrabold
text-gray-800
flex
gap-3
items-center
">

<div className="
bg-red-100
p-3
rounded-2xl
">

<Siren
size={32}
className="text-red-600"
/>

</div>

Emergency Alert System

</h1>


<p className="text-gray-500">

Monitor critical patient situations

</p>


</div>




<button

onClick={()=>setShowModal(true)}

className="
bg-gradient-to-r
from-red-600
to-orange-500
text-white
px-6
py-3
rounded-2xl
flex
gap-2
items-center
shadow-lg
hover:scale-105
transition
"

>

<Plus/>

Create Alert

</button>



</div>








{/* Statistics */}



<div className="
grid
md:grid-cols-3
gap-5
mb-6
">



<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
border
border-white
shadow-xl
p-5
hover:-translate-y-1
transition
">


<h3 className="text-gray-500">

Active Alerts

</h3>


<p className="
text-3xl
font-bold
text-red-600
">

{active}

</p>


</div>





<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
border
border-white
shadow-xl
p-5
hover:-translate-y-1
transition
">


<h3 className="text-gray-500">

Critical Cases

</h3>


<p className="
text-3xl
font-bold
">

{critical}

</p>


</div>






<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
border
border-white
shadow-xl
p-5
hover:-translate-y-1
transition
">


<h3 className="text-gray-500">

Resolved Alerts

</h3>


<p className="
text-3xl
font-bold
text-green-600
">

{resolved}

</p>


</div>



</div>









{/* Alert Cards */}



<div className="
grid
lg:grid-cols-2
gap-6
">



{

alerts.length===0 &&

<div className="
bg-white
p-6
rounded-xl
">

No emergency alerts available

</div>

}





{

alerts.map(alert=>(


<div

key={alert._id}

className="
bg-white/90
backdrop-blur-xl
rounded-3xl
border
border-red-200
shadow-xl
p-5
hover:shadow-2xl
hover:-translate-y-1
transition
"

>


<div className="
flex
justify-between
items-center
">


<div className="
flex
gap-3
items-center
">


<div className="
bg-gradient-to-br
from-red-500
to-orange-500
p-3
rounded-2xl
shadow-lg
">

<AlertTriangle
className="text-white"
/>

</div>



<div>


<h2 className="
font-bold
text-xl
">

{
alert.alertType ||
"Emergency Alert"
}

</h2>


<p className="text-gray-500">

{
alert.patient?.name ||
"Unknown Patient"
}

</p>


</div>


</div>





<span className={`
px-3
py-1
rounded-full
${priorityStyle(alert.priority)}
`}>

{
alert.priority
||
"Critical"
}

</span>



</div>







<div className="
mt-5
space-y-3
text-gray-700
">


<p className="flex gap-2">

<UserRound size={18}/>

Condition:

{
alert.condition
}


</p>



<p className="flex gap-2">

<Clock size={18}/>

{

alert.createdAt
?
new Date(
alert.createdAt
).toLocaleString()
:
"N/A"

}


</p>



<p>

Description:

{alert.description}

</p>


</div>







{

alert.status!=="Resolved" &&

<button

onClick={()=>
resolveAlert(alert._id)
}

className="
mt-5
bg-gradient-to-r
from-green-600
to-emerald-500
text-white
px-5
py-3
rounded-2xl
flex
gap-2
items-center
shadow-lg
hover:scale-105
transition
"

>

<CheckCircle size={18}/>

Mark Resolved

</button>


}



</div>


))


}



</div>










{/* Create Alert Modal */}



{

showModal &&


<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
">


<form

onSubmit={createAlert}

className="
bg-white
rounded-3xl
p-7
w-[95%]
max-w-lg
space-y-4
shadow-2xl
"
>


<div className="
flex
justify-between
">


<h2 className="text-xl font-bold">

Create Emergency Alert

</h2>


<X

className="cursor-pointer"

onClick={()=>
setShowModal(false)
}

/>


</div>





{
[
"patient",
"alertType",
"condition",
"description"
].map(field=>(


<input

key={field}

placeholder={field}

className="
border
border-slate-200
rounded-2xl
p-3
w-full
outline-none
focus:ring-2
focus:ring-red-200
"

value={form[field]}

onChange={
e=>
setForm({

...form,

[field]:e.target.value

})

}


/>


))

}






<select

className="
border
rounded-lg
p-3
w-full
"

value={form.priority}

onChange={
e=>
setForm({

...form,

priority:e.target.value

})
}

>

<option>
Critical
</option>

<option>
High
</option>

<option>
Medium
</option>


</select>





<button

className="
bg-red-600
text-white
w-full
py-3
rounded-xl
"

>

Create Alert

</button>



</form>


</div>


}




</div>

);

}