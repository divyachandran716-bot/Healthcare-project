import {
  useEffect,
  useState
} from "react";


import {
  CalendarDays,
  Clock,
  Plus,
  X,
  UserRound,
  Stethoscope
} from "lucide-react";


import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


import toast from "react-hot-toast";


import API from "../../api/axios";



export default function Appointments(){

const [selectedAppointment,setSelectedAppointment]=useState(null);

const [appointments,setAppointments]=useState([]);

const [patients,setPatients]=useState([]);

const [doctors,setDoctors]=useState([]);


const [selectedDate,setSelectedDate]=useState(
new Date()
);


const [showModal,setShowModal]=useState(false);



const [form,setForm]=useState({

patient:"",
doctor:"",
appointmentDate:"",
time:"",
reason:"",
status:"Pending"

});






// =====================
// FETCH DATA
// =====================


const fetchData=async()=>{


try{


const appointmentResponse =
await API.get("/appointments");



const patientResponse =
await API.get("/patients");



const doctorResponse =
await API.get("/doctors");




setAppointments(

appointmentResponse.data.appointments ||

appointmentResponse.data ||

[]

);



setPatients(

patientResponse.data.patients ||

patientResponse.data ||

[]

);



setDoctors(

doctorResponse.data.doctors ||

doctorResponse.data ||

[]

);



}

catch(error){

console.log(
"Appointment Fetch Error",
error.response?.data
);


toast.error(
"Unable to load appointments"
);


}


};








useEffect(()=>{

fetchData();

},[]);









// =====================
// INPUT CHANGE
// =====================


const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};








// =====================
// CREATE APPOINTMENT
// =====================


const scheduleAppointment=async(e)=>{


e.preventDefault();


try{


await API.post(

"/appointments",

form

);



toast.success(
"Appointment scheduled"
);



setShowModal(false);



setForm({

patient:"",
doctor:"",
appointmentDate:"",
time:"",
reason:"",
status:"Pending"

});



fetchData();



}


catch(error){


console.log(
"Appointment Error",
error.response?.data
);



toast.error(

error.response?.data?.message ||

"Failed to schedule appointment"

);


}



};








// =====================
// UPDATE STATUS
// =====================


const updateStatus=async(id,status)=>{


try{


await API.put(

`/appointments/${id}`,

{
status
}

);



toast.success(
"Status updated"
);



fetchData();



}

catch(error){

console.log(error);

}



};






// =====================
// UPCOMING APPOINTMENTS
// =====================

const upcomingAppointments = appointments
.filter((item)=>{

  if(!item.appointmentDate)
    return false;


  const appointmentDate = new Date(
    item.appointmentDate
  );


  const today = new Date();


  return appointmentDate >= today;


})
.sort((a,b)=>{

return new Date(a.appointmentDate) -
       new Date(b.appointmentDate);

});






