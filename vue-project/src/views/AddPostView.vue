<template>
  <main class="container">
    <div class="row">
      <h1 class="my-4 text-center">Ajouter un article</h1>
    </div>
    <div v-if="success" class="d-flex justify-content-center">
      <div class="alert alert-success" role="alert">{{ success }}</div>
    </div>
    <div v-if="error" class="d-flex justify-content-center">
      <div class="alert alert-warning" role="alert">{{ error }}</div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10 col-md-8 col-lg-6 col-xl-4">
        <form @submit.prevent="onSubmit">
          <div class="form-group my-3">
            <label for="title">Titre</label>
            <input type="text" class="form-control" id="title" name="title" v-model="title" />
          </div>
          <div class="form-group my-3">
            <label for="content">Contenu</label>
            <input required="true" type="text" class="form-control" id="content" name="content" v-model="content" />
          </div>
          <div class="d-flex justify-content-center my-3">
            <button type="submit" class="btn btn-primary">Valider</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { usePostStore } from '../stores/postStore'
import { mapActions } from 'pinia'

export default {
  data() {
    return {
      title: '',
      content: '',
      createdAt: '',
      author: '',
      error: null,
      success: null,
    }
  },
  methods: {
    // on importe les méthodes du store Post
    ...mapActions(usePostStore, ['addPost']),
    async onSubmit() {
      const params = {
        title: this.title,
        content: this.content,
        createdAt: new Date()
      }
      this.error = ''
      this.success = ''
      this.addPost(params)
        .then((res) => {
          if (res.success) {
            this.success = res.success
            this.$router.push({ name: 'home' })
          }
          if (res.error) {
            this.error = res.error.response.data.error
            console.log(this.error)
          }
        })
    }
  }
}
</script>
