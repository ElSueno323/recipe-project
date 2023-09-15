var Recipes=require('../models/recipeModel');
var bodyParser=require('body-parser');
const port=process.env.PORT || 3000;

/**
 * Initializes the routes for the given Express app.
 *
 * @param {Object} app - The Express app object.
 * @return {undefined} No return value.
 */
module.exports=function(app){
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    

    app.get('/',function(req,res){
        Recipes.find({}).then((recipesList)=>{
           res.render('layout',{title:'List of Recipes',content:'recipes',recipesList:recipesList});
        })
    })

    app.get('/:id',function(req,res){
        Recipes.findById({_id:req.params.id}).then((recipe)=>{
            res.render('layout',{title:"Recipe "+recipe.name,content:'detail.ejs',recipe:recipe});
        }).catch((err)=>{
            res.render('layout',{title:'Error',content:'error',error:err},);
        })
    })

    app.post('/delete',function(req,res){
        Recipes.findByIdAndRemove({_id:req.body.id}).then((recipe)=>{
            res.redirect('/');
        }).catch((err)=>{
            res.render('layout',{title:'Error',content:'error',error:err});
    })}
    )

    app.post('/add',function(req,res){
        req.body.created_at=new Date();
        req.body.updated_at=new Date();
        Recipes.create(req.body).then((recipe)=>{
           res.redirect('/');
        })
    })

    app.post('/update',function(req,res){
        req.body.updated_at=new Date();
        console.log(req.body);
        Recipes.findByIdAndUpdate({_id:req.body.id},req.body).then((recipe)=>{
            res.redirect('/');
        }).catch((err)=>{
            res.render('layout',{title:'Error',content:'error',error:err});
        })
    })
};