import {
  useEffect,
  useState
} from "react";


import {
  Search,
  Plus,
  Trash2,
  Receipt,
  CreditCard,
  Download,
  Pill
} from "lucide-react";


import API from "../../api/axios";


import {
  exportCSV
} from "../../utils/exportCSV";



export default function PharmacyBilling(){



const [patients,setPatients]=useState([]);

const [medicines,setMedicines]=useState([]);

const [bills,setBills]=useState([]);
const [doctors,setDoctors] = useState([]);

const [selectedMedicines,setSelectedMedicines]=useState([]);



const [patient,setPatient]=useState("");

const [doctor,setDoctor]=useState("");

const [searchMedicine,setSearchMedicine]=useState("");


const [discount,setDiscount]=useState(0);

const [paymentMethod,setPaymentMethod]=useState("Cash");



const token =
localStorage.getItem("token");



const config={

headers:{

Authorization:`Bearer ${token}`

}

};




// =============================
// FETCH PATIENTS
// =============================


const fetchPatients=async()=>{


try{


const res =
await API.get(
"/patients",
config
);


setPatients(
res.data.patients || []
);


}

catch(error){

console.log(error);

}


};


const fetchDoctors = async()=>{

try{

const res = await API.get(
"/doctors",
config
);


setDoctors(
res.data.doctors || []
);


}

catch(error){

console.log(error);

}

};


// =============================
// FETCH MEDICINES
// =============================


const fetchMedicines=async()=>{


try{


const res =
await API.get(
"/pharmacy",
config
);



setMedicines(

res.data.medicines ||
res.data ||
[]

);



}

catch(error){

console.log(error);

}


};







// =============================
// FETCH BILLS
// =============================


const fetchBills=async()=>{


try{


const res =
await API.get(

"/billing",

config

);


setBills(

res.data.bills || []

);


}

catch(error){

console.log(error);

}


};







useEffect(()=>{


fetchPatients();

fetchMedicines();

fetchDoctors();

fetchBills();


},[]);









// =============================
// ADD MEDICINE
// =============================


const addMedicine=(medicine)=>{


const exists =
selectedMedicines.find(

item=>
item.medicine===medicine._id

);



if(exists){

return;

}



setSelectedMedicines([

...selectedMedicines,

{

medicine:medicine._id,

name:medicine.name,

quantity:1,

price:medicine.price,

amount:medicine.price

}

]);


};









// =============================
// UPDATE QUANTITY
// =============================


const updateQuantity=(index,value)=>{


const data =
[...selectedMedicines];


data[index].quantity =
Number(value);



data[index].amount =

data[index].quantity *

data[index].price;



setSelectedMedicines(data);


};









// =============================
// REMOVE MEDICINE
// =============================


const removeMedicine=(index)=>{


const data =
[...selectedMedicines];


data.splice(index,1);


setSelectedMedicines(data);


};








// =============================
// CALCULATION
// =============================


const subtotal =

selectedMedicines.reduce(

(total,item)=>

total + item.amount,

0

);



const tax =

subtotal * 0.05;



const total =

subtotal +

tax -

Number(discount);









// =============================
// CREATE BILL
// =============================


const createBill=async()=>{


if(!patient){

alert(
"Select patient"
);

return;

}

if(!doctor){

alert("Select doctor");
return;

}


if(selectedMedicines.length===0){

alert(
"Add medicines"
);

return;

}



try{


const payload={

patient,

doctor,

medicines:selectedMedicines,

subtotal,

discount:Number(discount),

tax,

total,

paymentMethod

};




const res =

await API.post(

"/billing",

payload,

config

);



console.log(res.data);



alert(
"Bill Generated Successfully"
);



setSelectedMedicines([]);

setPatient("");

setDoctor("");

setDiscount(0);



fetchBills();



}


catch(error){


console.log(

error.response?.data
);

alert(
    error.response?.data?.message ||
    "Bill failed"
)
}
};

const filteredMedicines =

medicines.filter(

medicine=>

medicine.name

?.toLowerCase()

.includes(

searchMedicine.toLowerCase()

)

);







return (

<div className="
p-6
bg-gradient-to-br
from-blue-50
via-white
to-gray-100
min-h-screen
">

{/* HEADER */}

<div className="
bg-gradient-to-r 
from-blue-700 
to-cyan-500
rounded-3xl
p-6
text-white
shadow-xl
mb-8
flex
justify-between
items-center
">


<div className="flex items-center gap-4">


<div className="
bg-white/20
p-4
rounded-2xl
">

<Receipt size={40}/>

</div>


<div>

<h1 className="
text-3xl
font-bold
text-gray-800
">
Pharmacy Billing
</h1>

<p className="
text-blue-100
mt-1
">

Create and manage patient medicine invoices

</p>


</div>


</div>





<button

onClick={()=>exportCSV(
bills,
"pharmacy-bills.csv"
)}

className="
bg-white
text-green-700
px-6
py-3
rounded-xl
font-semibold
flex
items-center
gap-2
hover:scale-105
transition
"

>

<Download size={20}/>

Export Bills

</button>



</div>







<div className="
grid
xl:grid-cols-3
gap-6
">





{/* PATIENT CARD */}

<div className="
bg-white
rounded-2xl
shadow-md
border
border-gray-100
p-6
hover:shadow-lg
transition
">

<h2 className="
text-xl
font-bold
text-gray-700
mb-5
">

Patient Details

</h2>



<select

className="
w-full
border
border-gray-300
rounded-xl
p-3
mb-4
focus:ring-2
focus:ring-blue-500
"

value={patient}

onChange={e=>setPatient(e.target.value)}

>

<option>
Select Patient
</option>


{
patients.map(p=>(

<option
key={p._id}
value={p._id}
>

{p.name}

</option>

))
}


</select>





<select

className="
w-full
border
border-gray-300
rounded-xl
p-3
focus:ring-2
focus:ring-blue-500
"

value={doctor}

onChange={e=>setDoctor(e.target.value)}

>

<option>
Select Doctor
</option>


{
doctors.map(d=>(

<option
key={d._id}
value={d._id}
>

{d.name}

</option>

))
}


</select>



</div>









{/* MEDICINE CARD */}
<div
className="
bg-white
rounded-3xl
shadow-lg
p-6
border
border-blue-50
"
>

<div className="
flex
justify-between
items-center
mb-6
">

<div>

<h2 className="
text-2xl
font-bold
text-gray-800
">

Medicine Inventory

</h2>

<p className="
text-sm
text-gray-500
">

Select medicines for billing

</p>

</div>


<div className="
bg-blue-100
text-blue-600
p-3
rounded-2xl
">

<Pill size={25}/>

</div>


</div>




{/* Search */}

<div className="
relative
mb-5
">


<Search

className="
absolute
left-4
top-3.5
text-gray-400
"

/>


<input

className="
w-full
pl-12
pr-4
py-3
rounded-2xl
bg-gray-50
border
border-gray-100
outline-none
focus:ring-2
focus:ring-blue-200
"

placeholder="Search medicines..."

value={searchMedicine}

onChange={
e=>setSearchMedicine(e.target.value)
}

/>


</div>





{/* Medicine Cards */}

<div className="
grid
gap-4
max-h-[450px]
overflow-y-auto
">


{

filteredMedicines.map(medicine=>(


<div

key={medicine._id}

className="
group
flex
items-center
justify-between
p-4
rounded-2xl
bg-gradient-to-r
from-white
to-blue-50
border
border-blue-100
hover:shadow-md
transition
"

>


<div className="
flex
items-center
gap-4
">


<div className="
bg-blue-600
text-white
w-12
h-12
rounded-2xl
flex
items-center
justify-center
shadow
">

<Pill size={22}/>

</div>




<div>


<h3 className="
font-bold
text-gray-800
">

{medicine.name}

</h3>


<div className="
flex
gap-3
text-sm
mt-1
">


<span className="
text-green-600
font-semibold
">

₹ {medicine.price}

</span>


<span className="
text-gray-400
">

Stock {medicine.stock}

</span>


</div>



</div>



</div>






<div className="
flex
flex-col
items-end
gap-2
">


<span
className={`
text-xs
px-3
py-1
rounded-full
font-semibold
${
medicine.stock>0
?
"bg-green-100 text-green-700"
:
"bg-red-100 text-red-700"
}
`}
>

{
medicine.stock>0
?
"Available"
:
"Out of Stock"
}

</span>




<button

disabled={medicine.stock<=0}

onClick={()=>addMedicine(medicine)}

className="
bg-blue-600
text-white
px-4
py-2
rounded-xl
flex
items-center
gap-2
hover:bg-blue-700
disabled:bg-gray-300
transition
"

>

<Plus size={18}/>

Add

</button>



</div>



</div>


))


}



</div>


</div>






{/* BILL SUMMARY */}

<div className="
bg-white
rounded-2xl
shadow-md
border
border-gray-100
p-6
hover:shadow-lg
transition
">

<h2 className="
text-xl
font-bold
text-gray-700
mb-5
">

Invoice Summary

</h2>



<div className="
space-y-3
">


{
selectedMedicines.map((item,index)=>(


<div

key={index}

className="
bg-gray-50
rounded-xl
p-3
flex
justify-between
items-center
"

>


<div>

<p className="font-semibold">

{item.name}

</p>

<p className="text-green-600">

₹ {item.amount}

</p>


</div>



<div className="
flex
items-center
border
rounded-xl
overflow-hidden
bg-white
">

<button

type="button"

onClick={()=>updateQuantity(
index,
Math.max(1,item.quantity-1)
)}

className="
px-3
py-2
bg-gray-100
hover:bg-gray-200
font-bold
text-lg
"

>

-

</button>



<input

type="number"

min="1"

className="
w-14
text-center
outline-none
font-semibold
"

value={item.quantity}

onChange={

e=>

updateQuantity(
index,
Number(e.target.value)
)

}

/>



<button

type="button"

onClick={()=>updateQuantity(
index,
item.quantity+1
)}

className="
px-3
py-2
bg-blue-600
text-white
hover:bg-blue-700
font-bold
text-lg
"

>

+

</button>


</div>



<button

onClick={()=>removeMedicine(index)}

className="
text-red-500
"

>

<Trash2/>

</button>



</div>


))
}



</div>





<div className="
mt-5
pt-4
space-y-2
">


<p>
Subtotal :
<b> ₹ {subtotal}</b>
</p>


<p>
GST 5% :
<b> ₹ {tax}</b>
</p>




<input

className="
w-full
bg-white
border
border-gray-200
rounded-2xl
px-4
py-3
text-gray-700
shadow-sm
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
outline-none
transition
"

placeholder="Discount"

value={discount}

onChange={
e=>setDiscount(e.target.value)
}

/>




<h2 className="
text-3xl
font-bold
text-green-600
mt-3
">

₹ {total}

</h2>



<select

className="
w-full
bg-white
border
border-gray-200
rounded-2xl
px-4
py-3
text-gray-700
shadow-sm
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
outline-none
transition
"

value={paymentMethod}

onChange={
e=>setPaymentMethod(e.target.value)
}

>

<option>
Cash
</option>

<option>
UPI
</option>

<option>
Card
</option>


</select>



<button

onClick={createBill}

className="
mt-5
w-full
bg-gradient-to-r
from-green-600
to-emerald-500
text-white
py-4
rounded-2xl
font-bold
flex
justify-center
items-center
gap-2
hover:scale-105
transition
"

>

<CreditCard/>

Generate Bill


</button>



</div>



</div>


</div>






{/* RECENT BILL */}


<div className="
bg-white
rounded-2xl
shadow-md
border
border-gray-100
p-6
hover:shadow-lg
transition
">


<h2 className="
text-2xl
font-bold
mb-5
">

Recent Bills

</h2>



<div className="
grid
md:grid-cols-2
gap-4
">


{

bills.map(bill=>(


<div

key={bill._id}

className="
w-full
bg-white
border
border-gray-200
rounded-2xl
px-4
py-3
text-gray-700
shadow-sm
focus:ring-2
focus:ring-blue-500
focus:border-blue-500
outline-none
transition
"

>


<div className="
flex
justify-between
">


<div>


<p className="font-bold">

{bill.patient?.name}

</p>


<p className="text-gray-500">

Dr. {bill.doctor?.name}

</p>


</div>


<div className="
text-right
">


<p className="
text-green-600
font-bold
text-xl
">

₹ {bill.total}

</p>


<p className="text-sm text-gray-400">

{new Date(
bill.createdAt
).toLocaleDateString()}

</p>


</div>


</div>


</div>



))

}



</div>


</div>




</div>

);

}