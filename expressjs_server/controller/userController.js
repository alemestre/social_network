const authService = require('../service/AuthService')
const  userService = require('../service/UserService')


exports.getUserByUserName = async (req, res) => {
    try {
        const { userName} = req.body
        if(!userName) {
            throw new Error("GET USER :: paramètre invalide")
        }
        const user = await userService.getUserByUserName(userName)
        res.status(200).json({ user})
    } catch (e) {
        console.log(e)
        res.status(500).json({ 'error' : e.message })

    }
}
exports.getUserData = async (req, res) => {
    try {
        const user = req.user
        res.status(200).json({ user})
    } catch (e) {
        console.log(e)
        res.status(500).json({ 'error' : e.message })

    }
}

exports.updatePassword = async (req, res) => {
    try { 
        await userService.updatePassword(req)
        res.status(200).json({'message': "Mot de passe modifié avec succès"})
    } catch (e) {
        console.log(e)
        res.status(500).json({ 'error' : e.message })

    }
}

exports.updateInfo = async (req, res) => {
    try { 
        await userService.updateInfo(req)
        res.status(200).json({'message': "Informations modifiées avec succès"})
    } catch (e) {
        console.log(e)
        res.status(500).json({ 'error' : e.message })

    }
}

exports.addAFavoritePost = async (req, res) => {
    try { 
        await userService.addAFavoritePost(req)
        res.status(200).json({'message': "Le post a été ajouté à vos favoris"})
    } catch (e) {
        console.log(e)
        res.status(500).json({ 'error' : e.message })

    }
}

exports.removePostFromFavorite = async (req, res) => {
    try { 
        const user = await userService.removePostFromFavorite(req)
        res.status(200).json({user})
    } catch (e) {
        console.log(e)
        res.status(500).json({ 'error' : e.message })

    }
}

exports.getUserFavoritesPosts = async (req, res) => {
    try { 
        const favorites = await userService.getUserFavoritesPosts(req)
        res.status(200).json({favorites})
    } catch (e) {
        console.log(e)
        res.status(500).json({ 'error' : e.message })

    }
}


exports.signIn = async (req, res) => {
    try {
        const { userName, password } = req.body
        const token = await authService.signIn(userName, password)
        res.status(200).json({ token })
    } catch (e) {
        console.log(e)
        res.status(500).json({ 'error' : e.message })

    }
}

exports.signUp = async (req, res) => {
    try {
        const { userName, firstName, lastName, password } = req.body
        console.log(userName, firstName, lastName, password)
        const user = await authService.signUp(userName, firstName, lastName, password)
        res.status(201).json({ user })
            
    } catch (e) {
        console.log(e)
        res.status(500).json({ "error" : e.message  })

    }
}