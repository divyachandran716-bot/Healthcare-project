import {
useState
} from "react";


import {
useNavigate,
Link
} from "react-router-dom";


import toast from "react-hot-toast";


import API from "../../api/axios";



export default function Register(){


const navigate = useNavigate();



const [formData,setFormData] = useState({

name:"",

email:"",

password:"",

role:"patient"

});






const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};







const handleRegister = async(e)=>{


e.preventDefault();



try{


const response = await API.post(

"/auth/register",

formData

);





toast.success(

"Registration successful"

);



navigate("/");



}

catch(error){


toast.error(

error.response?.data?.message ||

"Registration failed"

);


}


};






return (

<div className="
min-h-screen
flex
items-center
justify-center
bg-slate-100
">


<div className="
bg-white
p-8
rounded-2xl
shadow-lg
w-96
">


<h1 className="
text-3xl
font-bold
text-teal-700
mb-6
text-center
">

Create Account

</h1>





<form

onSubmit={handleRegister}

className="space-y-5"

>




<input

name="name"

type="text"

placeholder="Enter name"

value={formData.name}

onChange={handleChange}

className="
w-full
border
p-3
rounded-xl
"

/>





<input

name="email"

type="email"

placeholder="Enter email"

value={formData.email}

onChange={handleChange}

className="
w-full
border
p-3
rounded-xl
"

/>






<input

name="password"

type="password"

placeholder="Enter password"

value={formData.password}

onChange={handleChange}

className="
w-full
border
p-3
rounded-xl
"

/>






<select

name="role"

value={formData.role}

onChange={handleChange}

className="
w-full
border
p-3
rounded-xl
"

>


<option value="patient">

Patient

</option>


<option value="doctor">

Doctor

</option>


<option value="nurse">

Nurse

</option>


<option value="admin">

Admin

</option>



</select>







<button

type="submit"

className="
w-full
bg-teal-600
text-white
p-3
rounded-xl
hover:bg-teal-700
"

>

Register

</button>






<Link

to="/"

className="
block
text-center
mt-4
text-teal-600
"

>

Already have account? Login

</Link>





</form>



</div>


</div>

);


}