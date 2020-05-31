<template>
  <div>
    <form @submit.prevent="login">
      <label for="usernameOrPassword">E-Mail:</label>
      <input
        id="usernameOrPassword"
        v-model="form.identifier"
        type="text"
        name="username"
      />
      <label for="password">Password:</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        name="password"
      />
      {{ error }}
      <nuxt-link to="/forgot-password">forgot password</nuxt-link>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        identifier: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.form
        })
        return response
      } catch (error) {
        this.error = error.response.data.data
        return error
      }
    }
  }
}
</script>
