<template>
  <div>
    <pre>
      {{ orders }}
    </pre>
  </div>
</template>
<script>
export default {
  async fetch() {
    try {
      const response = await this.$axios.get(
        `/orders?user=${this.$route.params.id}`
      )
      if (response.status === 200) {
        this.orders = response.data
      }
      return response
    } catch (error) {
      return error.response
    }
  },
  data() {
    return {
      orders: []
    }
  }
}
</script>
