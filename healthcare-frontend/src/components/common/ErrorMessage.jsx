import { AlertTriangle } from "lucide-react";


export default function ErrorMessage({

message="Something went wrong"

}){


return (

<div className="
bg-red-50
border
border-red-200
text-red-600
p-5
rounded-xl
flex
gap-3
items-center
">


<AlertTriangle/>


<p>

{message}

</p>


</div>

);

}