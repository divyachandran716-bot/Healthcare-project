import {
  Search,
  Plus,
  Eye
} from "lucide-react";


import {
  useEffect,
  useState
} from "react";


import toast from "react-hot-toast";


import API from "../../api/axios";


import Loader from "../../components/common/Loader";

import ErrorMessage from "../../components/common/ErrorMessage";




export default function Patients(){

const [selectedPatient,setSelectedPatient] = useState(null);

const [patients,setPatients]=useState([]);

const [search,setSearch]=useState("");

const [loading,setLoading]=useState(true);

const [error,setError]=useState("");


const [showForm,setShowForm]=useState(false);


const [form,setForm]=useState({

name:"",
age:"",
gender:"",
disease:"",
status:"Stable"

});




// Fetch Patients

const fetchPatients=async()=>{


try{


setLoading(true);


const response =
await API.get("/patients");



setPatients(

response.data.patients ||

response.data ||

[]

);


}

catch(error){

console.log(
"ADD PATIENT ERROR:",
error.response?.data
);


toast.error(

error.response?.data?.message ||

"Failed to add patient"

);

}
finally{

setLoading(false);

}


};





useEffect(()=>{

fetchPatients();

},[]);







// Add Patient Demo

const addPatient=()=>{

setShowForm(true);

};

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};

const savePatient=async(e)=>{


e.preventDefault();


try{


await API.post(
"/patients",
form
);



toast.success(
"Patient added successfully"
);



setShowForm(false);



setForm({

name:"",
age:"",
gender:"",
disease:"",
status:"Stable"

});



fetchPatients();


}

catch(error){


console.log(error);


toast.error(

error.response?.data?.message ||

"Failed to add patient"

);


}


};




const filteredPatients =

patients.filter((patient)=>


(patient.name || "")
.toLowerCase()
.includes(
search.toLowerCase()
)


);








if(loading)

return <Loader/>;



if(error)

return (

<ErrorMessage
message={error}
/>

);



return (

<div className="space-y-6">





{/* Header */}

<div className="
flex
justify-between
items-center
bg-gradient-to-r
from-teal-50
to-cyan-50
p-6
rounded-3xl
shadow-lg
shadow-teal-100/50
">


<div>

<h1 className="
text-4xl
font-bold
text-slate-800
flex
items-center
gap-2
">

🧑‍⚕️ Patients

</h1>


<p className="
text-slate-500
mt-2
">

Manage patient records, health status and medical information

</p>

</div>



<button

onClick={addPatient}

className="
flex
items-center
gap-2
bg-gradient-to-r
from-teal-600
to-cyan-600
text-white
px-6
py-3
rounded-2xl
shadow-lg
hover:scale-105
transition
"

>

<Plus size={20}/>

Add Patient

</button>


</div>








{/* Search */}



<div className="
bg-white
shadow-md
rounded-2xl
p-5
flex
items-center
gap-4
focus-within:ring-2
focus-within:ring-teal-400
">


<Search
className="text-slate-400"
/>


<input


value={search}


onChange={
e=>setSearch(
e.target.value
)
}


placeholder="Search patient..."


className="
outline-none
w-full
"


/>


</div>









{/* Table */}



<div className="
bg-white
rounded-3xl
shadow-lg
shadow-slate-200/50
overflow-hidden
transition
">

<table className="
w-full
">


<thead className="
bg-gradient-to-r
from-teal-600
to-cyan-600
text-white
">

<tr>


<th className="p-4 text-left">
ID
</th>


<th className="p-4 text-left">
Name
</th>


<th className="p-4 text-left">
Age
</th>


<th className="p-4 text-left">
Gender
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

filteredPatients.length===0

?

<tr>

<td

colSpan="6"

className="
text-center
p-6
text-gray-500
"

>

No patients found

</td>

</tr>



:

filteredPatients.map((patient)=>(



<tr

key={patient._id || patient.id}

className="
border-t
hover:bg-teal-50
transition
"

>


<td className="p-4">

#{patient._id?.slice(-4) || patient.id}

</td>



<td className="
p-4
font-medium
">

{patient.name}

</td>



<td className="p-4">

{patient.age}

</td>



<td className="p-4">

{patient.gender}

</td>




<td className="p-4">


<span

className={`

px-3
py-1
rounded-full
text-sm


${
patient.status==="Recovered"

?

"bg-green-100 text-green-700"


:

patient.status==="Critical"


?

"bg-red-100 text-red-700"


:

"bg-yellow-100 text-yellow-700"

}


`}

>


{patient.status || "Treatment"}


</span>


</td>





<td className="p-4">
<button

onClick={()=>setSelectedPatient(patient)}

className="
flex
items-center
gap-2
bg-teal-100
text-teal-700
px-4
py-2
rounded-xl
hover:bg-teal-600
hover:text-white
transition
"

>

<Eye size={18}/>

View

</button>

</td>



</tr>


))


}



</tbody>


</table>


</div>


{
showForm && (

<div className="
bg-white
rounded-2xl
border
p-6
">


<h2 className="
text-xl
font-bold
mb-4
">

Add New Patient

</h2>



<form

onSubmit={savePatient}

className="
grid
md:grid-cols-5
gap-4
"



>


<input

name="name"

placeholder="Patient Name"

value={form.name}

onChange={handleChange}

className="
border
p-3
rounded-xl
"

/>



<input

name="age"

placeholder="Age"

value={form.age}

onChange={handleChange}

className="
border
p-3
rounded-xl
"

/>



<input

name="gender"

placeholder="Gender"

value={form.gender}

onChange={handleChange}

className="
border
p-3
rounded-xl
"

/>



<input

name="disease"

placeholder="Disease"

value={form.disease}

onChange={handleChange}

className="
border
p-3
rounded-xl
"

/>



<select

name="status"

value={form.status}

onChange={handleChange}

className="
border
p-3
rounded-xl
"

>


<option>
Stable
</option>

<option>
Under Treatment
</option>

<option>
Recovering
</option>

<option>
Critical
</option>

<option>
Recovered
</option>


</select>



<button

className="
bg-teal-600
text-white
rounded-xl
"

>

Save Patient

</button>


</form>


</div>

)
}

{
selectedPatient && (

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
shadow-xl
p-6
w-[450px]
">


<div className="
flex
justify-between
items-center
mb-5
">


<h2 className="
text-2xl
font-bold
text-slate-800
">

Patient Details

</h2>


<button

onClick={()=>setSelectedPatient(null)}

className="
text-red-500
font-bold
"

>

✕


</button>


</div>




<div className="space-y-3">


<p>

<b>Name:</b>

{" "}

{selectedPatient.name}

</p>


<p>

<b>Age:</b>

{" "}

{selectedPatient.age}

</p>



<p>

<b>Gender:</b>

{" "}

{selectedPatient.gender}

</p>



<p>

<b>Disease:</b>

{" "}

{selectedPatient.disease}

</p>



<p>

<b>Status:</b>

<span className="ml-2 px-3 py-1 rounded-full bg-teal-100 text-teal-700">

{selectedPatient.status}

</span>

</p>



<p>

<b>Patient ID:</b>

{" "}

{selectedPatient._id}

</p>


</div>





<button

onClick={()=>setSelectedPatient(null)}

className="
mt-6
w-full
bg-teal-600
text-white
py-3
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