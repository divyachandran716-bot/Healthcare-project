export default function Button({

children,
onClick,
variant="primary",
type="button"

}){


const styles={

primary:
"bg-teal-600 text-white hover:bg-teal-700",

danger:
"bg-red-600 text-white hover:bg-red-700",

secondary:
"bg-slate-200 text-slate-700 hover:bg-slate-300"

};


return (

<button

type={type}

onClick={onClick}

className={`
px-5
py-3
rounded-xl
font-medium
transition
${styles[variant]}
`}

>

{children}

</button>

)

}