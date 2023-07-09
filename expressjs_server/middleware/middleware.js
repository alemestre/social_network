require('dotenv').config()
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const  { getUserById } = require('../service/UserService')
const  { getOne } = require('../service/PostService')

exports.isUserLogged = async(req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const [scheme, token]=req.headers.authorization.split(' ')
        jwt.verify(token, JWT_SECRET , async(err, decode)=>{
            if(err){
                res.status(401).json("NOT AUTHORIZED");
            } else {
                req.user = await getUserById(decode.data.id)
                next()
            }
        })
    } else {
        return res.status(401).json("NOT AUTHORIZED");
    }
};

// middleware pour vérifier que l'utilisateur connecté peut modifier le post 
exports.isUserAllowedToEdit= async(req, res, next) => {
    const id =req.params.id

    const post = await getOne(id)

    if (req.user._id.equals(post.author._id))
    {
        next()
    } else {
        return res.status(401).json("NOT AUTHORIZED");
    }
};

// middleware pour vérifier que l'utilisateur connecté peut ajouter un commentaire au post
exports.isUserAllowedToComment= async(req, res, next) => {
    const id =req.params.id

    const post = await getOne(id)

    if (!req.user._id.equals(post.author._id))
    {
        next()
    } else {
        return res.status(401).json("NOT AUTHORIZED");
    }
};

// middleware pour vérifier que l'utilisateur peut liker au post
exports.isUserAllowedToLike= async(req, res, next) => {
    const postId =req.body.post

    const post = await getOne(postId)

    if (!req.user._id.equals(post.author._id))
    {
        next()
    } else {
        return res.status(401).json("NOT AUTHORIZED");
    }
};


