import { useEffect, useState } from "react";
import API from "../../api/axios";
import {
  Brain,
  Activity,
  HeartPulse,
  AlertTriangle,
  Send,
  Bot
} from "lucide-react";


export default function AIInsights(){


const [insight,setInsight] = useState("");

const [riskData,setRiskData] = useState([]);

const [diseaseTrend,setDiseaseTrend] = useState([]);

const [message,setMessage] = useState("");

const [chatResponse,setChatResponse] = useState("");

const [loading,setLoading]=useState(true);


const config={

headers:{
Authorization:`Bearer ${token}`
}

};




// =============================
// LOAD AI DATA
// =============================


const fetchAIData = async()=>{


try{


setLoading(true);



// AI INSIGHT

const ai =
await API.get(
  "/analytics/ai"
);



setInsight(

ai.data.insight ||

"AI analysis unavailable"

);





// RISK ANALYSIS


const risk =
await API.get(
  "/analytics/risk-analysis"
);



setRiskData(

risk.data.risks ||

[]

);






// DISEASE TRENDS


const trend =
await API.get(
  "/analytics/disease-trends"
);



setDiseaseTrend(

trend.data.trends ||

[]

);




}

catch(error){


console.log(
"AI API Error",
error
);



setInsight(

"AI service temporarily unavailable"

);


}


finally{


setLoading(false);


}


};






useEffect(()=>{


fetchAIData();


},[]);









// =============================
// AI CHAT
// =============================


const sendMessage = async()=>{


if(!message.trim())

return;



try{


const response = await API.post(
  "/ai/chat",
  {
    message
  }
);



setChatResponse(

response.data.reply ||

"No response"

);



}

catch(error){


console.log(error);



setChatResponse(

"Unable to connect with AI assistant"

);


}



};








// =============================
// RISK COLOR
// =============================


const riskColor=(risk)=>{


if(risk==="High")

return "text-red-600";


if(risk==="Medium")

return "text-orange-500";


return "text-green-600";


};








if(loading){


return (

<div className="
min-h-screen
flex
items-center
justify-center
text-xl
font-bold
">


Loading AI Healthcare Insights...


</div>

);


}









return (

<div className="
min-h-screen
p-6
bg-gradient-to-br
from-slate-100
via-purple-50
to-blue-100
">







{/* HEADER */}


<div className="
flex
items-center
gap-4
mb-2
">

<div className="
bg-purple-100
p-3
rounded-2xl
shadow-sm
">

<Brain
size={35}
className="text-purple-600"
/>

</div>


<h1 className="
text-4xl
font-extrabold
bg-gradient-to-r
from-purple-600
to-blue-600
bg-clip-text
text-transparent
">

AI Healthcare Insights

</h1>


</div>



<p className="
text-gray-500
mb-6
">


AI powered healthcare analysis using Groq


</p>










{/* AI SUMMARY */}


<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
border
border-white
shadow-xl
p-6
mb-6
hover:shadow-2xl
transition
">



<h2 className="
text-xl
font-bold
flex
gap-2
items-center
mb-3
">


<Activity/>


AI Healthcare Summary


</h2>




<div className="
text-gray-700
whitespace-pre-line
leading-relaxed
">


{insight}


</div>




</div>












<div className="
grid
lg:grid-cols-2
gap-6
">







{/* RISK ANALYSIS */}


<div className="
bg-white/80
backdrop-blur-xl
rounded-3xl
border
border-white
shadow-xl
p-6
hover:-translate-y-2
duration-300
transition
">



<h2 className="
font-bold
text-xl
flex
gap-2
mb-4
">


<HeartPulse

className="text-red-500"

/>


Patient Risk Analysis


</h2>





{

riskData.length===0 ?


<p>

No risk data available

</p>



:


riskData.map(

(item,index)=>(



<div

key={index}

className="
bg-gradient-to-r
from-red-50
to-white
border
border-red-100
rounded-2xl
p-4
mb-3
hover:shadow-md
transition
"

>



<p>

Patient:

<b>

{" "}

{item.patient || "Unknown"}

</b>


</p>





<p>

Risk:

<span

className={`
${riskColor(item.risk)}
font-bold
ml-2
`}

>


{item.risk}


</span>


</p>




</div>



)


)


}





</div>













{/* DISEASE TREND */}



<div 
className="
bg-white
rounded-2xl
shadow
p-6
"
>



<h2 className="
font-bold
text-xl
flex
gap-2
mb-4
">



<AlertTriangle

className="text-orange-500"

/>


Disease Trends


</h2>





{

diseaseTrend.length===0 ?


<p>

No trends available

</p>



:



diseaseTrend.map(

(item,index)=>(



<div

key={index}

className="
bg-gradient-to-r
from-orange-50
to-white
border
border-orange-100
rounded-2xl
p-4
mb-3
hover:shadow-md
transition
"

>



<p className="font-semibold">


{item.disease}


</p>




<p className="text-gray-600">


{item.prediction}


</p>




</div>



)


)


}





</div>






</div>













{/* AI CHAT */}


<div className="
mt-6
rounded-3xl
p-6
shadow-2xl
bg-gradient-to-br
from-purple-600
via-purple-500
to-blue-600
text-white
">





<h2 className="
text-xl
font-bold
flex
gap-2
mb-4
">



<Bot/>


Healthcare AI Assistant



</h2>







<div className="
flex
gap-3
">



<input

className="
bg-white
text-gray-800
rounded-2xl
p-3
flex-1
outline-none
focus:ring-4
focus:ring-purple-200
"


placeholder="
Ask healthcare question...
"


value={message}


onChange={

e=>

setMessage(
e.target.value
)

}



onKeyDown={(e)=>{


if(e.key==="Enter")

sendMessage();


}}


/>






<button


onClick={sendMessage}

className="
bg-white
text-purple-700
px-6
py-3
rounded-2xl
font-semibold
flex
items-center
gap-2
hover:bg-purple-100
transition
"
>


<Send size={18}/>


Ask


</button>




</div>








{

chatResponse &&


<div className="
mt-4
bg-white/20
backdrop-blur
p-4
rounded-2xl
whitespace-pre-line
border
border-white/30
">


{chatResponse}


</div>


}





</div>







</div>


);


}