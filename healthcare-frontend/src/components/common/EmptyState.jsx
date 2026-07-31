export default function EmptyState({

message="No data available"

}){


return (

<div className="
bg-white
rounded-xl
p-8
text-center
text-gray-500
">

<p className="text-lg">

{message}

</p>


</div>

);

}