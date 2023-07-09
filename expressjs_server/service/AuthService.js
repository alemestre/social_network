require('dotenv').config()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { getUserByUserName, addUser } = require('./UserService');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET

function hashPassword (plainTextPassword) {
    return bcrypt.hash(plainTextPassword, SALT_ROUNDS)
}

function comparePassword(plainTextPassword, hash) {
    return bcrypt.compare(plainTextPassword, hash)
}

function createToken(data) {
    return jwt.sign({data}, JWT_SECRET, {
        expiresIn: "1d"
    })
}

exports.signIn = async  (userName, password) => {
    
    if (!userName || !password) {
        throw new Error('SIGN IN :: paramètres invalides')
    }

    const user= await getUserByUserName(userName)

    if (!user) {
        throw new Error('SIGN IN: Erreur credentials');
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
        throw new Error('SIGN IN: Erreur credentials');
    }

    console.log('Authentification réussie');
    let token = createToken({id: user._id, userName: user.userName});

    return token;
}

exports.signUp = async  (userName, firstName, lastName,password) => {
    if (!userName || !password || !firstName || !lastName) {
        throw new Error('SIGN UP: paramètres invalides')
    }

    const checkUser= await getUserByUserName(userName)

    if (checkUser) {
        throw new Error('SIGN UP: Cet utilisateur existe déjà');
    }

    const hash = await hashPassword(password);
    
    const user = addUser(userName, firstName, lastName, hash)    
    return user
    
}


exports.checkPasswordbeforeUpdate = async  (passwordProvided, currentPassword, newPassword) => {

    const passwordMatch = await comparePassword(passwordProvided, currentPassword);

    console.log("password match", passwordMatch)

    if (!passwordMatch) {
        throw new Error('UPDATE PASSWORD: Le mot de passe renseigné ne correspond pas à votre mot de passe actuel');
    }

    const hash = await hashPassword(newPassword);
   
    return hash  
}
