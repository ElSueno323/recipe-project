var mongoose=require('mongoose');

var Schema= mongoose.Schema;

// Allows you to set up a recipe model
var recipeSchema=new Schema({
    name:String,
    description:String,
    ingredients:[String],
    instructions:String,
    created_at:Date,
    updated_at:Date
});

var Recipes=mongoose.model('Recipes',recipeSchema);

module.exports=Recipes;