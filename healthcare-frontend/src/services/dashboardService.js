import API from "./api";


export const getDashboardData = async()=>{

const response =
await API.get("/analytics/dashboard");


return response.data;

};