const User = require('../models/User')
const authService = require('../service/AuthService')

exports.getUserByUserName = (userName) => {
    return User.findOne({userName})
}

exports.getUserById = (id) => {
    return User.findById(id)
}

exports.addUser = async (userName, lastName,firstName, hashPassword) => {
    const user = new User({ userName, lastName, firstName, password:hashPassword });
    await user.save();
    return user
}

exports.updatePassword = async  (req) => {

    const { currentPassword, newPassword, confirmPassword } = req.body

    console.log(req.body)

    if (!currentPassword || !newPassword || !confirmPassword) {
        throw new Error('UPDATE PASSWORD: paramètres invalides')
    }

    if (newPassword !== confirmPassword) {
        throw new Error('UPDATE PASSWORD: Le nouveau mot de passe et le mot de passe de confirmation ne sont pas identiques');
    }

    const hash = await authService.checkPasswordbeforeUpdate(currentPassword, req.user.password, newPassword);
        
    await User.findByIdAndUpdate(req.user._id, {password : hash}) 
}

exports.updateInfo = async  (req) => {

    const { userName, firstName, lastName } = req.body

    if (!userName || !firstName || !lastName) {
        throw new Error('UPDATE INFO: Veuillez renseigner un identifiant, un prénom et un nom')
    }
    await User.findByIdAndUpdate(req.user._id, {userName: userName, firstName: firstName, lastName: lastName});      
}

exports.addAFavoritePost = async  (req) => {
    const postId = req.body.post

    if(!postId) {
        throw new Error("ADD A FAVORITE POST :: l'id du post n'est pas valide")
    }

    const user = await User.findById(req.user._id);
    user.favorites.push(postId);
    await user.save();
}

exports.removePostFromFavorite = async  (req) => {
    const postId = req.params.id
    
    if(!postId) {
        throw new Error("REMOVE A POST FROM FAVORITES :: l'id du post n'est pas valide")
    }

    const userId = req.user._id

    const user = await User.findByIdAndUpdate(userId, { $pull: { favorites: postId } }, { new: true })
    return user
}

exports.getUserFavoritesPosts = async  (req) => {
    const user = await User.findById(req.user._id).populate('favorites');
    const favorites = user.favorites
    return favorites;
}