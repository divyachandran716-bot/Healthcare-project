import {
  useState
} from "react";


import {
  useNavigate,
  Link
} from "react-router-dom";


import toast from "react-hot-toast";


import API from "../../api/axios";



export default function Login(){


const navigate = useNavigate();



const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [role,setRole]=useState("admin");





const handleLogin = async(e)=>{


e.preventDefault();


try{


const response = await API.post(

"/auth/login",

{

email,

password,

role

}

);




// Store Token

localStorage.setItem(

"token",

response.data.token

);




// Store User

localStorage.setItem(

"user",

JSON.stringify(
response.data.user
)

);



toast.success(
"Login successful"
);



const userRole =
response.data.user.role;



if(userRole==="admin"){

navigate("/admin");

}


else if(userRole==="doctor"){

navigate("/doctor");

}


else if(userRole==="nurse"){

navigate("/nurse");

}



}

catch(error){


toast.error(

error.response?.data?.message ||

"Invalid login"

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

Healthcare Login

</h1>







<form

onSubmit={handleLogin}

className="space-y-5"

>





{/* ROLE SELECT */}


<select

value={role}

onChange={(e)=>
setRole(e.target.value)
}

className="
w-full
border
p-3
rounded-xl
"

>


<option value="admin">

Admin

</option>


<option value="doctor">

Doctor

</option>


<option value="nurse">

Nurse

</option>



</select>








<input

type="email"

placeholder="Enter email"

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

className="
w-full
border
p-3
rounded-xl
"

/>







<input

type="password"

placeholder="Enter password"

value={password}

onChange={(e)=>
setPassword(e.target.value)
}

className="
w-full
border
p-3
rounded-xl
"

/>








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


Login


</button>







<Link

to="/register"

className="
block
text-center
mt-4
text-teal-600
"

>

Create new account

</Link>




</form>




</div>




</div>


);


}