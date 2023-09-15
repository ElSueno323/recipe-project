var Recipes=require('../models/recipeModel');
var bodyParser=require('body-parser');

/**
 * Initializes the API routes for managing recipes.
 *
 * @param {Object} app - The Express app object.
 */
module.exports=function(app){
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    

    app.get('/api/setupRecipes', function(req, res){
        var start=[{
            name:"Pizza",
            description:'Pizza is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients',
            ingredients:["tomato","cheese","pepperoni","mushrooms"],
            instructions:"add tomato ,add cheese ,add pepperoni ,add mushrooms",
            created_at:new Date(),
            updated_at:new Date()
        },{
            name:"Lasagne",
            description:'Lasagne is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients',
            ingredients:["tomato","cheese","pepperoni","mushrooms"],
            instructions:"add tomato ,add cheese ,add pepperoni ,add mushrooms",
            created_at:new Date(),
            updated_at:new Date()
        }]
        Recipes.create(start).then((results)=>{
            res.send(results);
        })
    });
    
    //all recipes
    app.get('/api/recipes', function(req, res){
        Recipes.find({}).then((results)=>{
            res.json(results);
        }).catch((err)=>{
            res.send(err);
        });
    });

    //find with id
    app.get('/api/recipes/:id', function(req, res){
        Recipes.findById(req.params.id).then((results)=>{
            res.json(results);
        }).catch((err)=>{
            res.send(err);
        });
    })
    
    //create
    app.post('/api/recipes',function(req,res){
        Recipes.create(req.body).then((results)=>{
            res.json(results);
        }).catch((err)=>{
            res.send(err);
        });
    })

    //update
    app.put('/api/recipes/:id',function(req,res){
        Recipes.findByIdAndUpdate(req.params.id,req.body).then((results)=>{
            res.json(results);
        }).catch((err)=>{
            res.send(err);
        });
    })
    
    //delete
    app.delete('/api/recipes/:id',function(req,res){
        Recipes.findByIdAndRemove(req.params.id).then((results)=>{
            res.json(results);
        }).catch((err)=>{
            res.send(err);
        });
    })

};