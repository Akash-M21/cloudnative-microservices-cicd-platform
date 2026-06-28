const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");


const app = express();


app.use(express.json());


app.use(express.static("public"));


// Users Service
app.use(
"/api/users",
createProxyMiddleware({

target:"http://users:3001",

changeOrigin:true,

pathRewrite:{
"^/api/users":""
}

})
);



// Products Service
app.use(
"/api/products",
createProxyMiddleware({

target:"http://products:3002",

changeOrigin:true,

pathRewrite:{
"^/api/products":""
}

})
);



// Orders Service
app.use(
"/api/orders",
createProxyMiddleware({

target:"http://orders:3003",

changeOrigin:true,

pathRewrite:{
"^/api/orders":""
}

})
);



// Payments Service
app.use(
"/api/payments",
createProxyMiddleware({

target:"http://payments:3004",

changeOrigin:true,

pathRewrite:{
"^/api/payments":""
}

})
);



app.get("/health",(req,res)=>{

res.json({

service:"API Gateway",

status:"running"

});

});



app.listen(8080,()=>{

console.log(
"API Gateway running on port 8080"
);

});
