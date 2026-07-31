import Bill from "../models/Bill.js";
import Medicine from "../models/Medicine.js";


// =====================================
// CREATE BILL
// =====================================
export const createBill = async (req, res) => {

try {


const {

patient,
doctor,
medicines,
subtotal,
discount,
tax,
total,
paymentMethod

} = req.body;



// Generate Bill Number

const billNo = 
"INV-" + Date.now();



// Check medicine stock

for (const item of medicines) {


const medicine = await Medicine.findById(
item.medicine
);



if(!medicine){

return res.status(404).json({

success:false,

message:"Medicine not found"

});

}



if(medicine.stock < item.quantity){


return res.status(400).json({

success:false,

message:`Insufficient stock for ${medicine.name}`

});


}


}





// Reduce stock

for (const item of medicines) {


await Medicine.findByIdAndUpdate(

item.medicine,

{

$inc:{

stock:-item.quantity

}

}

);


}





// Create Bill

const bill = await Bill.create({

billNo,


patient,


doctor: doctor || null,


medicines,


subtotal,


discount,


tax,


total,


paymentMethod


});





res.status(201).json({

success:true,

message:"Bill created successfully",

bill

});



}

catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Failed to create bill",

error:error.message

});


}


};






// =====================================
// GET ALL BILLS
// =====================================


export const getBills = async(req,res)=>{


try{


const bills = await Bill.find()

.populate(
"patient",
"name"
)

.populate(
"doctor",
"name"
)

.populate(
"medicines.medicine",
"name"
)

.sort({

createdAt:-1

});



res.json({

success:true,

bills

});


}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};







// =====================================
// GET SINGLE BILL
// =====================================


export const getBillById = async(req,res)=>{


try{


const bill = await Bill.findById(

req.params.id

)

.populate(
"patient",
"name"
)

.populate(
"doctor",
"name"
)

.populate(
"medicines.medicine",
"name"
);



if(!bill){


return res.status(404).json({

success:false,

message:"Bill not found"

});


}



res.json({

success:true,

bill

});


}


catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};







// =====================================
// DELETE BILL
// =====================================


export const deleteBill = async(req,res)=>{


try{


await Bill.findByIdAndDelete(

req.params.id

);



res.json({

success:true,

message:"Bill deleted"

});


}

catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};