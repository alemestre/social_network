import { defineStore } from 'pinia'
import cloneDeep from 'lodash.clonedeep'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    userFavoritesPosts: []
  }),
  actions: {
    //Récupère les infos de l'utilisateur connecté
    async getUserData() {
      try {
        const response = await axios.get(`http://localhost:3000/user`)
        this.$patch({ user: cloneDeep(response.data.user) })
        return response
      } catch (error) {
        return error
      }
    },
    //Modifier le password du user
    async updatePassword(data) {
      try {
        const response = await axios.patch(`http://localhost:3000/user/password`, data)
        this.$patch({ user: cloneDeep(response.data.user) })
        return { success: response }
      } catch (error) {
        return { error }
      }
    },
    //Modifier les infos d'un user
    async updateInfo(data) {
      try {
        const response = await axios.patch(`http://localhost:3000/user/info`, data)
        this.$patch({ user: cloneDeep(response.data.user) })
        return { success: response }
      } catch (error) {
        return { error }
      }
    },
    async addPostAsFavorite(data) {
      try {
        await axios.patch(`http://localhost:3000/user/favorite`, data)
        return { success: 'Post ajouté aux favoris' }
      } catch (error) {
        return { error }
      }
    },
    async removePostFromFavorites(data) {
      console.log(data, 'dans le user store')
      try {
        await axios.delete(`http://localhost:3000/user/favorite/${data.post}`)
      } catch (error) {
        return { error }
      }
    },
    async getUserFavoritesPosts(id) {
      try {
        const response = await axios.get(`http://localhost:3000/user/favorite/${id}`)
        this.$patch({ userFavoritesPosts: cloneDeep(response.data.favorites) })
      } catch (error) {
        return { error }
      }
    }
  }
})
