<template>
  <div>
    <h1>Thank you for confirming your email!</h1>
    <p>You can close this window now</p>
  </div>
</template>

<script>
export default {
  layout: 'tunnel',
  watch: {
    '$route.query.confirmation': {
      handler: 'confirm',
      immediate: true
    }
  },
  methods: {
    confirm(confirmation) {
      this.$axios.get(`/auth/email-confirmation?confirmation=${confirmation}`)
    }
  }
}
</script>
