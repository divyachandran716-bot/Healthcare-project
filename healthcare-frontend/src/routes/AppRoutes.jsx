import {
  Routes,
  Route
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Layout from "../components/layout/Layout";

import ProtectedRoute from "./ProtectedRoute";

import AdminDashboard from "../pages/admin/Dashboard";
import Patients from "../pages/admin/Patients";
import Doctors from "../pages/admin/Doctors";
import Nurses from "../pages/admin/Nurses";
import Appointments from "../pages/admin/Appointments";
import MedicalReports from "../pages/admin/MedicalReports";
import Pharmacy from "../pages/admin/Pharmacy";
import PharmacyBilling from "../pages/admin/PharmacyBilling";
import Analytics from "../pages/admin/Analytics";
import AIInsights from "../pages/admin/AIInsights";
import EmergencyAlerts from "../pages/admin/EmergencyAlerts";

import DoctorDashboard from "../pages/doctor/Dashboard";
import DoctorLayout from "../pages/doctor/DoctorLayout";
import DoctorPatients from "../pages/doctor/Patients";
import DoctorAppointments from "../pages/doctor/Appointments";
import DoctorPrescriptions from "../pages/doctor/Prescriptions";
import DoctorReports from "../pages/doctor/Reports";

import NurseDashboard from "../pages/nurse/Dashboard";
import NurseLayout from "../pages/nurse/NurseLayout";
// import NurseSidebar from "../pages/nurse/NurseSidebar";
import NursePatients from "../pages/nurse/Patients";
import NurseVitalSigns from "../pages/nurse/VitalSigns";
import NursingNotes from "../pages/nurse/NursingNotes";
import NurseEmergencyAlerts from "../pages/nurse/EmergencyAlerts";
import NurseAppointments from "../pages/nurse/Appointments";
import NurseMedicalReports from "../pages/nurse/MedicalReports";

export default function AppRoutes(){

return (

<Routes>


<Route 
path="/login"
element={<Login/>}
/>

<Route 
path="/"
element={<Login/>}
/>


<Route
path="/register"
element={<Register/>}
/>


{/* ADMIN ROUTES */}

<Route

path="/admin"

element={

<ProtectedRoute role="admin">

<Layout/>

</ProtectedRoute>

}

>

<Route
index
element={<AdminDashboard/>}
/>

<Route
path="patients"
element={<Patients/>}
/>

<Route
path="doctors"
element={<Doctors/>}
/>

<Route
path="nurses"
element={<Nurses/>}
/>

<Route
path="appointments"
element={<Appointments/>}
/>

<Route
path="reports"
element={<MedicalReports/>}
/>

<Route
path="pharmacy"
element={<Pharmacy/>}
/>

<Route
path="pharmacy-billing"
element={<PharmacyBilling/>}
/>

<Route
path="analytics"
element={<Analytics/>}
/>

<Route
path="ai-insights"
element={<AIInsights/>}
/>

<Route
path="emergency-alerts"
element={<EmergencyAlerts/>}
/>

</Route>


{/* DOCTOR ROUTES */}

<Route

path="/doctor"

element={

<ProtectedRoute role="doctor">

<DoctorLayout/>

</ProtectedRoute>

}

>

<Route
index
element={<DoctorDashboard/>}
/>


<Route
path="patients"
element={<DoctorPatients/>}
/>

<Route
path="appointments"
element={<DoctorAppointments/>}
/>

<Route
path="prescriptions"
element={<DoctorPrescriptions/>}
/>

<Route
path="reports"
element={<DoctorReports/>}
/>

</Route>
{/* NURSE ROUTES */}


<Route

path="/nurse"

element={

<ProtectedRoute role="nurse">

<NurseLayout/>

</ProtectedRoute>

}

>


<Route
index
element={<NurseDashboard/>}
/>


<Route
path="patients"
element={<NursePatients/>}
/>


<Route
path="vitals"
element={<NurseVitalSigns/>}
/>


<Route
path="notes"
element={<NursingNotes/>}
/>


<Route
path="emergency-alerts"
element={<NurseEmergencyAlerts/>}
/>


<Route
path="appointments"
element={<NurseAppointments/>}
/>


<Route
path="reports"
element={<NurseMedicalReports/>}
/>


</Route>

</Routes>

)

}