import { useEffect, useState } from "react";
import axios from "axios";
import { exportCSV } from "../../utils/exportCSV";

import {
  Pill,
  Search,
  Plus,
  Trash2,
  Edit,
  AlertTriangle,
  PackageCheck,
  X
} from "lucide-react";


export default function Pharmacy() {


const [medicines,setMedicines] = useState([]);

const [search,setSearch] = useState("");

const [showModal,setShowModal] = useState(false);

const [editId,setEditId] = useState(null);


const token = localStorage.getItem("token");



const [form,setForm] = useState({

name:"",
category:"Tablet",
batchNumber:"",
manufacturer:"",
stock:"",
expiry:"",
price:"",
description:""

});





// Fetch Medicines

const fetchMedicines = async()=>{


try{


const response = await axios.get(

"http://localhost:5000/api/pharmacy",

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


console.log(response.data);


setMedicines(
response.data.medicines ||
response.data ||
[]
);


}

catch(error){

console.log(error);

}


};





useEffect(()=>{

fetchMedicines();

},[]);







// Add / Update Medicine


const saveMedicine = async(e)=>{


e.preventDefault();


try{


if(editId){


await axios.put(

`http://localhost:5000/api/pharmacy/${editId}`,

form,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


}
else{

const payload={

...form,

stock:Number(form.stock),

price:Number(form.price)

};


await axios.post(
"http://localhost:5000/api/pharmacy",
payload,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


}



setShowModal(false);

setEditId(null);

setForm({

name:"",
category:"Tablet",
batchNumber:"",
manufacturer:"",
stock:"",
expiry:"",
price:"",
description:""

});


fetchMedicines();



}

catch(error){

console.log(error);

}


};








// Delete Medicine


const deleteMedicine = async(id)=>{


try{


await axios.delete(

`http://localhost:5000/api/pharmacy/${id}`,

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


fetchMedicines();


}

catch(error){

console.log(error);

}


};








// Edit


const editMedicine=(medicine)=>{


setEditId(medicine._id);

setForm({

name:medicine.name || "",

category:medicine.category || "",

batchNumber:medicine.batchNumber || "",

manufacturer:medicine.manufacturer || "",

stock:medicine.stock || "",
expiry:
medicine.expiry?.slice(0,10)
|| "",

price:medicine.price || "",

description:
medicine.description || ""

});


setShowModal(true);


};









// Search


const filteredMedicines = medicines.filter(
medicine=>

medicine.name
?.toLowerCase()
.includes(
search.toLowerCase()
)

);









// Stock Status


const getStockStatus=(medicine)=>{


if(medicine.stock<=0)

return "Out of Stock";


if(medicine.stock<=medicine.minimumStock)

return "Low Stock";


return "Available";


};



return (

<div className="
p-6
bg-gray-100
min-h-screen
">


{/* Header */}


<div className="
flex
justify-between
items-center
mb-6
">


<div>

<h1 className="
text-3xl
font-bold
text-gray-800
">

Pharmacy Management

</h1>


<p className="text-gray-500">

Medicine inventory and stock control

</p>


</div>




<div className="
flex
gap-3
">


<button

onClick={()=>exportCSV(
medicines,
"medicine-stock.csv"
)}

className="
bg-green-600
text-white
px-5
py-3
rounded-xl
"

>

Export CSV

</button>



<button

onClick={()=>setShowModal(true)}

className="
bg-blue-600
text-white
px-5
py-3
rounded-xl
flex
gap-2
items-center
"

>

<Plus/>

Add Medicine

</button>


</div>


</div>







{/* Alerts */}


<div className="
grid
md:grid-cols-3
gap-5
mb-6
">


<div className="
bg-white
rounded-2xl
shadow
p-5
flex
gap-3
">


<PackageCheck
className="text-green-600"
/>


<div>

<h3 className="font-bold">

Total Medicines

</h3>

<p className="text-2xl">

{medicines.length}

</p>

</div>


</div>







<div className="
bg-white
rounded-2xl
shadow
p-5
flex
gap-3
">


<AlertTriangle
className="text-red-500"
/>


<div>

<h3 className="font-bold">

Low Stock

</h3>


<p className="text-2xl">

{
medicines.filter(
m=>m.stock<=10
).length
}

</p>

</div>


</div>





<div className="
bg-white
rounded-2xl
shadow
p-5
">


<h3 className="font-bold">

Expired / Soon Expiry

</h3>


<p className="text-2xl">

{
medicines.filter(
m=>new Date(m.expiry)<new Date()
).length
}

</p>


</div>



</div>







{/* Search */}


<div className="
bg-white
p-4
rounded-xl
shadow
mb-6
flex
items-center
gap-3
">


<Search/>


<input

placeholder="Search medicine..."

className="
outline-none
w-full
"

value={search}

onChange={
e=>setSearch(e.target.value)
}

/>


</div>








{/* Medicine Cards */}



<div className="
grid
md:grid-cols-2
xl:grid-cols-3
gap-6
">


{

filteredMedicines.map(medicine=>(


<div

key={medicine._id}

className="
bg-white
rounded-2xl
shadow
p-5
"


>


<div className="
flex
justify-between
">


<div className="
bg-blue-100
p-3
rounded-xl
">


<Pill
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

{
getStockStatus(medicine)
}

</span>



</div>






<h2 className="
text-xl
font-bold
mt-4
">

{medicine.name}

</h2>



<p>
Category:
{medicine.category}
</p>

<p>
Stock:
{medicine.stock}
</p>


<p>
Expiry:
{
medicine.expiry?.slice(0,10)
}

</p>



<div className="
flex
gap-3
mt-5
">


<button

onClick={()=>editMedicine(medicine)}

className="
bg-yellow-500
text-white
px-4
py-2
rounded-lg
flex
gap-2
"

>

<Edit size={18}/>

Edit

</button>




<button

onClick={()=>deleteMedicine(medicine._id)}

className="
bg-red-600
text-white
px-4
py-2
rounded-lg
flex
gap-2
"

>

<Trash2 size={18}/>

Delete

</button>



</div>



</div>


))

}


</div>









{/* Modal */}


{

showModal &&


<div className="
fixed
inset-0
bg-black/40
flex
items-center
justify-center
z-50
">


<form

onSubmit={saveMedicine}

className="
bg-white
rounded-2xl
p-6
w-[450px]
space-y-3
"


>


<div className="
flex
justify-between
">


<h2 className="text-xl font-bold">

{
editId
?
"Update Medicine"
:
"Add Medicine"
}

</h2>


<X

className="cursor-pointer"

onClick={()=>
setShowModal(false)
}

/>


</div>





{
[
"name",
"category",
"batchNumber",
"manufacturer",
"stock",
"expiry",
"price",
"description"
].map(field=>(

<input

key={field}

type={
field==="expiry"
?
"date"
:
field==="stock" || field==="price"
?
"number"
:
"text"
}

placeholder={field}

className="
border
rounded-lg
p-3
w-full
"

value={form[field]}

onChange={
e=>
setForm({

...form,

[field]:e.target.value

})
}


/>

))

}




<button

className="
bg-blue-600
text-white
w-full
py-3
rounded-xl
"

>

Save Medicine

</button>



</form>



</div>


}



</div>

);

}