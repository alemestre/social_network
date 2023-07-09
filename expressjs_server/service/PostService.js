const Post = require('../models/Post')
const Comment = require('../models/Comment')

exports.getPosts= () => {
    return Post.find().sort({ createdAt: -1 })
    .populate('author').exec();
}

exports.getPostsByAuthor= (author) => {
    return Post.find({author}).sort({ createdAt: -1 })
    .populate('author').exec();
}


exports.addOne = async (post) => {
    if(!post.title) {
        throw new Error("CREATE POST :: invalid title")
    }
    if(!post.content) {
        throw new Error("CREATE POST :: invalid content")
    }
    const addedPost = new Post(post );
    await addedPost.save();
    return addedPost
}

exports.getOne = async (id) => {
    if(!id) {
        throw new Error("GET POST :: invalide id")
    }
   return Post.findById(id).populate('author').populate({
    path: 'comments',
    populate: {
      path: 'author',
      model: 'User',
      select : 'userName _id'
    }}).exec();
}


exports.updateOne = async (id, updatedPost) => {
    if(!id) {
        throw new Error("UPDATE POST :: invalide id")
    }
    if(!updatedPost) {
        throw new Error("UPDATE POST :: invalid updated data")
    }
    await Post.updateOne({
      _id: id
    }, {...updatedPost})

   return Post.findById(id)

}

exports.addComment = async (postId, commentModel) => {
    // Exemple d'ajout d'un commentaire à un post
    const post = await Post.findById(postId);
    const comment = new Comment(commentModel);
    await comment.save();

    post.comments.push(comment._id);
    await post.save();
}