/**
 * Establece una conexión a la base de datos MongoDB utilizando Mongoose.
 */

const mongoose = require('mongoose');

const getConnection = async () => {

    try{
        const url = 'mongodb://user_movie:LQqB1imDfQIlZmoE@ac-ywtedyo-shard-00-00.hhjcm17.mongodb.net:27017,ac-ywtedyo-shard-00-01.hhjcm17.mongodb.net:27017,ac-ywtedyo-shard-00-02.hhjcm17.mongodb.net:27017/iudmovies?ssl=true&replicaSet=atlas-1np2c9-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

        await mongoose.connect(url);
        console.log('Conexión exitosa');
        
    }catch(error){
        console.log(error);
    }
}

module.exports = { getConnection, }