<template>
  <div v-if="error" class="d-flex justify-content-center">
    <div class="alert alert-warning" role="alert">{{ error }}</div>
  </div>
  <form @submit.prevent="onSubmit">
    <div class="form-group my-3">
      <label for="inputUserName">Identifiant</label>
      <input required="true" type="text" class="form-control" id="inputUserName" name="userName" v-model="userName" />
    </div>
    <div class="form-group my-3">
      <label for="exampleInputPassword1">Mot de passe</label>
      <input required="true" type="password" class="form-control" id="exampleInputPassword1" name="password"
        v-model="password" />
    </div>
    <div class="d-flex justify-content-center my-3">
      <button type="submit" class="btn btn-primary">Connexion</button>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import { useSecurityStore } from '../stores/securityStore'
import { mapActions } from 'pinia'

export default {
  data() {
    return {
      userName: '',
      password: '',
      error: null
    }
  },
  methods: {
    // on importe les méthodes du store Security
    ...mapActions(useSecurityStore, ['setToken', 'setAuthorizationHeader']),
    async onSubmit() {
      const params = {
        userName: this.userName,
        password: this.password
      }
      await axios
        .post('http://localhost:3000/signin', params)
        .then((response) => {
          const token = response.data

          // Stocker le token dans le localStore
          this.setToken(token.token)
          this.setAuthorizationHeader()
        })
        .then(() => {
          this.$router.push({ name: 'home' })
        })
        .catch((error) => {
          console.log(error)
          this.error = error.response.data.error
        })
    }
  }
}
</script>
