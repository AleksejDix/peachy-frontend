<template>
  <div v-if="$auth.loggedIn">
    <h1 class="font-dispaly text-4xl">{{ profile.username }}</h1>
    <nuxt-link
      class="bg-red"
      :to="{
        name: 'profile-edit',
        params: {
          profile: $route.params.profile
        }
      }"
      >edit</nuxt-link
    >
    <pre>{{ profile }}</pre>
  </div>
</template>

<script>
export default {
  async fetch() {
    try {
      const response = await this.$axios.get(`/users/me`)
      if (response.status === 200) {
        this.profile = response.data
      }
      return response
    } catch (error) {
      return error.response
    }
  },
  data() {
    return {
      profile: []
    }
  },
  watch: {
    '$route.query': '$fetch'
  }
}
</script>
