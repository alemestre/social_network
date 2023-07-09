<!-- eslint-disable vue/multi-word-component-names -->
<template >
  <div class="card my-2 mx-auto" :style="{ width: '25rem' }">
    <div class="card-body d-flex flex-column justify-content-between">
      <div class="">
        <h5 class="card-title text-center pb-2">{{ post.title }}</h5>
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="card-subtitle mb-2 text-body-secondary fs-6 fw-light">Auteur.e : {{ post.author.userName }}</h6>
          <h7 class="card-subtitle mb-2 fw-lighter h8"> {{ postDate }}
          </h7>
        </div>

        <p class="card-text">
          {{ post.content }}
        </p>
      </div>
      <div v-if="token" class="d-flex justify-content-around">
        <BButton v-if="originUrl == 'home'" :to="{ name: 'post', params: { id: post._id } }"
          class="card-link text-decoration-none my-3" variant="outline-info" size="sm">Consulter</BButton>
        <BButton v-if="decodedToken.data.id == post.author._id"
          :to="{ name: 'edit-post', params: { id: post._id, originUrl: originUrl } }"
          class="card-link text-decoration-none my-3" variant="outline-dark" size="sm">Modifier</BButton>
      </div>
    </div>
  </div>
</template>
<script>
import { useSecurityStore } from '../stores/securityStore'
import { mapActions, mapState } from 'pinia'

export default {
  data() {
    return {
      error: null,
      content: ''
    }
  },
  props: ['post', 'originUrl'],
  computed: {
    ...mapState(useSecurityStore, ['token', 'decodedToken']),

    postDate() {
      const postDate = new Date(this.post.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', year: 'numeric', month: 'numeric', })
      return postDate
    },
  },
  methods: {
    // on importe les méthodes du store User
    ...mapActions(useSecurityStore, ['setToken', 'setAuthorizationHeader']),
    comment() { }
  },
  beforeMount() {
    console.log(this.post.comments)
    console.log(this.originUrl)
  }
}

</script>
