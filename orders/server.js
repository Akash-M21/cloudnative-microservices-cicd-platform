const express=require("express");


const app=express();


app.use(express.json());



let orders=[

{
id:1,
userId:1,
productId:101,
status:"CREATED"
}

];



app.get("/",(req,res)=>{

res.json({

service:"orders",

status:"running"

});

});




app.get("/orders",(req,res)=>{

res.json(orders);

});





app.post("/orders",(req,res)=>{


const order={


id:orders.length+1,


userId:req.body.userId,


productId:req.body.productId,


status:"CREATED"


};



orders.push(order);



res.json(order);



});




app.get("/health",(req,res)=>{


res.json({

service:"orders",

status:"healthy"

});


});



app.listen(3003,()=>{

console.log(
"Orders service running on 3003"
);

});
