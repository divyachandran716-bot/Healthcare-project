export default function ActivityCard(){


const activities=[

"New patient registered",

"Medical report uploaded",

"Appointment scheduled",

"Prescription updated"

];


return (

<div className="
bg-white
rounded-2xl
p-6
border
border-slate-200
">


<h3 className="
text-lg
font-semibold
mb-4
">

Recent Activities

</h3>


<div className="space-y-3">


{
activities.map((item,index)=>(

<div

key={index}

className="
p-3
bg-slate-50
rounded-xl
text-sm
"

>

✓ {item}

</div>

))

}


</div>


</div>

)

}