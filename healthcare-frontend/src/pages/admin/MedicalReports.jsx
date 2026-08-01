import { useEffect, useState } from "react";
import API from "../../api/axios";
import {
  FileText,
  Search,
  Eye,
  X,
  UserRound,
  Stethoscope,
  CalendarDays
} from "lucide-react";


export default function MedicalReports() {


const [reports,setReports] = useState([]);

const [search,setSearch] = useState("");

const [status,setStatus] = useState("All");

const [selectedReport,setSelectedReport] = useState(null);

// Fetch Reports

const fetchReports = async()=>{


try{


const response = await API.get(
  "/reports"
);


console.log(response.data);


setReports(
response.data.reports || response.data || []
);


}

catch(error){

console.log(
"Report fetch error",
error
);

}


};




useEffect(()=>{

fetchReports();

},[]);






// Search + Filter


const filteredReports = reports.filter((report)=>{


const patientName =
report.patient?.name || "";


const matchesSearch =
patientName
.toLowerCase()
.includes(
search.toLowerCase()
);



const matchesStatus =
status==="All"
||
report.status===status;



return matchesSearch && matchesStatus;


});






return (

<div className="p-6 bg-gray-100 min-h-screen">



{/* Header */}


<div className="mb-6">


<h1 className="
text-3xl
font-bold
text-gray-800
">

Medical Reports Management

</h1>


<p className="text-gray-500">

Manage patient diagnosis and medical documents

</p>


</div>







{/* Search Filter */}

<div className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
p-5
mb-6
flex
gap-4
flex-wrap
">


{/* Search */}

<div className="
flex
items-center
gap-3
border
border-slate-200
rounded-2xl
px-4
py-1
flex-1
min-w-[250px]
focus-within:ring-2
focus-within:ring-blue-200
">


<Search
size={20}
className="text-blue-600"
/>


<input

placeholder="Search patient..."

className="
p-3
outline-none
w-full
text-gray-700
"

value={search}

onChange={
e=>setSearch(e.target.value)
}

/>


</div>





{/* Status Filter */}

<select

className="
border
border-slate-200
rounded-2xl
px-5
py-3
outline-none
text-gray-700
focus:ring-2
focus:ring-blue-200
"

value={status}

onChange={
e=>setStatus(e.target.value)
}

>

<option value="All">
All Status
</option>

<option value="Pending">
Pending
</option>

<option value="Reviewed">
Reviewed
</option>

<option value="Approved">
Approved
</option>

<option value="Archived">
Archived
</option>


</select>


</div>







{/* Reports Grid */}


<div className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-6
">


{

filteredReports.length===0 &&

<div className="
bg-white
p-6
rounded-xl
">

No medical reports found

</div>

}



{

filteredReports.map((report)=>(


<div

key={report._id}

className="
bg-white
rounded-2xl
shadow
p-5
hover:shadow-lg
transition
"


>



<div className="
flex
justify-between
items-center
mb-4
">


<div className="
bg-blue-100
p-3
rounded-xl
">

<FileText
className="text-blue-600"
/>

</div>



<span className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
text-sm
">

{report.status || "Pending"}

</span>


</div>






<h2 className="text-xl font-bold mb-3">
{report.title || "Medical Report"}
</h2>






<div className="
space-y-2
text-gray-600
">


<p className="flex gap-2">

<UserRound size={18}/>

Patient:

{report.patient?.name || "Unknown"}

</p>



<p className="flex gap-2">

<Stethoscope size={18}/>

Doctor:

{report.doctor?.name || "Unknown"}

</p>




<p className="flex gap-2">

<CalendarDays size={18}/>

{

report.createdAt
?
new Date(
report.createdAt
).toLocaleDateString()
:
"N/A"

}

</p>



</div>








<button

onClick={()=>setSelectedReport(report)}

className="
mt-5
w-full
bg-blue-600
text-white
py-3
rounded-xl
flex
justify-center
items-center
gap-2
hover:bg-blue-700
"

>


<Eye size={18}/>

View Report


</button>




</div>


))

}


</div>









{/* View Modal */}



{

selectedReport &&


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
bg-white
rounded-2xl
p-6
w-[450px]
">


<div className="
flex
justify-between
mb-5
">


<h2 className="
text-xl
font-bold
">

Report Details

</h2>


<X

className="cursor-pointer"

onClick={()=>
setSelectedReport(null)
}

/>


</div>





<div className="space-y-3">


<p>
<b>Patient:</b>

{
selectedReport.patient?.name
}

</p>



<p>
<b>Doctor:</b>

{
selectedReport.doctor?.name
}

</p>




<p>
<b>Type:</b>

{
selectedReport.reportType
}

</p>




<p>
<b>Diagnosis:</b>

{
selectedReport.diagnosis ||
"No diagnosis"
}

</p>


<p>
<b>Symptoms:</b>

{
selectedReport.symptoms ||
"No symptoms"
}

</p>


<p>
<b>Treatment:</b>

{
selectedReport.treatment ||
"No treatment"
}

</p>


<p>
<b>Doctor Remarks:</b>

{
selectedReport.remarks ||
"No remarks"
}

</p>



<p>
<b>Status:</b>

{
selectedReport.status
||
"Pending"
}

</p>



</div>



<button

onClick={()=>
setSelectedReport(null)
}

className="
mt-6
bg-gray-800
text-white
px-5
py-2
rounded-xl
"

>

Close

</button>


</div>


</div>

}


</div>

);

}