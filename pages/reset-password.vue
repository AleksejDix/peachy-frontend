<template>
  <form @submit.prevent="submit">
    <input id="code" v-model="form.code" name="code" type="hidden" />
    <div>
      <label class="block" for="passowrd">Password</label>
      <input
        id="password"
        v-model="form.password"
        name="passowrd"
        type="password"
      />
    </div>
    <div>
      <label class="block" for="passwordConfirmation">Confirm Password</label>
      <input
        id="passwordConfirmation"
        v-model="form.passwordConfirmation"
        name="passwordConfirmation"
        type="password"
      />
    </div>
    <button>save new password</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        code: '',
        password: '',
        passwordConfirmation: ''
      },
      error: ''
    }
  },
  mounted() {
    this.form.code = this.$route.query.code
  },
  methods: {
    async submit() {
      try {
        const response = await this.$axios.post(
          '/auth/reset-password',
          this.form
        )
        if (response.status === 200) {
          // console.log("Your user's password has been reset.")
        }
        return response
      } catch (error) {
        this.error = error.response.data
        return error
      }
    }
  }
}
</script>
