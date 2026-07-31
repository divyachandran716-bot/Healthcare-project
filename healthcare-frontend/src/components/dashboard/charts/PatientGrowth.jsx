import {
LineChart,
Line,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer
}
from "recharts";


const data=[

{
month:"Jan",
patients:120
},

{
month:"Feb",
patients:180
},

{
month:"Mar",
patients:250
},

{
month:"Apr",
patients:320
},

{
month:"May",
patients:420
},

];


export default function PatientGrowth(){


return (

<div className="
bg-white
rounded-2xl
p-6
border
">


<h2 className="
text-lg
font-semibold
mb-5
">

Patient Growth

</h2>


<ResponsiveContainer
width="100%"
height={280}
>

<LineChart data={data}>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>


<Line

type="monotone"

dataKey="patients"

strokeWidth={3}

/>


</LineChart>


</ResponsiveContainer>


</div>

)

}