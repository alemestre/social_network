<template>
  <section v-if="!isRegistered">
    <div v-if="error" class="d-flex justify-content-center">
      <div class="alert alert-warning" role="alert">{{ error }}</div>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="form-group my-3">
        <label for="inputUserFirstName">Prénom</label>
        <input required="true" type="text" class="form-control" id="inputUserFirstName" name="userFirstName"
          v-model="firstName" />
        <label for="inputUserLastName">Nom</label>
        <input required="true" type="text" class="form-control" id="inputUserLastName" name="userLastName"
          v-model="lastName" />
        <label for="inputUserName">Identifiant</label>
        <input required="true" type="text" class="form-control" id="inputUserName" name="userName" v-model="userName" />
      </div>
      <div class="form-group my-3">
        <label for="exampleInputPassword1">Mot de passe</label>
        <input required="true" type="password" class="form-control" id="exampleInputPassword1" name="password"
          v-model="password" />
      </div>
      <div class="d-flex justify-content-center my-3">
        <button type="submit" class="btn btn-primary">Valider</button>
      </div>
    </form>
  </section>
  <section v-else>
    <div class="d-flex justify-content-center my-2">
      <div class="alert alert-warning" role="alert">{{ success }}</div>
    </div>
    <div class="text-center my-2">
      <p class="my-2">Connectez vous à votre espace en cliquant ici 👇</p>
      <BButton class="my-2" :to="{ name: 'sign-in' }" size="sm" variant="outline-primary" iconLeft="fa-right-to-bracket">
        Se connecter</BButton>
    </div>
  </section>
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
      firstName: '',
      lastName: '',
      error: null,
      success: null,
      isRegistered: false
    }
  },
  methods: {
    // on importe les méthodes du store Security
    ...mapActions(useSecurityStore, ['setToken', 'setAuthorizationHeader']),
    async onSubmit() {
      const userData = {
        userName: this.userName,
        firstName: this.firstName,
        lastName: this.lastName,
        password: this.password
      }
      console.log(userData)
      await axios
        .post('http://localhost:3000/signup', userData)
        .then(() => {
          this.isRegistered = true
          this.success = 'Votre compte a bien été créé !'
        })
        .catch((error) => {
          this.error = error.response.data.error
        })
    }
  }
}
</script>
