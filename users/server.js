const express=require("express");


const app=express();


app.use(express.json());



const users=[

{
id:1,
name:"Akash",
email:"akash@example.com"
},

{
id:2,
name:"DevOps User",
email:"devops@example.com"
}

];



app.get("/",(req,res)=>{

res.json({

service:"users",

status:"running"

});

});



app.get("/users",(req,res)=>{

res.json(users);

});



app.get("/health",(req,res)=>{

res.json({

service:"users",

status:"healthy"

});

});



app.listen(3001,()=>{

console.log(
"Users service running on 3001"
);

});
