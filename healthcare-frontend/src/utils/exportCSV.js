export const exportCSV = (data, fileName)=>{


if(!data || data.length===0){

alert("No data available");

return;

}


const headers = Object.keys(data[0]);


const csvRows=[

headers.join(",")

];


data.forEach(row=>{


const values=headers.map(

header=>{

return `"${row[header] ?? ""}"`;

}

);


csvRows.push(values.join(","));


});



const csvString =
csvRows.join("\n");



const blob = new Blob(

[csvString],

{

type:"text/csv"

}

);



const url =
window.URL.createObjectURL(blob);



const link =
document.createElement("a");


link.href=url;


link.download=fileName;


link.click();


window.URL.revokeObjectURL(url);


};