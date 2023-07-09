<template>
  <div class="home">
    <div v-if="success" class="d-flex justify-content-center">
      <div class="alert alert-success" role="alert">{{ success }}</div>
    </div>
    <div v-if="error" class="d-flex justify-content-center">
      <div class="alert alert-warning" role="alert">{{ error }}</div>
    </div>
    <div class="d-flex align-items-baseline justify-content-center my-3">
      <div class="card col-10 col-md-8 col-lg-6 col-xl-5">
        <div class="d-flex align-items-center justify-content-center py-3 card-header h4 ">
          Mes informations
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <div class="form-group row">
              <label for="userName" class="col-sm-4 col-form-label"><span class="fw-bold">Identifiant :</span></label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="userName" v-model="user.userName">
              </div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="form-group row">
              <label for="firstName" class="col-sm-4 col-form-label"><span class="fw-bold">Prénom :</span></label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="firstName" v-model="user.firstName">
              </div>
            </div>
          </li>
          <li class="list-group-item">
            <div class="form-group row">
              <label for="lastName" class="col-sm-4 col-form-label"><span class="fw-bold">Nom:</span></label>
              <div class="col-sm-8">
                <input type="text" class="form-control" id="lastName" v-model="user.lastName">
              </div>
            </div>
          </li>
        </ul>
        <div class="card-footer d-flex justify-content-center">
          <BButton @click="changeInfo" class="card-link text-decoration-none my-3" variant="outline-dark">Modifier mes
            informations
          </BButton>
        </div>
      </div>
    </div>
    <div class="d-flex align-items-baseline justify-content-center my-5 ">
      <div class="card col-10 col-md-8 col-lg-6 col-xl-5">
        <div class="d-flex align-items-center justify-content-center py-3 card-header h4 ">
          Modifier mot de passe
        </div>
        <div class="card-body d-flex justify-content-center">
          <form @submit.prevent="changePassword">
            <div class="form-group my-3">
              <label for="inputCurrentPassword">Mot de passe actuel</label>
              <input required="true" type="text" class="form-control" id="inputCurrentPassword" name="currentPassword"
                v-model="currentPassword" />
            </div>
            <div class="form-group my-3">
              <label for="inputNewPassword">Nouveau mot de passe</label>
              <input required="true" type="password" class="form-control" id="inputNewPassword" name="newPassword"
                v-model="newPassword" />
            </div>
            <div class="form-group my-3">
              <label for="inputConfirmPassword">Confirmer le nouveau mot de passe</label>
              <input required="true" type="password" class="form-control" id="inputConfirmPassword" name="newPassword"
                v-model="confirmPassword" />
            </div>
            <div class="d-flex justify-content-center my-3">
              <BButton class="card-link text-decoration-none my-3" variant="outline-dark">Modifier mon mot
                de passe
              </BButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore'
import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      showPasswordForm: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      error: null,
      success: null,
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
  },
  methods: {
    ...mapActions(useUserStore, ['getUserData', 'updatePassword', 'updateInfo']),

    consoleLog() {
      console.log('success :', this.success)
      console.log('error :', this.error)

    },

    changeInfo() {
      console.log("je change mes infos")
      const data = {
        userName: this.user.userName,
        firstName: this.user.firstName,
        lastName: this.user.lastName
      }
      this.error = ''
      this.success = ''
      this.updateInfo(data)
        .then((res) => {
          console.log(res)
          if (res.error) {
            this.error = res.error.response.data.error
            console.log(this.error)
          }
          if (res.success) {
            this.success = res.success.data.message
            console.log(this.success)
          }
        })
        .then(() => this.getUserData())
    },

    changePassword() {
      const data = {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword,
        confirmPassword: this.confirmPassword
      }
      this.error = ''
      this.success = ''
      this.updatePassword(data)
        .then((res) => {
          console.log(res)
          if (res.success) {
            this.success = res.success.data.message
            console.log(this.success)
          }
          if (res.error) {
            this.error = res.error.response.data.error
            console.log(this.error)
          }
        })
        .then(() => this.getUserData())
    },



  },

  beforeMount() {
    this.getUserData()
  },


}
</script>