return (

<div className="
p-6
bg-slate-100
min-h-screen
">







{/* HEADER */}



<div
className="
flex
justify-between
items-center
bg-gradient-to-r
from-blue-50
to-cyan-50
border
border-blue-100
rounded-3xl
p-6
shadow-sm
"
>


<div>


<h1 className="
text-3xl
font-bold
text-slate-800
">

Appointment Management

</h1>


<p className="
text-slate-500
">

Manage doctor and patient schedules

</p>


</div>



<button
onClick={()=>setShowModal(true)}
className="
flex
items-center
gap-2
bg-gradient-to-r
from-blue-600
to-cyan-600
text-white
px-6
py-3
rounded-2xl
shadow-lg
hover:scale-105
hover:shadow-xl
transition-all
duration-300
"
>
<Plus size={20}/>
Schedule Appointment
</button>


</div>






<br></br>


{/* TOP SECTION */}



<div className="
grid
lg:grid-cols-3
gap-6
">







{/* CALENDAR */}



<div className="
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
hover:shadow-lg
transition
p-5
">


<div className="
flex
gap-2
items-center
mb-4
">


<CalendarDays
className="text-blue-600"
/>


<h2 className="
font-bold
text-lg
">

Calendar

</h2>


</div>



<Calendar

value={selectedDate}

onChange={setSelectedDate}

/>

</div>

{/* UPCOMING */}


{/* UPCOMING APPOINTMENTS */}


<div className="
lg:col-span-2
bg-white
rounded-2xl
shadow
p-5
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
flex
gap-2
items-center
">


<Clock 
className="text-green-600"
/>


Upcoming Appointments


</h2>



<span className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
text-sm
font-semibold
">

{
upcomingAppointments.length
}

</span>


</div>





<div className="
space-y-4
">



{

upcomingAppointments.length===0

?

<p className="
text-gray-500
text-center
p-5
">

No upcoming appointments


</p>


:


upcomingAppointments.map((item)=>(



<div

key={item._id}

className="
bg-gradient-to-r
from-blue-50
to-cyan-50
border
border-blue-100
rounded-2xl
shadow-sm
hover:shadow-lg
transition-all
duration-300
p-5
hover:shadow-md
transition
"



>


<div className="
flex
justify-between
items-start
">





<div>



<h3 className="
font-bold
text-lg
text-slate-800
flex
items-center
gap-2
">


<UserRound

size={18}

className="text-blue-600"

/>


{
item.patient?.name ||

"Unknown Patient"

}


</h3>






<p className="
text-sm
text-gray-500
flex
items-center
gap-2
mt-2
">


<Stethoscope size={16}/>


Dr. {

item.doctor?.name ||

item.doctor ||

"Unknown Doctor"

}


</p>







<div className="
flex
gap-5
mt-3
text-sm
text-gray-600
">


<p className="
flex
items-center
gap-2
">


<CalendarDays size={15}/>


{

new Date(
item.appointmentDate
)
.toLocaleDateString()

}


</p>




<p className="
flex
items-center
gap-2
">


<Clock size={15}/>


{

item.time ||

"N/A"

}


</p>



</div>







<p className="
mt-3
text-sm
text-gray-600
">


Reason:


<span className="
font-semibold
ml-1
">


{

item.reason ||

"Consultation"

}


</span>


</p>





</div>








<span

className={`

px-3
py-1
rounded-full
text-sm
font-medium


${
item.status==="Completed"

?

"bg-green-100 text-green-700"


:

item.status==="Cancelled"

?


"bg-red-100 text-red-700"


:


"bg-blue-100 text-blue-700"

}


`}

>


{

item.status ||

"Pending"

}


</span>



</div>




</div>



))

}




</div>



</div>



</div>









{/* TABLE */}



<div className="
mt-6
bg-white
rounded-3xl
border
border-slate-200
shadow-sm
overflow-hidden
p-6
">


<h2 className="
text-xl
font-bold
mb-5
">

All Appointments

</h2>





<table className="
w-full
">


<thead className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">

<tr className="
border-b
hover:bg-blue-50
transition
">

<th className="p-3 text-left">
Patient
</th>


<th className="p-3 text-left">
Doctor
</th>


<th>
Date
</th>


<th>
Status
</th>

<th>Action</th>


</tr>


</thead>





<tbody>

{
appointments.map((app)=>(

<tr

key={app._id}

className="
border-b
hover:bg-slate-50
"

>


<td className="p-3">

{app.patient?.name || "Patient"}

</td>



<td className="p-3">

{app.doctor?.name || app.doctor || "Doctor"}

</td>



<td className="p-3">

{app.appointmentDate?.slice(0,10)}

</td>



<td className="p-3">


<span

className={`

px-3
py-1
rounded-full
text-sm


${
app.status==="Completed"

?

"bg-green-100 text-green-700"


:

app.status==="Cancelled"

?


"bg-red-100 text-red-700"


:


"bg-blue-100 text-blue-700"

}

`}

>

{app.status}

</span>


</td>



<td className="p-3">


<button

onClick={()=>setSelectedAppointment(app)}

className="
text-blue-600
hover:text-blue-800
"

>

👁

</button>


</td>



</tr>


))

}


</tbody>



</table>



</div>









{/* ADD MODAL */}



{

showModal && (


<div className="
fixed
inset-0
bg-slate-100/50
backdrop-blur-sm
flex
items-center
justify-center
z-50
">


<form

onSubmit={scheduleAppointment}

className="
bg-white
rounded-2xl
shadow-xl
p-6
w-96
space-y-4
"


>


<div className="
flex
justify-between
">


<h2 className="
text-xl
font-bold
">

Schedule Appointment

</h2>



<X

onClick={()=>setShowModal(false)}

className="cursor-pointer"

/>



</div>








<select

name="patient"

value={form.patient}

onChange={handleChange}

className="
border
p-3
rounded-xl
w-full
"

>


<option value="">

Select Patient

</option>



{

patients.map(patient=>(


<option

key={patient._id}

value={patient._id}

>


{patient.name}


</option>


))


}



</select>


<select

name="status"

value={form.status}

onChange={handleChange}

className="
border
p-3
rounded-xl
w-full
"

>

<option value="Pending">
Pending
</option>

<option value="Confirmed">
Confirmed
</option>

<option value="Completed">
Completed
</option>

<option value="Cancelled">
Cancelled
</option>


</select>






<select

name="doctor"

value={form.doctor}

onChange={handleChange}

className="
border
p-3
rounded-xl
w-full
">
<option value="">
Select Doctor
</option>
{
doctors.map(doctor=>(
<option
key={doctor._id}
value={doctor._id}
>
{doctor.name}
</option>
))
}
</select>
<input
name="appointmentDate"
type="date"
value={form.appointmentDate}
onChange={handleChange}
className="
border
p-3
rounded-xl
w-full
"
/>
<input
name="time"
type="time"
value={form.time}
onChange={handleChange}
className="
border
p-3
rounded-xl
w-full
"
/>
<input
name="reason"
placeholder="Reason"
value={form.reason}
onChange={handleChange}
className="
border
p-3
rounded-xl
w-full
"
/>
<button
className="
bg-blue-600
text-white
w-full
py-3
rounded-xl
hover:bg-blue-700
"
>
Schedule
</button>
</form>
</div>
)
}

{
selectedAppointment && (

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
shadow-xl
">


<div className="
flex
justify-between
mb-5
">


<h2 className="
text-2xl
font-bold
">

Appointment Details

</h2>


<X

className="cursor-pointer"

onClick={()=>
setSelectedAppointment(null)
}

/>


</div>



<div className="space-y-3">


<p>
<b>Patient:</b>

{" "}

{
selectedAppointment.patient?.name ||
"Unknown"
}

</p>


<p>
<b>Doctor:</b>

{" "}

{
selectedAppointment.doctor?.name ||
selectedAppointment.doctor ||
"Unknown"
}

</p>


<p>
<b>Date:</b>

{" "}

{
selectedAppointment.appointmentDate?.slice(0,10)
}

</p>


<p>
<b>Time:</b>

{" "}

{
selectedAppointment.time
}

</p>


<p>
<b>Reason:</b>

{" "}

{
selectedAppointment.reason ||
"Consultation"
}

</p>


<p>
<b>Status:</b>

<span className="
ml-2
px-3
py-1
rounded-full
bg-blue-100
text-blue-700
">

{
selectedAppointment.status
}

</span>

</p>


</div>




<button

onClick={()=>
setSelectedAppointment(null)
}

className="
mt-6
w-full
bg-blue-600
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