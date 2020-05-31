<template>
  <div>
    <h1>register</h1>
    <form @submit.prevent="register">
      <label for="username">Username</label>
      <input id="username" v-model="form.username" type="text" name="name" />
      <label for="email">E-Mail:</label>
      <input id="email" v-model="form.email" type="email" name="email" />
      <label for="password">Password:</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        name="password"
      />
      <button type="submit">register</button>
      {{ error }}
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async register() {
      try {
        const { username, email, password } = this.form

        const response = await this.$axios.post('/auth/local/register', {
          username,
          email,
          password
        })
        // console.log(response)
        if (response.status === 200) {
          this.$auth.setUserToken(response.data.jwt)
          this.$auth.setUser(response.data.user)
        }
      } catch (error) {
        this.error = error.response.data.data[0]
      }
    }
  }
}
</script>
