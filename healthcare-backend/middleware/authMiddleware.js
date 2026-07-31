import jwt from "jsonwebtoken";


export const protect = async(req,res,next)=>{

try{


const authHeader = req.headers.authorization;


console.log("AUTH HEADER:",authHeader);



const token =
authHeader?.split(" ")[1];


console.log("TOKEN:",token);



if(!token){

return res.status(401).json({

message:"No token"

});

}



const decoded =
jwt.verify(
token,
process.env.JWT_SECRET
);



console.log("DECODED TOKEN:",decoded);



req.user = decoded;



next();


}

catch(error){


console.log("JWT ERROR:",error.message);


return res.status(401).json({

message:"Invalid token"

});


}


};

export const authorize = (...roles) => (req,res,next)=>{


console.log("======================");

console.log("Allowed Roles:",roles);

console.log("Request User:",req.user);

console.log("Current Role:",req.user?.role);

console.log("======================");



if(!req.user){

return res.status(401).json({

success:false,

message:"User not authenticated"

});

}




const userRole =
req.user.role?.toLowerCase();



const allowedRoles =
roles.map(
role=>role.toLowerCase()
);



if(!allowedRoles.includes(userRole)){


return res.status(403).json({

success:false,

message:
`Access denied. Required role: ${roles.join(", ")}`

});

}



next();


};