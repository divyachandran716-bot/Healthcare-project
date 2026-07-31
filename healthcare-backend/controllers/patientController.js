import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";


// =================================
// GET ALL PATIENTS (ADMIN)
// =================================

export const getPatients = async (req, res) => {

    try {

        const patients = await Patient.find()
            .sort({
                createdAt: -1
            });


        res.status(200).json({

            success: true,

            count: patients.length,

            patients

        });


    }
    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};




// =================================
// GET SINGLE PATIENT
// =================================

export const getPatientById = async (req, res) => {

    try {

        const patient =
            await Patient.findById(req.params.id);



        if (!patient) {

            return res.status(404).json({

                success:false,

                message:"Patient not found"

            });

        }



        res.status(200).json({

            success:true,

            patient

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
// CREATE PATIENT
// =================================

export const createPatient = async(req,res)=>{

try{


let doctorId = null;


// If logged in user is doctor
if(req.user.role==="doctor"){


const doctor = await Doctor.findOne({
    email:req.user.email
});


if(!doctor){

return res.status(404).json({

success:false,
message:"Doctor profile not found"

});

}


doctorId = doctor._id;


}


// Create patient

const patient = await Patient.create({

...req.body,

doctor: doctorId

});



res.status(201).json({

success:true,

message:"Patient created successfully",

patient

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
// UPDATE PATIENT
// =================================

export const updatePatient = async(req,res)=>{


    try{


        const patient =
        await Patient.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true,
                runValidators:true
            }

        );



        if(!patient){

            return res.status(404).json({

                success:false,

                message:"Patient not found"

            });

        }



        res.status(200).json({

            success:true,

            message:"Patient updated successfully",

            patient

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
// DELETE PATIENT
// =================================

export const deletePatient = async(req,res)=>{


    try{


        const patient =
        await Patient.findByIdAndDelete(
            req.params.id
        );



        if(!patient){

            return res.status(404).json({

                success:false,

                message:"Patient not found"

            });

        }



        res.status(200).json({

            success:true,

            message:"Patient deleted successfully"

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
// GET LOGGED-IN DOCTOR PATIENTS
// =================================
// =================================
// GET LOGGED-IN DOCTOR PATIENTS
// =================================

export const getDoctorPatients = async(req,res)=>{

try{


console.log("USER:",req.user);


// Find doctor profile
const doctor = await Doctor.findOne({
    email:req.user.email
});


console.log("DOCTOR:",doctor);



if(!doctor){

return res.status(404).json({

success:false,

message:"Doctor profile not found"

});

}



// Find doctor patients

const patients = await Patient.find({

doctor:doctor._id

})
.populate("doctor")
.sort({
createdAt:-1
});



res.status(200).json({

success:true,

count:patients.length,

patients

});


}
catch(error){


console.log(
"GET DOCTOR PATIENT ERROR:",
error.message
);


res.status(500).json({

success:false,

message:error.message

});


}

};