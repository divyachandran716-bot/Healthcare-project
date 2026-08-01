import {
  Search,
  Eye,
  FileText,
  UserRound,
  Activity,
  CalendarDays
} from "lucide-react";

import {
  useState,
  useEffect
} from "react";

import API from "../../api/axios";
import toast from "react-hot-toast";

export default function Reports(){

const [selectedReport,setSelectedReport] = useState(null);
  
const [reports,setReports] = useState([]);

const [loading,setLoading] = useState(true);

const [search,setSearch]=useState("");

const filteredReports = reports.filter((report)=>{

const patientName = report.patient?.name || "";

return patientName
.toLowerCase()
.includes(
search.toLowerCase()
);
});

const viewReport=(report)=>{
console.log("Selected Report:", report);
setSelectedReport(report);
};

useEffect(()=>{

const fetchReports = async()=>{

try{

console.log("REPORT TOKEN:", token);

const response = await API.get(
"/reports/doctor"
);

console.log(
"Reports API:",
response.data
);

setReports(
response.data.reports || []
);
}

catch(error){

console.log(
"Report Error:",
error.response?.data
);

toast.error(
"Unable to load reports"
);
}

finally{

setLoading(false);

}
};

fetchReports();
},[]);

return (

<div
className="
space-y-8
animate-fadeIn
"
>

{/* Header */}

<div>

<h1
className="
text-4xl
font-black
flex
items-center
gap-3
bg-gradient-to-r
from-teal-700
via-cyan-600
to-blue-600
bg-clip-text
text-transparent
"
>

<FileText
className="text-teal-600"
/>

Medical Reports

</h1>

<p className="
text-slate-500
mt-2
">

Review and manage patient medical reports

</p>
</div>

{/* Summary Cards */}

<div className="
grid
md:grid-cols-4
gap-6
">

<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
border
border-slate-200
shadow-lg
p-6
hover:-translate-y-1
hover:shadow-2xl
transition
">

<div className="
flex
gap-3
items-center
">

<FileText
className="text-blue-600"
/>

<div>

<p className="text-gray-500">
Total Reports
</p>

<h2>
{reports.length}
</h2>
</div>
</div>
</div>

<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
border
border-slate-200
shadow-lg
p-6
hover:-translate-y-1
hover:shadow-2xl
transition
">

<div className="
flex
gap-3
items-center
">

<Activity
className="text-green-600"
/>

<div>

<p className="text-gray-500">
Completed
</p>

<h2 className="text-3xl font-bold">
{
reports.filter(
report=>report.status==="Completed"
).length
}
</h2>
</div>
</div>
</div>

<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
border
border-slate-200
shadow-lg
p-6
hover:-translate-y-1
hover:shadow-2xl
transition
">

<div className="
flex
gap-3
items-center
">

<CalendarDays
className="text-yellow-600"
/>
<div>

<p className="text-gray-500">
Pending
</p>

<h2 className="text-3xl font-bold">
{
reports.filter(
report=>report.status==="Pending"
).length
}
</h2>
</div>
</div>
</div>

<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
border
border-slate-200
shadow-lg
p-6
hover:-translate-y-1
hover:shadow-2xl
transition
">

<div className="
flex
gap-3
items-center
">

<UserRound
className="text-red-600"
/>

<div>

<p className="text-gray-500">
Reviewed
</p>

<h2 className="text-3xl font-bold">
{
reports.filter(
report=>report.status==="Reviewed"
).length
}
</h2>
</div>
</div>
</div>
</div>

{/* Search */}

<div
className="
bg-white/90
backdrop-blur-xl
border
border-slate-200
rounded-3xl
p-5
flex
items-center
gap-3
shadow-lg
focus-within:ring-2
focus-within:ring-teal-300
"
>

<Search
className="text-gray-400"
/>

<input
value={search}
onChange={(e)=>
setSearch(e.target.value)
}

placeholder="Search patient report..."
className="
w-full
outline-none
" />
</div>

{/* Reports Table */}

<div
className="
bg-white/90
backdrop-blur-xl
rounded-3xl
border
border-slate-200
shadow-xl
overflow-hidden
"
>

<table className="
w-full
">

<thead
className="
bg-gradient-to-r
from-teal-50
via-cyan-50
to-blue-50
text-slate-700
"
>

<tr>

<th className="p-4 text-left">
Patient
</th>

<th className="p-4 text-left">
Report Type
</th>

<th className="p-4 text-left">
Diagnosis
</th>

<th clasName="p-4 text-left">
Result
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
hover:bg-teal-50
transition
"
>

<td className="
p-4
font-medium
">

{report.patient?.name || "Unknown"}
</td>

<td className="p-4">
{report.reportType || report.report || "-"}
</td>

<td className="p-4">
{report.diagnosis}
</td>

<td className="p-4">
{report.testResults || report.result || "-"}
</td>

<td className="p-4">

<span
className={`
px-4
py-1.5
rounded-full
text-sm
font-semibold
shadow-sm

${
report.status==="Completed"
?
"bg-green-100 text-green-700"
:
report.status==="Reviewed"
?
"bg-blue-100 text-blue-700"
:
report.status==="Pending"
?
"bg-yellow-100 text-yellow-700"
:
"bg-red-100 text-red-700"
}
`}
>

{report.status}
</span>
</td>

<td className="p-4">

<button
onClick={()=>viewReport(report)}
className="
bg-teal-50
text-teal-600
p-2
rounded-xl
hover:bg-teal-600
hover:text-white
transition
"
>

<Eye size={20}/>
</button>
</td>
</tr>
))
}
</tbody>
</table>
</div>

{
selectedReport && (

<div
className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-[999]
"
>

<div
className="
bg-white
rounded-3xl
p-8
w-[450px]
shadow-2xl
border
border-slate-200
"
>

<h2
className="
text-2xl
font-bold
text-teal-700
mb-5
"
>
Medical Report Details
</h2>

<p>
<b>Patient:</b>{" "}
{selectedReport.patient?.name}
</p>

<p>
<b>Age:</b>{" "}
{selectedReport.patient?.age}
</p>

<p>
<b>Gender:</b>{" "}
{selectedReport.patient?.gender}
</p>

<hr className="my-4"/>

<p>
<b>Title:</b>{" "}
{selectedReport.title}
</p>

<p>
<b>Report Type:</b>{" "}
{selectedReport.reportType}
</p>

<p>
<b>Diagnosis:</b>{" "}
{selectedReport.diagnosis}
</p>

<p>
<b>Result:</b>{" "}
{
selectedReport.testResults || "-"
}
</p>

<p>
<b>Remarks:</b>{" "}
{
selectedReport.remarks || "-"
}
</p>

<p>
<b>Status:</b>{" "}
{selectedReport.status}
</p>

<button
onClick={()=>setSelectedReport(null)}
className="
mt-6
bg-teal-600
text-white
px-6
py-2
rounded-xl
"
>
Close
</button>
</div>
</div>
)
}
</div>
);
}