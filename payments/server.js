const express=require("express");


const app=express();


const payments=[


{

id:1,

orderId:1,

amount:65000,

status:"SUCCESS"

}


];



app.get("/",(req,res)=>{


res.json({

service:"payments",

status:"running"

});


});




app.get("/payments",(req,res)=>{


res.json(payments);


});





app.get("/health",(req,res)=>{


res.json({

service:"payments",

status:"healthy"

});


});



app.listen(3004,()=>{


console.log(

"Payments service running on 3004"

);


});
