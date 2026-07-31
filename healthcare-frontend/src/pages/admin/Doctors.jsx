import {
Search,
Plus,
Eye,
Stethoscope
} from "lucide-react";


import {
useEffect,
useState
} from "react";


import toast from "react-hot-toast";


import API from "../../api/axios";


import Loader from "../../components/common/Loader";


import ErrorMessage from "../../components/common/ErrorMessage";



export default function Doctors(){


const [selectedDoctor, setSelectedDoctor] = useState(null);
const [doctors,setDoctors]=useState([]);


const [search,setSearch]=useState("");


const [loading,setLoading]=useState(true);


const [error,setError]=useState("");


const [showForm,setShowForm]=useState(false);


const [form,setForm]=useState({

name:"",
email:"",
phone:"",
gender:"Female",
specialization:"",
qualification:"",
experience:0,
licenseNumber:"",
department:"",
hospitalName:"",
availability:"Available",
shift:"Morning",
status:"Active"

});




// ========================
// GET DOCTORS API
// ========================


const fetchDoctors=async()=>{


try{


setLoading(true);



const response =
await API.get(
"/doctors"
);



setDoctors(

response.data.doctors ||

response.data ||

[]

);



}


catch(err){


console.log(
"Doctor API Error:",
err.response?.data || err.message
);



setError(

err.response?.data?.message ||

"Unable to load doctors"

);


}

finally{


setLoading(false);


}


};








useEffect(()=>{


fetchDoctors();


},[]);









const filteredDoctors =

doctors.filter((doctor)=>


(doctor.name || "")

.toLowerCase()

.includes(

search.toLowerCase()

)


);








const addDoctor=()=>{

setShowForm(true);

};

const handleChange=(e)=>{

setForm({

...form,

[e.target.name]:e.target.value

});

};

const saveDoctor=async(e)=>{

e.preventDefault();


try{


await API.post(
"/doctors",
form
);



toast.success(
"Doctor added successfully"
);



setShowForm(false);


fetchDoctors();


}

catch(error){


console.log(
"Doctor Add Error:",
error.response?.data
);



toast.error(

error.response?.data?.message ||

"Failed to add doctor"

);


}


};




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


<div
className="
flex
justify-between
items-center
bg-gradient-to-r
from-blue-50
to-cyan-50
p-6
rounded-3xl
border
border-blue-100
"
>


<div>

<h1
className="
text-3xl
font-bold
text-slate-800
"
>
Doctors 👨‍⚕️
</h1>


<p
className="
text-slate-500
mt-2
"
>
Manage medical professionals and doctor profiles
</p>


</div>



<button

onClick={addDoctor}

className="
flex
items-center
gap-2
bg-blue-600
text-white
px-6
py-3
rounded-2xl
shadow-md
hover:bg-blue-700
hover:shadow-lg
transition
"

>

<Plus size={20}/>

Add Doctor

</button>


</div>







{/* Search */}

<div
className="
bg-white
rounded-2xl
border
border-slate-200
shadow-sm
p-4
flex
items-center
gap-3
focus-within:ring-2
focus-within:ring-blue-300
"
>


<Search
className="
text-slate-400
"
/>


<input

placeholder="Search doctor..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
outline-none
border-none
w-full
text-slate-700
placeholder:text-slate-400
"

 />


</div>








{/* Doctor Cards */}



<div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
">





{

filteredDoctors.length===0

?


<div className="
text-gray-500
">

No doctors found

</div>


:


filteredDoctors.map((doctor)=>(



<div
key={doctor._id || doctor.id}
className="
bg-white
rounded-3xl
border
border-slate-200
p-6
shadow-sm
hover:shadow-xl
hover:-translate-y-1
transition-all
duration-300
"
>


<div className="
flex
items-center
gap-4
">



<div
className="
bg-gradient-to-br
from-blue-500
to-cyan-500
text-white
p-4
rounded-2xl
shadow-md
"
>

<Stethoscope size={28}/>

</div>

<div>

<h2
className="
text-xl
font-bold
text-slate-800
"
>

{doctor.name}

</h2>


<p
className="
mt-1
inline-block
px-3
py-1
rounded-full
bg-blue-50
text-blue-700
text-sm
font-medium
"
>

{doctor.specialization || "General Medicine"}

</p>
</div>
</div>
<div
className="
mt-6
bg-slate-50
rounded-2xl
p-4
space-y-3
"
>


<div className="
flex
justify-between
">

<span className="text-slate-500">
Experience
</span>


<span className="font-bold text-slate-800">
{doctor.experience || 0} Years
</span>

</div>



<div className="
flex
justify-between
items-center
">

<span className="text-slate-500">
Status
</span>


<span
className="
px-3
py-1
rounded-full
bg-green-100
text-green-700
text-sm
font-semibold
"
>
{doctor.status || "Active"}
</span>
</div>
</div>

<button

onClick={()=>setSelectedDoctor(doctor)}

className="
mt-5
w-full
flex
justify-center
items-center
gap-2
bg-blue-50
text-blue-700
py-3
rounded-xl
font-semibold
hover:bg-blue-600
hover:text-white
transition
"

>

<Eye size={18}/>

View Profile

</button>
{
selectedDoctor && (

<div
className="
fixed
inset-0
bg-black/30
backdrop-blur-sm
flex
items-center
justify-center
z-50
"
>


<div
className="
bg-white
rounded-2xl
shadow-2xl
p-6
w-96
"
>


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

Doctor Profile

</h2>


<button

onClick={()=>setSelectedDoctor(null)}

className="
text-gray-500
hover:text-red-600
"

>

✕


</button>


</div>





<div className="
space-y-3
text-sm
">


<p>
<strong>Name:</strong> {selectedDoctor.name}
</p>


<p>
<strong>Email:</strong> {selectedDoctor.email || "N/A"}
</p>


<p>
<strong>Phone:</strong> {selectedDoctor.phone || "N/A"}
</p>


<p>
<strong>Specialization:</strong> {selectedDoctor.specialization || "N/A"}
</p>


<p>
<strong>Qualification:</strong> {selectedDoctor.qualification || "N/A"}
</p>


<p>
<strong>Experience:</strong> {selectedDoctor.experience || 0} Years
</p>


<p>
<strong>Department:</strong> {selectedDoctor.department || "N/A"}
</p>


<p>
<strong>Hospital:</strong> {selectedDoctor.hospitalName || "N/A"}
</p>


<p>
<strong>Shift:</strong> {selectedDoctor.shift || "N/A"}
</p>


<p>
<strong>Status:</strong>

<span className="
ml-2
px-3
py-1
rounded-full
bg-green-100
text-green-700
">

{selectedDoctor.status || "Active"}

</span>

</p>


</div>





<button

onClick={()=>setSelectedDoctor(null)}

className="
mt-6
w-full
bg-blue-600
text-white
py-3
rounded-xl
hover:bg-blue-700
"

>

Close

</button>



</div>


</div>

)

}


</div>


))


}




</div>


{
showForm && (

<div
className="
bg-gradient-to-r
from-blue-50
to-cyan-50
border
border-blue-100
rounded-3xl
p-8
shadow-sm
"
>


<h2 className="
text-xl
font-bold
mb-4
">

Add Doctor

</h2>



<form

onSubmit={saveDoctor}

className="
grid
md:grid-cols-6
gap-4
"


>


<input

name="name"

placeholder="Doctor Name"

value={form.name}

onChange={handleChange}

className="
border
border-slate-200
p-3
rounded-xl
outline-none
focus:ring-2
focus:ring-blue-300
"

/>



<input

name="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

className="
border
border-slate-200
p-3
rounded-xl
outline-none
focus:ring-2
focus:ring-blue-300
"

/>




<input

name="phone"

placeholder="Phone"

value={form.phone}

onChange={handleChange}

className="
border
border-slate-200
p-3
rounded-xl
outline-none
focus:ring-2
focus:ring-blue-300
"

/>




<input

name="specialization"

placeholder="Specialization"

value={form.specialization}

onChange={handleChange}

className="
border
border-slate-200
p-3
rounded-xl
outline-none
focus:ring-2
focus:ring-blue-300
"

/>





<input

name="experience"

placeholder="Experience"

value={form.experience}

onChange={handleChange}

className="
border
border-slate-200
p-3
rounded-xl
outline-none
focus:ring-2
focus:ring-blue-300
"

/>




<select

name="status"

value={form.status}

onChange={handleChange}

className="
border
border-slate-200
p-3
rounded-xl
outline-none
focus:ring-2
focus:ring-blue-300
"

>

<option>
Available
</option>

<option>
Busy
</option>

</select>




<button

className="
bg-blue-600
text-white
rounded-xl
px-6
py-3
font-semibold
hover:bg-blue-700
transition
"

>

Save Doctor

</button>



</form>


</div>

)
}

</div>


);


}