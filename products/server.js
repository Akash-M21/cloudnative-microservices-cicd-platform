const express=require("express");


const app=express();


const products=[


{
id:101,
name:"Laptop",
price:65000
},


{
id:102,
name:"Mobile",
price:25000
}


];



app.get("/",(req,res)=>{

res.json({

service:"products",

status:"running"

});

});



app.get("/products",(req,res)=>{

res.json(products);

});



app.get("/health",(req,res)=>{

res.json({

service:"products",

status:"healthy"

});

});



app.listen(3002,()=>{

console.log(
"Products service running on 3002"
);

});
