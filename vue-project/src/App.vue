<template>
  <div class="container-fluid">
    <header class="d-flex flex-wrap justify-content-between py-3 px-4 mb-4 border-bottom">
      <div class="d-flex gap-4">
        <RouterLink :to="{ name: 'home' }"
          class="d-flex align-items-center gap-2 mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none text-primary">
          <i class="fa-sharp fa-light fa-chart-network"></i>
          <span class="fs-3">#çac'estcool</span>
        </RouterLink>
        <ul v-if="token" class="nav nav-pills gap-2">
          <li class="nav-item">
            <!-- on modifie la classe active sur chaque lien pour utiliser les classes de bootstrap "active" -->
            <RouterLink :to="{ name: 'my-posts' }" class="nav-link" active-class="active" exact-active-class="active">
              <i class="fa-solid fa-house" /> Mes posts
            </RouterLink>
          </li>
        </ul>
      </div>

      <ul v-if="!token" class="nav nav-pills gap-2">
        <li class="nav-item">
          <!-- on modifie la classe active sur chaque lien pour utiliser les classes de bootstrap "active" -->
          <RouterLink :to="{ name: 'sign-in' }" class="nav-link" active-class="active" exact-active-class="active">
            <i class="fa-solid fa-house" /> Se connecter
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/sign-up" class="nav-link" active-class="active" exact-active-class="active"><i
              class="fa-solid fa-file-invoice"></i>
            S'enregistrer
          </RouterLink>
        </li>
      </ul>
      <ul v-else class="nav nav-pills gap-2 align-items-center">
        <li class="nav-item">
          <RouterLink :to="{ name: 'profile' }" class="nav-link" active-class="active" exact-active-class="active">
            <i class="fa-solid fa-user"></i> Mon profil
          </RouterLink>
        </li>

        <li @click="logOut" class="nav-link" role="button">
          <i class="fa fa-sign-out me-1" aria-hidden="true"></i>Se déconnecter
        </li>
      </ul>
    </header>
    <main class="container main-router-container">
      <RouterView />
    </main>
    <footer class="py-3 my-4 border-top text-center">
      <span class="mb-3 mb-md-0 text-body-secondary">© {{ currentYear }} Jwt TP</span>
    </footer>
  </div>
</template>

<script>
import { useSecurityStore } from './stores/securityStore'
import { mapState, mapActions } from 'pinia'

export default {
  data() {
    return {
      userName: '',
      password: '',
      error: null
    }
  },
  computed: {
    ...mapState(useSecurityStore, ['token'])
  },
  methods: {
    ...mapActions(useSecurityStore, ['removeAuthorizationHeader', 'removeToken']),
    logOut() {
      this.removeToken()
      this.removeAuthorizationHeader()
      this.$router.push({ name: 'home' })
    }
  },
  mounted() {
    console.log(this.token)
  }
}
</script>
