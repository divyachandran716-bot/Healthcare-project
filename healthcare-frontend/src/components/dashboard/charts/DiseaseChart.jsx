import {

BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer

}
from "recharts";


const data=[

{
name:"Diabetes",
count:120
},

{
name:"Heart",
count:80
},

{
name:"Cancer",
count:40
},

{
name:"Covid",
count:60
}

];


export default function DiseaseChart(){


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

Disease Distribution

</h2>


<ResponsiveContainer
width="100%"
height={280}
>


<BarChart data={data}>


<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>


<Bar

dataKey="count"

radius={[8,8,0,0]}

/>


</BarChart>


</ResponsiveContainer>


</div>


)

}