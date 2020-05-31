<template>
  <section class="space-y-4">
    <header class="space-y-4">
      <h1 class="font-dispaly text-center leading-tight text-2xl">
        Please, set a new password
      </h1>
    </header>
    <form class="space-y-4" @submit.prevent="submit">
      <div>
        <input
          id="code"
          v-model="form.code"
          name="code"
          type="hidden"
          class="hidden h-0 w-0"
        />
        <label
          class="block text-sm font-medium leading-5 text-gray-700"
          for="passowrd"
          >Password</label
        >
        <div class="mt-1 relative rounded-md shadow-sm">
          <input
            id="password"
            v-model="form.password"
            name="passowrd"
            type="password"
            :class="{
              'bg-green-100 border-green-500': same && filled
            }"
            class="form-input block w-full sm:text-sm sm:leading-5"
          />
        </div>
      </div>
      <div>
        <label
          class="block text-sm font-medium leading-5 text-gray-700"
          for="passwordConfirmation"
          >Confirm Password</label
        >
        <div class="mt-1 relative rounded-md shadow-sm">
          <input
            id="passwordConfirmation"
            v-model="form.passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            :class="{
              'bg-green-100 border-green-500': same && filled
            }"
            class="form-input block w-full sm:text-sm sm:leading-5"
          />
        </div>
      </div>
      <AuthErrors :errors="error" />
      <div class="py-4">
        <button class="button w-full">save new password</button>
      </div>
      <div>
        <span class="text-gray-600">Doesn't work?</span>
        <nuxt-link class="link" :to="{ name: 'forgot-password' }"
          >go to password recovery</nuxt-link
        >
      </div>
    </form>
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
        code: '',
        password: '',
        passwordConfirmation: ''
      },
      error: []
    }
  },
  computed: {
    filled() {
      return this.form.password.length > 0
    },
    same() {
      return this.form.password === this.form.passwordConfirmation
    }
  },
  watch: {
    form: {
      handler: 'reset',
      deep: true
    }
  },
  mounted() {
    this.form.code = this.$route.query.code
  },
  methods: {
    reset() {
      this.error = []
    },
    async submit() {
      try {
        const response = await this.$axios.post(
          '/auth/reset-password',
          this.form
        )
        if (response.status === 200) {
          this.$router.push({ name: 'login' })
          // console.log("Your user's password has been reset.")
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
