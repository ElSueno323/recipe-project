var configValues = require('./config');


module.exports = {
    
    /**
     * Retrieves the database connection string.
     *
     * @return {string} The MongoDB connection string.
     */
    getDbConnectionString: function() {

        return 'mongodb+srv://'+configValues.username+':'
        +configValues.pwd+'@cluster0.aqb3jsr.mongodb.net/recipedb';
    }


}