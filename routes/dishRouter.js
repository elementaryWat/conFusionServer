const express=require("express");
const bodyParser=require("body-parser");

const dishRouter=express.Router();
const Dishes=require("../models/dishes");

dishRouter.use(bodyParser.json());
dishRouter.route("/")
.get((req,res,next)=>{
    Dishes.find({}).exec()
    .then((dishes)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","appication/json");
        res.json(dishes);
    }).catch(err=>next(err))
}).post((req,res,next)=>{
    Dishes.create(req.body)
    .then((dish)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","appication/json");
        res.json(dish);
    }).catch(err=>next(err))
}).put((req,res)=>{
    res.statusCode=403;
    res.end("Operacion no soportada para /dishes");
}).delete((req,res,next)=>{
    Dishes.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","appication/json");
        res.json(resp);
    })
    .catch(err=>next(err))
});
dishRouter.route("/:dishId")
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then(dish=>{
        res.statusCode=200;
        res.setHeader("Content-Type","appication/json");
        res.json(dish);
    }).catch(err=>next(err))
})
.post((req,res)=>{
    res.statusCode=403;
    res.end("Operacion no soportada para /dishes/"+req.params.dishId);
})
.put((req,res,next)=>{
    Dishes.findByIdAndUpdate(req.params.dishId,
    {$set:req.body},{
        new:true
    })
    .then(dish=>{
        res.statusCode=200;
        res.setHeader("Content-Type","appication/json");
        res.json(dish);
    }).catch(err=>next(err))
})
.delete((req,res,next)=>{
    Dishes.findByIdAndRemove(req.params.dishId)
    .then(resp=>{
        res.statusCode=200;
        res.setHeader("Content-Type","appication/json");
        res.json(resp);
    }).catch(err=>next(err))
});

module.exports=dishRouter;