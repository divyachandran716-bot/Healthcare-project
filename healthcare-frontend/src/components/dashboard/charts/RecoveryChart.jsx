import {

PieChart,
Pie,
Cell,
Tooltip,
ResponsiveContainer

}
from "recharts";


const data=[

{
name:"Recovered",
value:70
},

{
name:"Treatment",
value:20
},

{
name:"Critical",
value:10
}

];


export default function RecoveryChart(){


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

Patient Status

</h2>


<ResponsiveContainer
width="100%"
height={280}
>


<PieChart>

<Pie

data={data}

dataKey="value"

outerRadius={90}

label

>


{
data.map((entry,index)=>(

<Cell
key={index}
/>

))
}


</Pie>


<Tooltip/>


</PieChart>


</ResponsiveContainer>


</div>

)

}