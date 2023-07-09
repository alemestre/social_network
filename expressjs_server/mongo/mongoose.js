require('dotenv').config()
const mongoose = require('mongoose')

const mongo_username = process.env.MONGO_USERNAME
const mongo_password = process.env.MONGO_PASSWORD
const cluster = process.env.MONGO_CLUSTER
const db = process.env.MONGO_DB

// Connexion à la base de données MongoDB Atlas
const connectDB = () => {
    mongoose.connect(`mongodb+srv://${mongo_username}:${mongo_password}@${cluster}/${db}?retryWrites=true&w=majority`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('Connexion à la base de données MongoDB Atlas réussie');
    })
    .catch((err) => {
      console.error('Erreur de connexion à la base de données MongoDB Atlas', err);
    });

}

module.exports = connectDB