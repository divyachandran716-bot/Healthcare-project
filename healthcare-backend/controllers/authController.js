import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Doctor from "../models/Doctor.js";



// REGISTER

export const register = async(req,res)=>{

try{


const {
name,
email,
password,
role
}=req.body;



const existingUser =
await User.findOne({email});


if(existingUser){

return res.status(400).json({

success:false,
message:"User already exists"

});

}



const hashedPassword =
await bcrypt.hash(password,10);



const user =
await User.create({

name,
email,
password:hashedPassword,
role

});



// CREATE DOCTOR PROFILE

if(role==="doctor"){


await Doctor.create({

user:user._id,

name:name,

email:email,

specialization:"General Medicine"

});


}



res.status(201).json({

success:true,

message:"Registration successful"

});


}
catch(error){

res.status(500).json({

success:false,
message:error.message

});

}

};





// LOGIN


export const login = async(req,res)=>{

try{


const {
email,
password
}=req.body;



const user =
await User.findOne({email});



if(!user){

return res.status(404).json({

success:false,
message:"User not found"

});

}



const match =
await bcrypt.compare(
password,
user.password
);



if(!match){

return res.status(400).json({

success:false,
message:"Invalid password"

});

}



const token =
jwt.sign(

{
id:user._id,
email:user.email,
role:user.role
},

process.env.JWT_SECRET,

{
expiresIn:"1d"
}

);



res.json({

success:true,

token,

user:{
id:user._id,
name:user.name,
email:user.email,
role:user.role
}

});


}
catch(error){

res.status(500).json({

success:false,
message:error.message

});

}


};