<template>
  <div>
    <div>
      <h1>You can close this windown now</h1>
    </div>
  </div>
</template>

<script>
export default {
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
