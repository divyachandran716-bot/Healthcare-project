import { useEffect, useState } from "react";

import {
  Users,
  Stethoscope,
  UserRound,
  CalendarDays,
  FileText,
  Pill,
  Brain,
  Siren,
  Plus,
  Activity,
  ArrowRight,
    Receipt
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import API from "../../api/axios";


export default function Dashboard(){


const navigate = useNavigate();

const config={

headers:{
Authorization:`Bearer ${token}`
}

};



const [loading,setLoading]=useState(true);


const [stats,setStats]=useState({

patients:0,
doctors:0,
nurses:0,
appointments:0,
reports:0,
medicines:0,
bills:0,
emergency:0

});



const [aiInsight,setAIInsight]=useState(
"Loading AI insights..."
);



const [activities,setActivities]=useState([]);



const fetchDashboard = async()=>{


try{


const response =
await API.get(
"/analytics/dashboard",
config
);


console.log(
"Full Dashboard Response:",
response.data
);


const data =
response.data.analytics;



console.log(
"Dashboard Data:",
data
);



setStats({

patients:data.totalPatients || 0,

doctors:data.totalDoctors || 0,

nurses:data.totalNurses || 0,

appointments:data.totalAppointments || 0,

reports:data.totalReports || 0,

medicines:data.totalMedicines || 0,

bills:data.totalBills || 0,

emergency:data.activeEmergency || 0

});



}

catch(error){


console.log(
"Dashboard Error:",
error.response?.data || error.message
);


}

finally{

setLoading(false);

}


};







const fetchAI = async()=>{


try{


const response =
await API.get(
"/analytics/ai",
config
);



console.log(
"AI Response:",
response.data
);



setAIInsight(

response.data.insight ||

"AI insights unavailable"

);


}

catch(error){


console.log(
"AI Error:",
error.response?.data || error.message
);


setAIInsight(
"AI service unavailable"
);


}


};









useEffect(()=>{


if(!token){

navigate("/");

return;

}


fetchDashboard();

fetchAI();


},[]);









const cards=[


{
title:"Patients",
value:stats.patients,
icon:<Users size={28}/>,
color:"bg-blue-100 text-blue-700",
path:"/admin/patients"
},


{
title:"Doctors",
value:stats.doctors,
icon:<Stethoscope size={28}/>,
color:"bg-green-100 text-green-700",
path:"/admin/doctors"
},



{
title:"Nurses",
value:stats.nurses,
icon:<UserRound size={28}/>,
color:"bg-purple-100 text-purple-700",
path:"/admin/nurses"
},



{
title:"Appointments",
value:stats.appointments,
icon:<CalendarDays size={28}/>,
color:"bg-orange-100 text-orange-700",
path:"/admin/appointments"
},



{
title:"Reports",
value:stats.reports,
icon:<FileText size={28}/>,
color:"bg-indigo-100 text-indigo-700",
path:"/admin/reports"
},

{
title:"Medicines",
value:stats.medicines,
icon:<Pill size={28}/>,
color:"bg-pink-100 text-pink-700",
path:"/admin/pharmacy"
},

// {
// title:"Pharmacy Bills",
// value:stats.bills,
// icon:<Receipt size={28}/>,
// color:"bg-yellow-100 text-yellow-700",
// path:"/admin/pharmacy-billing"
// }


];

const quickActions=[


{
name:"Add Patient",
path:"/admin/patients",
icon:<Plus/>
},


{
name:"Schedule Appointment",
path:"/admin/appointments",
icon:<CalendarDays/>
},


{
name:"AI Insights",
path:"/admin/ai-insights",
icon:<Brain/>
},


{
name:"Emergency Alerts",
path:"/admin/emergency-alerts",
icon:<Siren/>
}


];










return (

<div className="
min-h-screen
bg-slate-50
p-6
">





{/* HEADER */}


<div className="mb-8">


<h1 className="
text-3xl
font-bold
text-slate-800
">

Welcome Admin 👋

</h1>


<p className="
text-slate-500
mt-2
">

Healthcare Management Dashboard

</p>


</div>










{/* STAT CARDS */}



{

loading ?


<div className="
bg-white
rounded-xl
p-10
text-center
shadow
">

Loading Dashboard...

</div>


:


<div className="
grid
sm:grid-cols-2
xl:grid-cols-6
gap-5
mb-8
">


{

cards.map(card=>(


<div

key={card.title}

onClick={()=>
navigate(card.path)
}

className="
bg-white
border
border-slate-100
rounded-2xl
p-5
cursor-pointer
transition
hover:-translate-y-1
hover:shadow-xl
"


>


<div className="
flex
justify-between
items-center
">


<div>


<p className="
text-gray-500
">

{card.title}

</p>



<h2 className="
text-3xl
font-bold
mt-2
">

{card.value}

</h2>



</div>





<div className={`
p-3
rounded-xl
${card.color}
`}>

{card.icon}

</div>




</div>


</div>


))


}


</div>


}









{/* MAIN GRID */}



<div className="
grid
lg:grid-cols-3
gap-6
">







{/* QUICK ACTIONS */}


<div className="
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="
text-xl
font-bold
mb-5
">

Quick Actions

</h2>



<div className="space-y-3">


{

quickActions.map(action=>(


<button

key={action.name}

onClick={()=>
navigate(action.path)
}


className="
w-full
flex
items-center
justify-between
p-4
rounded-xl
bg-slate-100
hover:bg-teal-100
transition
"


>


<div className="
flex
items-center
gap-3
">

{action.icon}

{action.name}

</div>



<ArrowRight size={18}/>


</button>


))


}


</div>


</div>









{/* AI CARD */}



<div className="
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="
text-xl
font-bold
flex
items-center
gap-2
mb-5
">


<Brain
className="text-purple-600"
/>


AI Healthcare Insight


</h2>




<p className="
text-gray-600
leading-relaxed
">

{aiInsight}

</p>



<button

onClick={()=>
navigate("/admin/ai-insights")
}

className="
mt-5
bg-purple-600
text-white
px-5
py-2
rounded-xl
hover:bg-purple-700
"

>

View AI

</button>


</div>










{/* EMERGENCY CARD */}



<div className="
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="
text-xl
font-bold
flex
items-center
gap-2
mb-5
">


<Siren
className="text-red-600"
/>


Emergency Status


</h2>




<div className="
text-5xl
font-bold
text-red-600
animate-pulse
">

{stats.emergency}

</div>




<p className="
text-gray-500
mt-2
">

Active Emergency Alerts

</p>



<button

onClick={()=>
navigate("/admin/emergency-alerts")
}

className="
mt-5
bg-red-600
text-white
px-5
py-2
rounded-xl
hover:bg-red-700
"

>

Manage Alerts

</button>


</div>




</div>









{/* RECENT ACTIVITIES */}



<div className="
mt-6
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="
text-xl
font-bold
flex
gap-2
items-center
mb-5
">


<Activity/>


Recent Activities


</h2>




{

activities.length===0 ?


<p className="
text-gray-500
">

No recent activities

</p>


:


activities.map(
(item,index)=>(


<p

key={index}

className="
border-b
py-3
"

>

✓ {item}

</p>


)


)


}



</div>







</div>


);


}