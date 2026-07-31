// =====================================
// ROLE AUTHORIZATION MIDDLEWARE
// =====================================


export const authorize = (...roles) => {


return (req, res, next) => {


console.log("=================");
console.log("Allowed Roles:", roles);
console.log("Current User:", req.user);
console.log("Current Role:", req.user?.role);
console.log("=================");




// Check user exists

if(!req.user){


return res.status(401).json({

success:false,

message:"User not authenticated"

});


}




// Check role permission

if(!roles.includes(req.user.role)){


return res.status(403).json({

success:false,

message:

`Access denied. Required role: ${roles.join(", ")}`

});


}




next();


};


};