<!-- eslint-disable vue/multi-word-component-names -->
<template >
  <div class="card my-4 mx-auto" style="{width: 'auto', maxWidth: '40rem'}">
    <div class="card-body">
      <h5 class="card-title text-center pb-2">{{ post.title }}</h5>
      <div class="d-flex justify-content-between align-items-center">
        <h6 class="card-subtitle mb-2 text-body-secondary fs-6 fw-light">Auteur.e : {{ post.author.userName }}</h6>
        <h7 class="card-subtitle mb-2 fw-lighter h8">Date : {{ postDate }}
        </h7>
      </div>

      <p class="card-text">
        {{ post.content }}
      </p>
    </div>
    <div v-if="token" class="d-flex justify-content-around p-3">
      <i v-if="decodedToken.data.id !== post.author._id" @click="onClickLike" role="button"
        class="text-danger fa-thumbs-up" :class="isAFavorite() ? 'fa-solid' : 'fa-regular'">
      </i>
      <!--  -->
      <i role="button" @click="onClickComment" class="text-primary fa-sharp fa-solid fa-comments"></i>
    </div>
    <ul v-if="showComment" class="list-group list-group-flush">
      <li v-if="!post.comments || !post.comments.length" class="list-group-item">
        <p>Aucun commentaire</p>
      </li>
      <li v-else v-for="comment in post.comments" :key="comment._id" class="list-group-item">
        <div class="d-flex justify-content-between">
          <p class="fw-bold mb-1">{{ comment.author.userName }}</p>
          <p class="fw-light mb-1">{{ commentDate(comment.createdAt) }}</p>
        </div>
        <p class="m-0"> {{ comment.content }} </p>
      </li>
      <li v-if="decodedToken.data.id !== post.author._id"
        class="list-group-item d-flex justify-content-between align-items-center">
        <div class="col-sm-10">
          <textarea class="form-control" id="userName" name="content" v-model="content"
            placeholder="Ecrivez un commentaire..."></textarea>
        </div>
        <div @click="handleAddComment" class="d-flex justify-content-center h5 p-3 me-4">
          <i role="button" class="fa-solid fa-paper-plane text-secondary"></i>
        </div>
      </li>

    </ul>
  </div>
</template>

<script>
import { useUserStore } from '../stores/userStore'
import { usePostStore } from '../stores/postStore'
import { useSecurityStore } from '../stores/securityStore'
import { mapActions, mapState } from 'pinia'

export default {
  data() {
    return {
      error: null,
      showComment: false,
      content: '',
      success: null,
    }
  },
  props: ['post', 'originUrl'],
  computed: {
    ...mapState(useSecurityStore, ['token', 'decodedToken']),
    ...mapState(useUserStore, ['userFavoritesPosts']),

    postDate() {
      const postDate = new Date(this.post.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', year: 'numeric', month: 'numeric', })
      return postDate
    },
  },
  beforeMount() {
    this.checkIfFavorite()
    console.log(this.userFavoritesPosts)
    console.log(this.userFavoritesPosts.some((favorite) => favorite._id === this.post._id))
  },
  methods: {
    // on importe les méthodes du store User
    ...mapActions(useUserStore, ['addPostAsFavorite', 'getUserFavoritesPosts', 'removePostFromFavorites']),
    // on importe les méthodes du store Post
    ...mapActions(usePostStore, ['getPost', 'addComment']),
    onClickComment() {
      this.showComment = !this.showComment
    },
    async onClickLike() {
      const data = {
        post: this.post._id
      }
      this.refreshMessage()

      //si le post est un favori, on l'enlève des favoris de l'utilisateur connecté
      if (this.isAFavorite()) {
        console.log('on enleve le psot des favoris')
        this.removePostFromFavorites(data)
          .then((res) => {
            console.log(res)
          })
          .then(() => this.checkIfFavorite())
          .catch((error) => {
            console.log(error)
            this.error = error.response.data.error
          })

      }
      //sinon on l'ajoute aux favoris 
      else {
        this.addPostAsFavorite(data)
          .then((res) => {
            if (res.success) {
              console.log(res.success)
              this.success = res.success
              this.$emit('success', this.success);
            }
            if (res.error) {
              this.error = res.error.response.data.error
              this.$emit('error', this.error);
            }
          })
          .then(() => this.checkIfFavorite())
          .catch((error) => {
            console.log(error)
            this.error = error.response.data.error
          })
      }
    },

    commentDate(date) {
      const commentDate = new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', year: 'numeric', month: 'numeric', })
      const commentTime = new Date(date).toLocaleTimeString('fr-FR')
      return commentDate + " - " + commentTime
    },

    async handleAddComment() {
      const data = {
        content: this.content,
        createdAt: new Date()
      }
      this.refreshMessage()
      this.addComment(this.post._id, data)
        .then((res) => {

          if (res.success) {
            this.success = res.success
            this.$emit('success', this.success);
          }
          if (res.error) {
            this.error = res.error.response.data.error
            this.$emit('error', this.error);
          }
          this.content = ''
          this.getPost(this.post._id)
        })
        .catch((error) => {
          console.log(error)
          this.error = error.response.data.error
        })
    },

    refreshMessage() {
      this.error = ''
      this.$emit('error', this.error);
      this.success = ''
      this.$emit('success', this.success);
    },

    isAFavorite() {
      console.log(this.userFavoritesPosts.some((favorite) => favorite._id === this.post._id))
      return this.userFavoritesPosts.some((favorite) => favorite._id === this.post._id)
    },

    checkIfFavorite() {
      this.getUserFavoritesPosts(this.decodedToken.data.id)
        .then(() => this.isAFavorite())
    }
  },
}

</script>
