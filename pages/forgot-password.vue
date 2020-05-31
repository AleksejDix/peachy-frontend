<template>
  <section class="space-y-4">
    <header>
      <h1 class="font-dispaly text-center leading-tight text-2xl">
        Password recovery
      </h1>
    </header>
    <form class="space-y-4" @submit.prevent="submit">
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-5 text-gray-700"
          >E-Mail</label
        >
        <div class="mt-1 relative rounded-md shadow-sm">
          <input
            id="email"
            v-model="form.email"
            type="email"
            name="email"
            class="form-input block w-full sm:text-sm sm:leading-5"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <AuthErrors :errors="error" />
      <div class="py-4">
        <button class="button w-full">
          Send me a revovery email
        </button>
      </div>
    </form>

    <div>
      <span class="text-gray-600">Already know your password?</span>
      <nuxt-link class="link" to="/login">Log in</nuxt-link>
    </div>
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
        email: ''
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
    async submit() {
      try {
        const response = await this.$axios.post(
          '/auth/forgot-password',
          this.form
        )
        return response
      } catch (error) {
        this.error = error.response.data.data
        return error
      }
    }
  }
}
</script>

<style></style>
