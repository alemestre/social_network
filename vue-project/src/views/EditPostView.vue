<template>
  <main class="container">
    <div class="row">
      <h1 class="my-4 text-center">Modifier un article</h1>
    </div>
    <div v-if="error" class="d-flex justify-content-center">
      <div class="alert alert-warning" role="alert">{{ error }}</div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6 col-xl-4">
        <form @submit.prevent="edit">
          <div class="form-group my-3">
            <label for="title">Titre</label>
            <input required="true" type="text" class="form-control" id="title" name="title" v-model="post.title" />
          </div>
          <div class="form-group my-3">
            <label for="content">Contenu</label>
            <input required="true" type="text" class="form-control" id="content" name="content" v-model="post.content" />
          </div>
          <div class="d-flex justify-content-center my-3">
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { usePostStore } from '../stores/postStore'
import { mapActions, mapState } from 'pinia'

export default {
  data() {
    return {
      error: null
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    originUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(usePostStore, ['post'])
  },
  beforeMount() {
    this.getPost(this.id)
  },
  methods: {
    // on importe les méthodes du store Post
    ...mapActions(usePostStore, ['getPost', 'editPost']),
    async edit() {
      this.editPost(this.post)
        .then(() => {
          console.log('origin', this.originUrl)
          this.$router.push({ name: this.originUrl })
        })
        .catch((error) => {
          console.log(error)
          this.error = error.response.data.error
        })
    }
  }
}
</script>
