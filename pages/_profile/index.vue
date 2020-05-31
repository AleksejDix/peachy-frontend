<template>
  <div>
    <h1 class="font-dispaly text-4xl">{{ profile.username }}</h1>
    <nuxt-link
      v-if="$auth.loggedIn"
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
      const response = await this.$axios.get(
        `/users?slug=${this.$route.params.profile}`
      )
      if (response.status === 200) {
        this.profile = response.data[0]
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
