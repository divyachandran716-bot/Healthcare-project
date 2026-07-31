import {
  Search,
  Plus,
  Eye,
  UserRound,
  X
} from "lucide-react";


import {
  useState
} from "react";


import toast from "react-hot-toast";



const nursesData=[

{
id:1,
name:"Anu Thomas",
department:"ICU",
shift:"Morning",
patients:12,
status:"Available"
},

{
id:2,
name:"Meera S",
department:"Emergency",
shift:"Night",
patients:18,
status:"Busy"
},

{
id:3,
name:"Rahul P",
department:"General Ward",
shift:"Evening",
patients:10,
status:"Available"
}

];





export default function Nurses(){



const [search,setSearch]=useState("");


const [showForm,setShowForm]=useState(false);


const [selectedNurse,setSelectedNurse]=useState(null);





const [form,setForm]=useState({

name:"",
department:"",
shift:"Morning",
patients:0,
status:"Available"

});







const filteredNurses =

nursesData.filter((nurse)=>

nurse.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);






const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};







const saveNurse=(e)=>{


e.preventDefault();


console.log(form);


toast.success(
"Nurse added successfully"
);


setShowForm(false);



setForm({

name:"",
department:"",
shift:"Morning",
patients:0,
status:"Available"

});


};







return (


<div className="space-y-6">







{/* Header */}

<div
className="
flex
justify-between
items-center
bg-gradient-to-r
from-green-50
to-emerald-50
p-6
rounded-3xl
border
border-green-100
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
Nurses 👩‍⚕️
</h1>

<p
className="
text-slate-500
mt-2
"
>
Manage nursing staff and patient assignments
</p>

</div>

<button
onClick={()=>setShowForm(true)}
className="
flex
items-center
gap-2
bg-green-600
text-white
px-6
py-3
rounded-2xl
shadow-md
hover:bg-green-700
hover:shadow-lg
transition
"
>

<Plus size={20}/>

Add Nurse

</button>

</div>






{/* Add Nurse Form */}



{

showForm && (

<div className="
bg-gradient-to-r
from-green-50
to-emerald-50
border
border-green-100
rounded-3xl
p-8
shadow-sm
">


<div className="
flex
justify-between
items-center
mb-5
">


<h2 className="
text-xl
font-bold
">

Add New Nurse

</h2>



<button

onClick={()=>setShowForm(false)}

>

<X/>

</button>


</div>






<form

onSubmit={saveNurse}

className="
grid
md:grid-cols-2
gap-4
"


>


<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Nurse Name"

className="
border
border-slate-200
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-green-300
"

/>



<input

name="department"

value={form.department}

onChange={handleChange}

placeholder="Department"
className="
border
border-slate-200
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-green-300
"

/>




<select

name="shift"

value={form.shift}

onChange={handleChange}

className="
border
border-slate-200
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-green-300
"

>

<option>
Morning
</option>


<option>
Evening
</option>


<option>
Night
</option>


</select>






<input

name="patients"

type="number"

value={form.patients}

onChange={handleChange}

placeholder="Assigned Patients"

className="
border
border-slate-200
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-green-300
"

/>





<select

name="status"

value={form.status}

onChange={handleChange}

className="
border
border-slate-200
rounded-xl
p-3
outline-none
focus:ring-2
focus:ring-green-300
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
bg-green-600
text-white
rounded-xl
py-3
hover:bg-green-700
"

>

Save Nurse

</button>



</form>



</div>

)

}









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
"
>

<Search className="text-slate-400"/>

<input
placeholder="Search nurse..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="
w-full
outline-none
border-none
text-slate-700
placeholder:text-slate-400
"
/>

</div>








{/* Nurse Cards */}



<div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
">





{

filteredNurses.map((nurse)=>(


<div

key={nurse.id}

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
from-green-500
to-emerald-500
text-white
p-4
rounded-2xl
shadow-md
"
>


<UserRound size={28}/>


</div>





<div>

<h2
className="
text-xl
font-bold
text-slate-800
"
>
{nurse.name}
</h2>

<p
className="
inline-block
mt-2
px-3
py-1
rounded-full
bg-green-50
text-green-700
text-sm
font-medium
"
>
{nurse.department}
</p>


</div>



</div>

<div
className="
mt-6
bg-slate-50
rounded-2xl
p-4
space-y-4
"
>

<div className="flex justify-between">
<span className="text-slate-500">
Shift
</span>

<span className="font-semibold">
{nurse.shift}
</span>
</div>

<div className="flex justify-between">
<span className="text-slate-500">
Patients
</span>

<span className="font-semibold">
{nurse.patients}
</span>
</div>

<div className="flex justify-between items-center">

<span className="text-slate-500">
Status
</span>

<span
className={`

px-3
py-1
rounded-full
text-sm
font-semibold

${
nurse.status==="Available"
?
"bg-green-100 text-green-700"
:
"bg-yellow-100 text-yellow-700"
}

`}
>

{nurse.status}

</span>

</div>

</div>





<button

onClick={()=>setSelectedNurse(nurse)}

className="
mt-5
w-full
flex
justify-center
items-center
gap-2
bg-green-50
text-green-700
py-3
rounded-xl
font-semibold
hover:bg-green-600
hover:text-white
transition
"

>

<Eye size={18}/>

View Profile

</button>





</div>


))


}





</div>









{/* Profile Modal */}



{

selectedNurse && (


<div className="
fixed
inset-0
bg-black/30
backdrop-blur-md
flex
items-center
justify-center
z-50
px-4
">


<div className="
bg-white
rounded-3xl
shadow-2xl
w-full
max-w-md
overflow-hidden
">


<div className="
flex
justify-between
items-center
mb-4
">


<h2 className="
text-2xl
font-bold
">

Nurse Profile

</h2>


<button

onClick={()=>setSelectedNurse(null)}

>

<X/>

</button>


</div>





<p>
<strong>Name:</strong> {selectedNurse.name}
</p>


<p>
<strong>Department:</strong> {selectedNurse.department}
</p>


<p>
<strong>Shift:</strong> {selectedNurse.shift}
</p>


<p>
<strong>Patients:</strong> {selectedNurse.patients}
</p>


<p>
<strong>Status:</strong> {selectedNurse.status}
</p>




<button

onClick={()=>setSelectedNurse(null)}

className="
mt-6
w-full
bg-green-600
text-white
py-3
rounded-xl
hover:bg-green-700
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