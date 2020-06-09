<template>
  <section class="space-y-4">
    <header>
      <h1 class="font-dispaly text-center leading-tight text-2xl">
        Long time no see!
      </h1>
    </header>
    <form class="space-y-4" @submit.prevent="login">
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-5 text-gray-300"
          >E-Mail:</label
        >
        <div class="mt-1 relative rounded-md shadow-sm">
          <input
            id="email"
            v-model="form.identifier"
            type="email"
            name="email"
            autocomplete="email"
            class="form-input block w-full sm:text-sm sm:leading-5 bg-gray-800"
          />
        </div>
      </div>
      <div>
        <label
          for="password"
          class="block text-sm font-medium leading-5 text-gray-300"
          >Password:</label
        >
        <div class="mt-1 relative rounded-md shadow-sm">
          <input
            id="password"
            v-model="form.password"
            type="password"
            name="password"
            class="form-input block w-full sm:text-sm sm:leading-5 bg-gray-800"
          />
        </div>
      </div>
      <AuthErrors :errors="error" />
      <div class="py-4">
        <button class="button w-full" type="submit">log in</button>
      </div>
    </form>
    <footer>
      <div>
        <span class="text-gray-600"> Not yet registered?</span>
        <nuxt-link class="link" to="/register">Create an account</nuxt-link>
      </div>
      <div>
        <span class="text-gray-600">Can't log in?</span>
        <nuxt-link class="link" to="/forgot-password"
          >Restore password</nuxt-link
        >
      </div>
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
        identifier: '',
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
    async login() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this.form
        })
        if (response.status === 200) {
          this.$notifications.create({
            message: 'Success!',
            body: "You're now logged in"
          })
        }
        return response
      } catch (error) {
        this.error = error.response.data.data
        return error
      }
    }
  }
}
</script>
