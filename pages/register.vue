<template>
  <section class="space-y-4">
    <header class="space-y-4">
      <h1 class="font-dispaly text-center leading-tight text-2xl">
        Sign up
      </h1>
    </header>
    <form class="space-y-4" @submit.prevent="register">
      <div>
        <label
          for="username"
          class="block text-sm font-medium leading-5 text-gray-700"
          >Username</label
        >
        <input
          id="username"
          v-model="form.username"
          type="text"
          name="name"
          class="form-input block w-full sm:text-sm sm:leading-5"
        />
      </div>
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-5 text-gray-700"
          >E-Mail:</label
        >
        <input
          id="email"
          v-model="form.email"
          type="email"
          name="email"
          class="form-input block w-full sm:text-sm sm:leading-5"
        />
      </div>
      <div>
        <label
          for="password"
          class="block text-sm font-medium leading-5 text-gray-700"
          >Password:</label
        >
        <input
          id="password"
          v-model="form.password"
          type="password"
          name="password"
          class="form-input block w-full sm:text-sm sm:leading-5"
          autocomplete="new-passwor"
        />
      </div>
      <AuthErrors :errors="error" />
      <div class="py-4">
        <button class="button w-full" type="submit">create new account</button>
      </div>
    </form>
    <footer>
      <p>
        Already registered?
        <nuxt-link class="link" to="/login">Log in</nuxt-link>
      </p>
    </footer>
  </section>
</template>

<script>
import AuthErrors from '@/components/AuthErrors'
export default {
  layout: 'tunnel',
  components: {
    AuthErrors
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },
      error: []
    }
  },
  watch: {
    form: {
      handler: 'reset',
      deep: true
    }
  },
  methods: {
    reset() {
      this.error = []
    },
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
