import { motion } from "framer-motion";


export default function StatCard({
title,
value,
icon:Icon,
color
}){


return (

<motion.div

whileHover={{
scale:1.03
}}

className="
bg-white
rounded-2xl
p-6
shadow-sm
border
border-slate-200
"

>


<div className="
flex
items-center
justify-between
">


<div>

<p className="
text-sm
text-slate-500
">

{title}

</p>


<h2 className="
text-3xl
font-bold
mt-2
">

{value}

</h2>


</div>


<div

className={`
p-4
rounded-xl
${color}
`}

>

<Icon
size={28}
/>

</div>


</div>


</motion.div>


)

}