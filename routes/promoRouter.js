const express=require("express");
const bodyParser=require("body-parser");

const promosRouter=express.Router();
promosRouter.use(bodyParser.json());
promosRouter.route("/")
.all((req,res,next)=>{
    res.statusCode=200;
    res.setHeader("Content-Type","text/plain");
    next();
})
.get((req,res)=>{
    res.end("Se enviaran todas las promos");
})
.post((req,res)=>{
    res.write("Se creara una nueva promo");
    res.end("Descripcion:"+req.body.description+" Descuento:"+req.body.discount);
})
.put((req,res)=>{
    res.statusCode=403;
    res.end("Operacion no soportada para /promotions");
})
.delete((req,res)=>{
    res.end("Se eliminaran todas las promos");
});

module.exports=promosRouter;