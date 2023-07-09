import { defineStore } from 'pinia'
import jwtDecode from 'jwt-decode'
import cloneDeep from 'lodash.clonedeep'
import axios from 'axios'

export const useSecurityStore = defineStore('security', {
  state: () => ({
    token: null,
    decodedToken: null
  }),
  actions: {
    setToken(token) {
      // Stocker le token dans le localStorage
      localStorage.setItem('token', token)
      this.$patch({ token: cloneDeep(token) })

      // Déchiffrer le token
      const decoded = jwtDecode(token)
      if (decoded) {
        this.$patch({ decodedToken: decoded })
      }
    },
    // Supprimer le token du localStorage
    removeToken(token) {
      // Stocker le token dans le localStorage
      localStorage.removeItem('token', token)
      this.$patch({ token: null })
    },
    setAuthorizationHeader() {
      // Ajouter le token dans l'en-tête des requêtes
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    },
    removeAuthorizationHeader() {
      delete axios.defaults.headers.common['Authorization']
    }
  }
})
