<template>
  <div class="home">
    <div v-if="success" class="d-flex justify-content-center">
      <div class="alert alert-success" role="alert">{{ success }}</div>
    </div>
    <div v-if="error" class="d-flex justify-content-center">
      <div class="alert alert-warning" role="alert">{{ error }}</div>
    </div>
    <PostWithComments @error="handleErrorData" @success="handleSuccessData" :post="post" originUrl="consult" />

  </div>
</template>

<script>
import { useSecurityStore } from '../stores/securityStore'
import { usePostStore } from '../stores/postStore'
import { mapActions, mapState } from 'pinia'
import PostWithComments from '../components/PostWithComments.vue'
export default {
  data() {
    return {
      error: null,
      content: '',
      success: null
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    PostWithComments
  },
  computed: {
    ...mapState(usePostStore, ['post']),
    ...mapState(useSecurityStore, ['decodedToken'])
  },
  beforeMount() {
    this.getPost(this.id)
  },
  methods: {
    // on importe les méthodes du store Post
    ...mapActions(usePostStore, ['getPost', 'addComment']),

    handleSuccessData(data) {
      this.success = data
    },

    handleErrorData(data) {
      this.error = data
    }
  }
}
</script>