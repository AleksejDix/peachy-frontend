<template>
  <div>
    <h1 class="font-dispaly text-4xl">{{ profile.username }}</h1>
    <form @submit.prevent="update">
      <div>
        <label for="firstname">First name:</label>
        <input
          id="firstname"
          v-model="profile.firstName"
          type="text"
          autocomplete="given-name"
          name="firstname"
        />
      </div>

      <div>
        <label for="lastName">Last name:</label>
        <input
          id="lastName"
          v-model="profile.lastName"
          type="text"
          autocomplete="family-name"
          name="lastName"
        />
      </div>
      <button class="button">save</button>
    </form>
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
      profile: {}
    }
  },
  watch: {
    '$route.query': '$fetch'
  },
  methods: {
    async update() {
      try {
        const { firstName, lastName, id } = this.profile
        const response = await this.$axios.put(`users/${id}`, {
          firstName,
          lastName
        })
        if (response.status === 200) {
          this.profile = response.data
        }
        return response
      } catch (error) {
        return error
      }
    }
  }
}
</script>
