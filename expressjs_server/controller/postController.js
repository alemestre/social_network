
const  postService = require('../service/PostService')



exports.getPosts = async (req, res) => {
    const user = req.query.user
    if (user) {
        try {
            const posts = await postService.getPostsByAuthor(user)
            res.status(200).json({ posts})
        } catch (e) {
            console.log(e)
            res.status(500).json({ 'error' : e.message })
    
        }

    } else {
        try {
            const posts = await postService.getPosts()
            res.status(200).json({ posts})
        } catch (e) {
            console.log(e)
            res.status(500).json({ 'error' : e.message })
    
        }

    }
}

exports.addOne= async (req, res) => {
    try {
        const postModel = req.body
        postModel.author = req.user
        const post = await postService.addOne(postModel)
        res.status(201).json({ post })
    } catch (e) {
        console.log(e)
        res.status(500).json({ 'error' : e.message })

    }
}

exports.getPost= async (req, res) => {
    try {
        const id = req.params.id
        const post = await postService.getOne(id)
        res.status(200).json({ post})
    } catch (e) {
        console.log(e)
        res.status(500).json({ 'error' : e.message })

    }
}

exports.updatePost= async (req, res) => {
    try {
        const id = req.params.id
        const updatedPost = req.body
        const post = await postService.updateOne(id, updatedPost)
        res.status(200).json({ post})
    } catch (e) {
        console.log(e)
        res.status(500).json({ 'error' : e.message })

    }
}


exports.addComment= async (req, res) => {
    try {
        const id = req.params.id
        const comment = req.body
        comment.author = req.user._id
        const post = await postService.addComment(id, comment)
        res.status(200).json({ post})
    } catch (e) {
        console.log(e)
        res.status(500).json({ 'error' : e.message })

    }
}