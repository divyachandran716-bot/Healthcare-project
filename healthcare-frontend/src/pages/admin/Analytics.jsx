import { useEffect, useState } from "react";
import axios from "axios";

import {
  Users,
  Stethoscope,
  CalendarDays,
  FileText,
  Pill,
  Brain,
  HeartPulse,
  Activity
} from "lucide-react";


import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";



export default function Analytics(){

const COLORS = [
"#14b8a6",
"#3b82f6",
"#8b5cf6",
"#f97316",
"#ef4444",
"#22c55e",
"#eab308"
];

const [dashboard,setDashboard]=useState({});

const [diseases,setDiseases]=useState([]);

const [aiInsight,setAIInsight]=useState(
"Generating healthcare insights..."
);


const [loading,setLoading]=useState(true);



const token =
localStorage.getItem("token");



const config={

headers:{
Authorization:`Bearer ${token}`
}

};





// ============================
// FETCH ANALYTICS
// ============================


const fetchAnalytics = async()=>{


try{


setLoading(true);



const dashboardResponse =
await axios.get(

"http://localhost:5000/api/analytics/dashboard",

config

);



const diseaseResponse =
await axios.get(

"http://localhost:5000/api/analytics/diseases",

config

);

console.log(
"Disease Response:",
diseaseResponse.data
);

console.log(
"Disease API:",
diseaseResponse.data
);



const data =
dashboardResponse.data.analytics ||
dashboardResponse.data;

console.log(
"Analytics Dashboard:",
data
);
setDashboard({

totalPatients:data.totalPatients || data.patients || 0,

totalDoctors:data.totalDoctors || data.doctors || 0,

totalAppointments:
data.totalAppointments || data.appointments || 0,


totalReports:
data.totalReports || data.reports || 0,


totalMedicines:
data.totalMedicines || data.medicines || 0,


recovery:
data.recovery || 0,


recovered:
data.recovered || 0,


underTreatment:
data.underTreatment || 0,


critical:
data.critical || 0,


// ADD THESE

pending:
data.pending || 0,

completed:
data.completed || 0,

cancelled:
data.cancelled || 0


});

const diseaseData =
diseaseResponse.data.diseases ||
diseaseResponse.data.data?.diseases ||
[];

setDiseases(

diseaseData.map(item=>({

name:
item.disease ||
item.diseaseName ||
item.name ||
item._id ||
"Unknown Disease",


value:
item.count ||
item.value ||
0


}))

);



// AI optional

try{


const aiResponse =
await axios.get(

"http://localhost:5000/api/analytics/ai",

config

);



setAIInsight(

aiResponse.data.insight ||

"No AI insights available"

);


}

catch{

setAIInsight(

"AI prediction service is currently unavailable."

);

}



}


catch(error){


console.log(
"Analytics Error",
error
);


}


finally{


setLoading(false);


}


};





useEffect(()=>{

fetchAnalytics();

},[]);






if(loading)

return (

<div className="
flex
justify-center
items-center
h-screen
text-xl
font-semibold
">

Loading Analytics...

</div>

);






const treatmentData=[


{
name:"Recovered",
value:dashboard.recovered || 0
},


{
name:"Treatment",
value:dashboard.underTreatment || 0
},


{
name:"Critical",
value:dashboard.critical || 0
}


];





const appointmentData=[


{
name:"Pending",
value:dashboard.pending || 0
},


{
name:"Completed",
value:dashboard.completed || 0
},


{
name:"Cancelled",
value:dashboard.cancelled || 0
}


];





return (

<div className="
p-6
bg-slate-100
min-h-screen
">





{/* HEADER */}


<div className="mb-6">


<h1 className="
text-3xl
font-bold
text-slate-800
">

Healthcare Analytics Dashboard

</h1>


<p className="
text-slate-500
">

Hospital performance monitoring and AI insights

</p>


</div>






{/* STAT CARDS */}


<div className="
grid
grid-cols-1
md:grid-cols-3
xl:grid-cols-6
gap-5
mb-8
">



<StatCard

title="Patients"

value={dashboard.totalPatients}

icon={<Users/>}

/>



<StatCard

title="Doctors"

value={dashboard.totalDoctors}

icon={<Stethoscope/>}

/>



<StatCard

title="Appointments"

value={dashboard.totalAppointments}

icon={<CalendarDays/>}

/>



<StatCard

title="Reports"

value={dashboard.totalReports}

icon={<FileText/>}

/>



<StatCard

title="Medicines"

value={dashboard.totalMedicines}

icon={<Pill/>}

/>



<StatCard

title="Recovery"

value={`${dashboard.recovery || 0}%`}

icon={<HeartPulse/>}

/>



</div>









<div className="
grid
lg:grid-cols-2
gap-6
">







{/* DISEASE CHART */}


<ChartCard title="Disease Distribution">


{

diseases.length===0 ?

<p className="text-gray-500">
No disease data available
</p>


:
<ResponsiveContainer
width="100%"
height={300}
>

<PieChart>

<Pie

data={diseases}

dataKey="value"

nameKey="name"

cx="50%"

cy="45%"

outerRadius={110}

innerRadius={50}

paddingAngle={3}

>

{

diseases.map(
(item,index)=>(

<Cell

key={index}

fill={
[
"#0ea5e9",
"#22c55e",
"#a855f7",
"#f97316",
"#ef4444",
"#eab308",
"#14b8a6"
][index % 7]
}

/>

)

)

}


</Pie>


<Tooltip/>


<Legend

verticalAlign="bottom"

height={60}

/>


</PieChart>

</ResponsiveContainer>

}


</ChartCard>










{/* TREATMENT */}


<ChartCard title="Treatment Outcome">


<ResponsiveContainer
width="100%"
height={350}
>


<PieChart>


<Pie

data={treatmentData}

dataKey="value"

nameKey="name"

outerRadius={100}

label

>


{

treatmentData.map(

(item,index)=>(

<Cell

key={index}

fill={COLORS[index % COLORS.length]}

/>

)

)

}


</Pie>


<Tooltip/>

<Legend/>


</PieChart>


</ResponsiveContainer>


</ChartCard>









{/* APPOINTMENTS */}


<ChartCard title="Appointment Status">


<ResponsiveContainer
width="100%"
height={300}
>


<BarChart

data={appointmentData}

>


<CartesianGrid/>


<XAxis

dataKey="name"

/>


<YAxis/>


<Tooltip/>


<Bar

dataKey="value"

/>


</BarChart>


</ResponsiveContainer>


</ChartCard>









{/* AI INSIGHT */}


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
gap-2
items-center
mb-4
">


<Brain
className="text-purple-600"
/>


AI Healthcare Insights


</h2>


<p className="
text-gray-700
leading-relaxed
">

{aiInsight}

</p>


</div>





</div>





</div>

);

}








function StatCard({

title,

value,

icon

}){


return (

<div className="
bg-white
rounded-2xl
shadow
p-5
hover:shadow-lg
transition
">


<div className="
flex
justify-between
items-center
">


<div>

<p className="
text-gray-500
">

{title}

</p>


<h2 className="
text-3xl
font-bold
text-slate-800
">

{value || 0}

</h2>


</div>


<div className="
bg-blue-100
text-blue-600
p-3
rounded-xl
">

{icon}

</div>


</div>


</div>

);

}








function ChartCard({

title,

children

}){


return (

<div className="
bg-white
rounded-2xl
shadow
p-6
">


<h2 className="
text-xl
font-bold
mb-4
">

{title}

</h2>


{children}


</div>

);


}