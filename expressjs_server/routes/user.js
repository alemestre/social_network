const express = require('express')
const router = express.Router()
const userCtrl = require('../controller/userController')

// on charge les middlewares externe
const middleware= require('../middleware/middleware')

// routes liées aux utilisateurs
router.get('/', middleware.isUserLogged, userCtrl.getUserData)
router.patch('/password', middleware.isUserLogged, userCtrl.updatePassword)
router.patch('/info', middleware.isUserLogged, userCtrl.updateInfo)
router.patch('/favorite', middleware.isUserLogged, middleware.isUserAllowedToLike, userCtrl.addAFavoritePost)
router.delete('/favorite/:id', middleware.isUserLogged, userCtrl.removePostFromFavorite)
router.get('/favorite/:id', middleware.isUserLogged, userCtrl.getUserFavoritesPosts)

module.exports = router