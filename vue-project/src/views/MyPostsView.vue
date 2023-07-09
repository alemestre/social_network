<template>
  <div class="home">
    <div class="d-flex align-items-baseline justify-content-between mb-4">
      <h3 class="col-8 mb-4 text-secondary"><i class="fas fa-angle-down me-2" />Mes posts</h3>
      <div class="col-4 d-flex justify-content-end">
        <BButton :to="{ name: 'new-post' }" v-if="token" size="sm" variant="outline-primary" iconLeft="circle-plus">
          Créer un nouveau post
        </BButton>
      </div>
    </div>
    <div class="row justify-content-around gap-2 my-2" v-if="my_posts && my_posts.length">
      <Post v-for="post in my_posts" :key="post._id" :post="post" originUrl="my-posts" />
    </div>
    <div v-else>
      <p>Vous n'avez rédigé aucun post pour le moment</p>
    </div>
  </div>
</template>

<script>
import { usePostStore } from '../stores/postStore'
import { useSecurityStore } from '../stores/securityStore'
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
    ...mapState(useSecurityStore, ['decodedToken']),
    ...mapState(usePostStore, ['my_posts'])
  },
  methods: {
    ...mapActions(usePostStore, ['getMyPosts'])
  },

  beforeMount() {
    this.getMyPosts(this.decodedToken.data.id)
  },
  mounted() {
    console.log('posts du user', this.my_posts)
  }
}
</script>
