import Medicine from "../models/Medicine.js";



// =================================
// GET ALL MEDICINES
// =================================

export const getMedicines = async(req,res)=>{

try{


const medicines = await Medicine.find()
.sort({
createdAt:-1
});



res.status(200).json({

success:true,

count:medicines.length,

medicines

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};







// =================================
// GET SINGLE MEDICINE
// =================================

export const getMedicineById = async(req,res)=>{


try{


const medicine =
await Medicine.findById(
req.params.id
);



if(!medicine){

return res.status(404).json({

success:false,

message:"Medicine not found"

});

}



res.status(200).json({

success:true,

medicine

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};








// =================================
// CREATE MEDICINE
// =================================

export const createMedicine = async(req,res)=>{


try{


const medicine =
await Medicine.create(
req.body
);



res.status(201).json({

success:true,

message:"Medicine added successfully",

medicine

});


}
catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};








// =================================
// UPDATE MEDICINE
// =================================

export const updateMedicine = async(req,res)=>{


try{


const medicine =
await Medicine.findByIdAndUpdate(

req.params.id,

req.body,

{

new:true,

runValidators:true

}

);



if(!medicine){

return res.status(404).json({

success:false,

message:"Medicine not found"

});

}



res.status(200).json({

success:true,

message:"Medicine updated successfully",

medicine

});


}
catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};








// =================================
// UPDATE STOCK
// =================================

export const updateStock = async(req,res)=>{


try{


const medicine =
await Medicine.findByIdAndUpdate(

req.params.id,

{

stock:req.body.stock

},

{

new:true

}

);



if(!medicine){

return res.status(404).json({

success:false,

message:"Medicine not found"

});

}



res.status(200).json({

success:true,

message:"Stock updated successfully",

medicine

});


}
catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};








// =================================
// DELETE MEDICINE
// =================================

export const deleteMedicine = async(req,res)=>{


try{


const medicine =
await Medicine.findByIdAndDelete(

req.params.id

);



if(!medicine){

return res.status(404).json({

success:false,

message:"Medicine not found"

});

}



res.status(200).json({

success:true,

message:"Medicine deleted successfully"

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};







// =================================
// LOW STOCK ALERT
// =================================

export const getLowStockMedicines = async(req,res)=>{


try{


const medicines =
await Medicine.find({

stock:{
$lte:10
}

});



res.status(200).json({

success:true,

count:medicines.length,

medicines

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};
