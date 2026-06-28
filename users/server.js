const express=require("express");


const app=express();


app.get("/",(req,res)=>{

res.json({

service:"users",

status:"running"

});

});


app.listen(3001,()=>{

console.log("Users service running on 3001");

});
