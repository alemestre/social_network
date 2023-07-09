import { defineStore } from 'pinia'
import cloneDeep from 'lodash.clonedeep'
import axios from 'axios'

export const usePostStore = defineStore('post', {
  state: () => {
    return {
      post: null,
      posts: [],
      my_posts: []
    }
  },
  actions: {
    async getPosts() {
      try {
        const response = await axios.get('http://localhost:3000/posts')
        console.log('on récupère tous les posts', response.data)
        this.$patch({ posts: cloneDeep(response.data.posts) })
      } catch (error) {
        console.log(error)
      }
    },

    //récupérer tous les posts créés par un utilisateur
    async getMyPosts(id) {
      try {
        const response = await axios.get(`http://localhost:3000/posts/?user=${id}`)
        console.log("on récupère les posts d'un user", response.data)
        this.$patch({ my_posts: cloneDeep(response.data.posts) })
      } catch (error) {
        console.log(error)
      }
    },

    //récupérer un post à partir de son id
    async getPost(id) {
      try {
        const response = await axios.get(`http://localhost:3000/posts/${id}`)
        this.$patch({ post: cloneDeep(response.data.post) })
      } catch (error) {
        console.log(error)
      }
    },

    //modifier un post à partir de son id
    async editPost(post) {
      try {
        const response = await axios.patch(`http://localhost:3000/posts/${post._id}`, post)
        this.$patch({ post: cloneDeep(response.data.post) })
        console.log(this.post)
      } catch (error) {
        console.log(error)
      }
    },

    // ajouter un post
    async addPost(post) {
      try {
        const response = await axios.post('http://localhost:3000/posts', post)
        console.log('add one post', response.data)
        return { success: 'Votre post a bien été créé' }
      } catch (error) {
        console.log(error)
        return { error }
      }
    },

    // ajouter un commentaire à un post
    async addComment(postId, data) {
      try {
        const response = await axios.patch(`http://localhost:3000/posts/comment/${postId}`, data)
        console.log('add a comment', response.data)
        return { success: 'Commentaire ajouté !' }
      } catch (error) {
        console.log(error)
        return { error }
      }
    }
  }
})
