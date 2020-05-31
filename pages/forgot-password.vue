<template>
  <div>
    <h1>forgot password</h1>
    <form @submit.prevent="submit">
      <label for="email">EMail</label>
      <input id="email" v-model="form.email" type="email" name="email" />
      <button>restore password</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: ''
      },
      error: ''
    }
  },
  methods: {
    async submit() {
      try {
        const response = await this.$axios.post(
          '/auth/forgot-password',
          this.form
        )
        return response
      } catch (error) {
        this.error = error.response.data
        return error
      }
    }
  }
}
</script>

<style></style>
