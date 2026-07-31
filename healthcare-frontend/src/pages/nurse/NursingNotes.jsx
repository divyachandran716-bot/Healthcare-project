import {
  Search,
  Plus,
  FileText,
  UserRound,
  Clock
} from "lucide-react";

import {
  useState,
  useEffect
} from "react";

import axios from "axios";

export default function NursingNotes(){

const [showForm,setShowForm]=useState(false);

const [form,setForm]=useState({

patient:"",
observation:"",
patientCondition:"Stable"

});

const [search,setSearch]=useState("");

const [notes,setNotes]=useState([]);

const [loading,setLoading]=useState(true);

// FETCH NURSING NOTES

useEffect(()=>{

const fetchNotes = async()=>{

try{

const token = localStorage.getItem("token");

const res = await axios.get(

"http://localhost:5000/api/nurses/notes",

{

headers:{

Authorization:`Bearer ${token}`

}
}
);

console.log("NURSING NOTES:",res.data);
setNotes(res.data.notes || []);
setLoading(false);
}
catch(error){

console.log(
"FETCH NOTES ERROR:",
error
);

setLoading(false);
}
};
fetchNotes();
},[]);

// SEARCH FILTER

const filteredNotes = notes.filter((note)=>

note.patient?.name
?.toLowerCase()
.includes(
search.toLowerCase()
)
);

if(loading){

return (

<div className="
flex
justify-center
items-center
h-screen
">

Loading Notes...

</div>
)
}

const addNote = async()=>{

try{

const token =
localStorage.getItem("token");

const res =
await axios.post(

"http://localhost:5000/api/nurses/notes",

form,

{
headers:{
Authorization:`Bearer ${token}`
}
}
);

console.log(res.data);

// refresh notes

setNotes([
res.data.note,
...notes
]);

setShowForm(false);

setForm({

patient:"",
observation:"",
patientCondition:"Stable"

});
}

catch(error){

console.log(
"ADD NOTE ERROR",
error.response?.data
);
}
};

return (

<div className="space-y-6">

{/* HEADER */}

<div className="
flex
justify-between
items-center
">

<div>

<h1 className="
text-3xl
font-bold
text-slate-800
">

Nursing Notes 📝

</h1>

<p className="
text-slate-500
mt-2
">

Record and manage patient care observations

</p>
</div>

<button

onClick={()=>setShowForm(true)}

className="
bg-gradient-to-r
from-teal-600
to-cyan-600
text-white
px-6
py-3
rounded-2xl
flex
items-center
gap-2
shadow-lg
hover:scale-105
transition-all
duration-300
"
>
<Plus size={20}/>
Add Note
</button>
</div>

{/* SUMMARY CARDS */}

<div className="
grid
md:grid-cols-3
gap-6
">

<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-xl
p-6
hover:-translate-y-1
transition-all
duration-300
">

<div className="
flex
items-center
gap-3
">

<FileText
className="text-teal-600"
/>

<div>

<p className="
text-slate-500
">
Total Notes
</p>

<h2 className="
text-3xl
font-bold
">
{notes.length}
</h2>
</div>
</div>
</div>

<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-xl
p-6
hover:-translate-y-1
transition-all
duration-300
">

<div className="
flex
items-center
gap-3
">

<UserRound
className="text-blue-600"
/>

<div>

<p className="
text-slate-500
">
Patients Covered
</p>

<h2 className="
text-3xl
font-bold
">
{
new Set(
notes.map(
(note)=>note.patient?._id
)
).size
}
</h2>
</div>
</div>
</div>

<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-xl
p-6
hover:-translate-y-1
transition-all
duration-300
">

<div className="
flex
items-center
gap-3
">

<Clock
className="text-orange-600"
/>

<div>

<p className="
text-slate-500
">
Today's Notes
</p>

<h2 className="
text-3xl
font-bold
">
{
notes.filter((note)=>
new Date(note.createdAt)
.toDateString()
===
new Date()
.toDateString()
).length
}
</h2>
</div>
</div>
</div>
</div>

{/* SEARCH */}

<div
className="
bg-white/80
backdrop-blur-xl
rounded-3xl
shadow-lg
border
border-slate-200
p-4
flex
items-center
gap-4
hover:shadow-xl
transition
"
>

<div
className="
w-10
h-10
rounded-xl
bg-teal-100
flex
items-center
justify-center
"
>

<Search
size={22}
className="text-teal-600"
/>

</div>


<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder="Search patient notes..."

className="
flex-1
bg-transparent
outline-none
text-slate-700
placeholder:text-slate-400
text-sm
"

/>


{
search && (

<button

onClick={()=>setSearch("")}

className="
text-sm
text-red-500
font-semibold
hover:text-red-700
"

>

Clear

</button>

)

}

</div>

{/* NOTES */}

<div className="
grid
md:grid-cols-2
gap-6
">

{

filteredNotes.map((note)=>(

<div

key={note._id}

className="
bg-white/90
backdrop-blur-xl
rounded-3xl
p-6
shadow-xl
hover:-translate-y-2
transition-all
duration-300
"
>

<div className="
flex
justify-between
items-start
mb-4
">

<div>

<h2 className="
text-xl
font-bold
text-slate-800
">

{note.patient?.name || "Unknown Patient"}
</h2>

<p className="
text-sm
text-slate-500
">
{
new Date(note.createdAt)
.toLocaleDateString()
}
</p>
</div>

<span
className={`
px-3
py-1
rounded-full
text-sm

${

note.patientCondition==="Critical"
?
"bg-red-100 text-red-700"
:
note.patientCondition==="Recovering"
?
"bg-yellow-100 text-yellow-700"
:
"bg-green-100 text-green-700"
}
`}
>
{note.patientCondition}
</span>
</div>

<div className="
bg-gradient-to-r
from-cyan-50
to-teal-50
rounded-2xl
p-4
">

<p className="
text-slate-700
">

{note.observation}
</p>
</div>

<div className="
mt-4
text-sm
text-slate-500
">

Recorded by:

<span className="
font-semibold
ml-1
">

{

note.nurse?.name || "Nurse"

}

</span>
</div>
</div>
))
}
</div>
{
showForm && (

<div className="
bg-white
shadow-xl
border
border-slate-200
rounded-3xl
p-8
space-y-6
max-w-2xl
">

{/* Form Header */}

<div className="
flex
justify-between
items-center
">

<div>

<h2 className="
text-2xl
font-bold
text-slate-800
">

📝 Add Nursing Note

</h2>


<p className="
text-slate-500
mt-1
">

Record patient care observation

</p>

</div>


<button

onClick={()=>setShowForm(false)}

className="
text-slate-400
hover:text-red-500
text-xl
"
>
✕
</button>
</div>

{/* Patient ID */}

<div>

<label className="
text-sm
font-semibold
text-slate-600
">

Patient ID

</label>

<input
placeholder="Enter patient ID"
value={form.patient}
onChange={(e)=>
setForm({
...form,
patient:e.target.value
})
}

className="
mt-2
border
border-slate-300
rounded-xl
p-3
w-full
outline-none
focus:ring-2
focus:ring-teal-500
"
/>
</div>

{/* Observation */}

<div>
<label className="
text-sm
font-semibold
text-slate-600
">
Observation
</label>

<textarea
rows="4"
placeholder="Enter patient observation..."
value={form.observation}
onChange={(e)=>
setForm({
...form,
observation:e.target.value
})
}

className="
mt-2
border
border-slate-300
rounded-xl
p-3
w-full
outline-none
focus:ring-2
focus:ring-teal-500
"
/>
</div>

{/* Condition */}

<div>

<label className="
text-sm
font-semibold
text-slate-600
">

Patient Condition

</label>

<select
value={form.patientCondition}
onChange={(e)=>
setForm({
...form,
patientCondition:e.target.value
})
}

className="
mt-2
border
border-slate-300
rounded-xl
p-3
w-full
outline-none
focus:ring-2
focus:ring-teal-500
"
>

<option value="Stable">
Stable
</option>

<option value="Recovering">
Recovering
</option>

<option value="Critical">
Critical
</option>
</select>
</div>

{/* Buttons */}

<div className="
flex
gap-4
pt-4
">

<button
onClick={addNote}
className="
bg-gradient-to-r
from-teal-600
to-cyan-600
text-white
px-6
py-3
rounded-xl
font-semibold
shadow-lg
hover:scale-105
transition
"
>

💾 Save Note

</button>

<button
onClick={()=>setShowForm(false)}
className="
bg-slate-200
text-slate-700
px-6
py-3
rounded-xl
font-semibold
hover:bg-slate-300
"
>
Cancel
</button>
</div>
</div>
)
}
</div>
)
}