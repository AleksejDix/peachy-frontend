<template>
  <div></div>
</template>

<script>
export default {
  fetch() {
    try {
      const token = this.$auth.getToken(this.$auth.strategy.name)
      console.log(token)

      // const response = await this.$axios.get(
      //   `/connect/${this.$route.params.provider}`
      // )
      // console.log(response)
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
</script>

<style></style>
