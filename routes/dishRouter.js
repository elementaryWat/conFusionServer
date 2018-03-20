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
    res.end("Operacion no soportada para /dishes/:dishId");
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
dishRouter.route("/:dishId/comments")
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if (dish!=null){
            res.statusCode=200;
            res.setHeader("Content-Type","appication/json");
            res.json(dish.comments);
        }else{
            var err=new Error("No se encontro el plato "+req.params.dishId);
            req.statusCode=404;
            return next(err);
        }
    }).catch(err=>next(err))
}).post((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if (dish!=null){
            dish.comments.push(req.body);
            dish.save()
            .then((dish)=>{
                res.statusCode=200;
                res.setHeader("Content-Type","appication/json");
                res.json(dish.comments);
            })
            .catch(err=>next(err));
        }else{
            var err=new Error("No se encontro el plato "+req.params.dishId);
            req.statusCode=404;
            return next(err);
        }
    }).catch(err=>next(err))
}).put((req,res)=>{
    res.statusCode=403;
    res.end("Operacion no soportada para /dishes/:dishId/comments");
}).delete((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if (dish!=null){
            var long=dish.comments.length;
            for (i=long-1;i>=0;i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save()
            .then(()=>{
                res.statusCode=200;
                res.setHeader("Content-Type","appication/json");
                res.json(dish);
            })
            .catch(err=>next(err));
        }else{
            var err=new Error("No se encontro el plato "+req.params.dishId);
            req.statusCode=404;
            return next(err);
        }
    })
    .catch(err=>next(err))
});
dishRouter.route("/:dishId/comments/:commentId")
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if (dish!=null){
            var comment=dish.comments.id(req.params.commentId);
            if (comment){
                res.statusCode=200;
                res.setHeader("Content-Type","appication/json");
                res.json(comment);
            }else{
                var err=new Error("No se encontro el comentario "+req.params.commentId);
                req.statusCode=404;
                return next(err);
            }
        }else{
            var err=new Error("No se encontro el plato "+req.params.dishId);
            req.statusCode=404;
            return next(err);
        }
    }).catch(err=>next(err))
})
.post((req,res)=>{
    res.statusCode=403;
    res.end("Operacion no soportada para /dishes/:dishId/comments/:commentId");
})
.put((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if (dish!=null){
            var comment=dish.comments.id(req.params.commentId);
            if (comment){
                if (req.body.review){
                    dish.comments.id(req.params.commentId).review=req.body.review;
                }
                if (req.body.comment){
                    dish.comments.id(req.params.commentId).comment=req.body.comment;
                }
                dish.save()
                .then(dish=>{
                    res.statusCode=200;
                    res.setHeader("Content-Type","appication/json");
                    res.json(dish);
                }).catch(err=>next(err))
            }else{
                var err=new Error("No se encontro el comentario "+req.params.commentId);
                req.statusCode=404;
                return next(err);
            }
        }else{
            var err=new Error("No se encontro el plato "+req.params.dishId);
            req.statusCode=404;
            return next(err);
        }
    }).catch(err=>next(err))
})
.delete((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if (dish!=null){
            var comment=dish.comments.id(req.params.commentId);
            if (comment){
                dish.comments.id(req.params.commentId).remove();
                dish.save()
                .then(dish=>{
                    res.statusCode=200;
                    res.setHeader("Content-Type","appication/json");
                    res.json(dish);
                }).catch(err=>next(err))
            }else{
                var err=new Error("No se encontro el comentario "+req.params.commentId);
                req.statusCode=404;
                return next(err);
            }
        }else{
            var err=new Error("No se encontro el plato "+req.params.dishId);
            req.statusCode=404;
            return next(err);
        }
    }).catch(err=>next(err))
});

module.exports=dishRouter;