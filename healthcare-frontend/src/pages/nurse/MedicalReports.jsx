import {
  Search,
  FileText,
  Eye,
  Download,
  UserRound,
  Stethoscope,
  CalendarDays
} from "lucide-react";


import {
  useState,
  useEffect
} from "react";


import axios from "axios";



export default function MedicalReports(){


const [reportsData,setReportsData]=useState([]);

const [search,setSearch]=useState("");

const [selectedReport,setSelectedReport]=useState(null);

const [loading,setLoading]=useState(true);





// =============================
// FETCH MEDICAL REPORTS
// =============================


useEffect(()=>{


const fetchReports=async()=>{


try{


const token =
localStorage.getItem("token");



const res = await axios.get(

"http://localhost:5000/api/medical-reports",

{

headers:{
Authorization:
`Bearer ${token}`
}

}

);



console.log(
"MEDICAL REPORTS:",
res.data
);



setReportsData(
res.data.reports || []
);



setLoading(false);


}
catch(error){


console.log(
"REPORT FETCH ERROR",
error
);


setLoading(false);


}


};


fetchReports();


},[]);








// =============================
// SEARCH
// =============================


const filteredReports =

reportsData.filter((report)=>


report.patient?.name

?.toLowerCase()

.includes(

search.toLowerCase()

)

);









// =============================
// DOWNLOAD REPORT
// =============================


const downloadReport=(report)=>{


const content = `

Medical Report


Patient:
${report.patient?.name}


Doctor:
${report.doctor?.name}


Report Title:
${report.title}


Report Type:
${report.reportType}


Diagnosis:
${report.diagnosis}


Treatment:
${report.treatment || "N/A"}


Date:
${new Date(report.date).toLocaleDateString()}


Status:
${report.status}


Remarks:
${report.remarks || "N/A"}

`;



const blob = new Blob(

[content],

{
type:"text/plain"
}

);



const url =
URL.createObjectURL(blob);



const link =
document.createElement("a");



link.href=url;



link.download =

`${report.patient?.name}_Medical_Report.txt`;



document.body.appendChild(link);


link.click();


document.body.removeChild(link);



URL.revokeObjectURL(url);


};








if(loading){


return (

<div className="
flex
justify-center
items-center
h-screen
text-xl
font-semibold
">

Loading Medical Reports...

</div>

)

}







return (

<div className="space-y-8">





{/* HEADER */}


<div className="
bg-gradient-to-r
from-teal-600
to-cyan-500
rounded-3xl
p-8
text-white
shadow-lg
">


<h1 className="
text-4xl
font-bold
">

Medical Reports 📄

</h1>


<p className="
mt-3
text-teal-50
">

View and manage patient medical records

</p>


</div>









{/* SUMMARY CARDS */}


<div className="
grid
md:grid-cols-4
gap-6
">


<div className="
bg-white
rounded-3xl
shadow-lg
border
border-slate-100
p-6
">


<p className="text-slate-500">

Total Reports

</p>


<h2 className="
text-4xl
font-bold
mt-3
">

{reportsData.length}

</h2>


</div>





<div className="
bg-white
rounded-3xl
shadow-lg
border
border-slate-100
p-6
">


<p className="text-slate-500">

Reviewed

</p>


<h2 className="
text-4xl
font-bold
text-green-600
mt-3
">


{
reportsData.filter(
r=>r.status==="Reviewed"
).length
}


</h2>


</div>






<div className="
bg-white
rounded-3xl
shadow-lg
border
border-slate-100
p-6
">


<p className="text-slate-500">

Pending

</p>


<h2 className="
text-4xl
font-bold
text-yellow-600
mt-3
">


{
reportsData.filter(
r=>r.status==="Pending"
).length
}


</h2>


</div>






<div className="
bg-white
rounded-3xl
shadow-lg
border
border-slate-100
p-6
">


<p className="text-slate-500">

Completed

</p>


<h2 className="
text-4xl
font-bold
text-blue-600
mt-3
">


{
reportsData.filter(
r=>r.status==="Completed"
).length
}


</h2>


</div>


</div>









{/* SEARCH */}


<div className="
bg-white
rounded-2xl
shadow-md
border
border-slate-100
p-5
flex
items-center
gap-4
">


<Search
className="text-teal-600"
/>


<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder="
Search patient reports...
"

className="
outline-none
w-full
text-lg
"

/>


</div>









{/* TABLE */}


<div className="
bg-white
rounded-3xl
shadow-lg
border
border-slate-100
overflow-hidden
">


<table className="
w-full
">


<thead className="
bg-teal-50
">


<tr>


<th className="p-4 text-left">
Patient
</th>


<th className="p-4 text-left">
Doctor
</th>


<th className="p-4 text-left">
Report
</th>


<th className="p-4 text-left">
Date
</th>


<th className="p-4 text-left">
Status
</th>


<th className="p-4 text-left">
Action
</th>


</tr>


</thead>





<tbody>


{

filteredReports.map((report)=>(


<tr

key={report._id}

className="
border-b
border-slate-100
hover:bg-teal-50/40
transition
"

>


<td className="p-4">


<div className="
flex
items-center
gap-2
">


<UserRound size={18}/>


{report.patient?.name}


</div>


</td>





<td className="p-4">


<div className="
flex
items-center
gap-2
">


<Stethoscope size={18}/>


{report.doctor?.name}


</div>


</td>





<td className="p-4">


<div className="
flex
items-center
gap-2
">


<FileText size={18}/>


{report.reportType}


</div>


</td>





<td className="p-4">


<div className="
flex
items-center
gap-2
">


<CalendarDays size={18}/>


{
new Date(report.date)
.toLocaleDateString()
}


</div>


</td>





<td className="p-4">


<span

className={`

px-3
py-1
rounded-full
text-sm

${
report.status==="Critical"

?
"bg-red-100 text-red-700"

:

report.status==="Pending"

?
"bg-yellow-100 text-yellow-700"

:

report.status==="Completed"

?
"bg-blue-100 text-blue-700"

:

"bg-green-100 text-green-700"

}

`}

>


{report.status}


</span>


</td>







<td className="p-4">


<div className="
flex
gap-3
">


<button

onClick={()=>
setSelectedReport(report)
}

className="
text-teal-600
hover:text-teal-800
">


<Eye/>

</button>






<button

onClick={()=>
downloadReport(report)
}

className="
flex
items-center
gap-2
bg-gradient-to-r
from-blue-500
to-cyan-500
text-white
px-4
py-2
rounded-xl
hover:scale-105
transition
">


<Download size={18}/>


Download


</button>


</div>


</td>




</tr>


))


}



</tbody>


</table>


</div>










{/* MODAL */}


{

selectedReport && (


<div className="
fixed
inset-0
bg-black/50
backdrop-blur-sm
flex
items-center
justify-center
z-50
">


<div className="
bg-white
rounded-3xl
p-8
w-[450px]
shadow-2xl
">


<h2 className="
text-2xl
font-bold
mb-6
text-teal-700
">

Medical Report 📄

</h2>




<p>
<b>Patient:</b>
{" "}
{selectedReport.patient?.name}

</p>


<p className="mt-3">
<b>Doctor:</b>
{" "}
{selectedReport.doctor?.name}

</p>


<p className="mt-3">
<b>Diagnosis:</b>
{" "}
{selectedReport.diagnosis}

</p>


<p className="mt-3">
<b>Treatment:</b>
{" "}
{selectedReport.treatment || "N/A"}

</p>


<p className="mt-3">
<b>Status:</b>
{" "}
{selectedReport.status}

</p>




<button

onClick={()=>
setSelectedReport(null)
}

className="
mt-6
w-full
bg-teal-600
text-white
py-3
rounded-xl
hover:bg-teal-700
"

>

Close

</button>


</div>


</div>


)

}



</div>

)

}