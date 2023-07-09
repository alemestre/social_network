<template>
  <div class="home">
    <div class="d-flex align-items-baseline justify-content-between mb-4">
      <h3 class="col-8 mb-4 text-secondary"><i class="fas fa-angle-down me-2" />Derniers posts</h3>
      <div class="col-4 d-flex justify-content-end">
        <BButton :to="{ name: 'new-post' }" v-if="token" size="sm" variant="outline-primary" iconLeft="circle-plus">
          Créer un nouveau post
        </BButton>
      </div>
    </div>
    <div class="row justify-content-around gap-2 my-2" v-if="posts && posts.length">
      <Post v-for="post in posts" :key="post._id" :post="post" originUrl="home" />
    </div>
    <div v-else>
      <p>Aucun post pour l'instant</p>
    </div>
  </div>
</template>

<script>
import { useSecurityStore } from '../stores/securityStore'
import { usePostStore } from '../stores/postStore'
import { mapState, mapActions } from 'pinia'
import Post from '../components/Post.vue'

export default {
  data() {
    return {
      userName: '',
      password: '',
      error: null
    }
  },
  components: {
    Post
  },
  computed: {
    ...mapState(useSecurityStore, ['token']),
    ...mapState(usePostStore, ['posts'])
  },
  methods: {
    ...mapActions(usePostStore, ['getPosts'])
  },

  beforeMount() {
    this.getPosts()
  },
  mounted() {
    console.log('posts dans composants', this.posts)
  }
}
</script>
