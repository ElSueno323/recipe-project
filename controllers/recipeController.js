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
            res.render('recipes.ejs',{recipesList});
        })
    })

    app.get('/:id',function(req,res){
        Recipes.findById({_id:req.params.id}).then((recipe)=>{
            res.render('detail.ejs',{recipe});
        }).catch((err)=>{
            res.render('error.ejs',{err});
        })
    })

    app.post('/delete',function(req,res){
        Recipes.findByIdAndRemove({_id:req.body.id}).then((recipe)=>{
            res.redirect('/');
        }).catch((err)=>{
            res.render('error.ejs',{err});
    })}
    )

    app.post('/add',function(req,res){
        Recipes.create(req.body).then((recipe)=>{
            res.redirect('/');
        })
    })
};