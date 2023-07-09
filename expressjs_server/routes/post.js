const express = require('express')
const router = express.Router()
const postCtrl = require('../controller/postController')

// on charge les middlewares externe
const middleware= require('../middleware/middleware')

// routes liées aux posts
router.get('/', postCtrl.getPosts)
router.post('/', middleware.isUserLogged, postCtrl.addOne)
router.get('/:id', postCtrl.getPost)
router.patch('/:id', middleware.isUserLogged, middleware.isUserAllowedToEdit, postCtrl.updatePost)
router.patch('/comment/:id', middleware.isUserLogged, middleware.isUserAllowedToComment, postCtrl.addComment)


module.exports = router