<template>
  <div id="root">
    <section
      class="flex w-full h-full min-h-full text-gray-400 overflow-hidden"
    >
      <div
        :style="{ width: `${width}px`, maxWidth: '50vw', minWidth: '190px' }"
        class="relative h-full flex-shrink-0 border-r border-gray-700"
      >
        <div v-if="$auth.loggedIn">
          <pre>{{ $auth.user.username }}</pre>
        </div>
        <div v-if="$auth.loggedIn">
          <strong>{{ $auth.user.email }}</strong>
          <button class="button" @click="$auth.logout()">log out</button>
          <nuxt-link
            :to="{
              name: 'users-id',
              params: {
                id: $auth.user.id
              }
            }"
            >profile</nuxt-link
          >
          <nuxt-link
            :to="{
              name: 'users-id-orders',
              params: {
                id: $auth.user.id
              }
            }"
            >orders</nuxt-link
          >
        </div>
        <div v-else>
          <nuxt-link to="/login">login</nuxt-link>
          <nuxt-link to="/register">register</nuxt-link>
        </div>
        <div
          class="absolute cursor-move w-4 -mr-2 h-full top-0 right-0"
          @mousedown="startResize"
        ></div>
      </div>
      <div class="overflow-auto flex-1 relative">
        <button
          @click="
            $notifications.create({
              type: 'error',
              message: 'FAILED!',
              body: 'not enough funds.'
            })
          "
        >
          hallo
        </button>
        <nuxt />
      </div>
    </section>
    <user-notifications />
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 200,
      isResizing: false
    }
  },
  watch: {
    width(newWidth) {
      localStorage.width = newWidth
    }
  },
  mounted() {
    if (localStorage.width) {
      this.width = localStorage.width
    }
    window.addEventListener('mousemove', this.move)
    window.addEventListener('mouseup', this.stopResize)
  },
  beforeDestroy() {
    window.removeEventListener('mousemove', this.move)
    window.addEventListener('mouseup', this.stopResize)
  },
  methods: {
    startResize() {
      this.isResizing = true
    },
    stopResize() {
      this.isResizing = false
    },
    move(e) {
      if (this.isResizing) {
        this.width = e.pageX
      }
    }
  }
}
</script>
