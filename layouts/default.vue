<template>
  <div v-if="$auth.loggedIn" id="root">
    <section
      class="flex w-full h-full min-h-full text-gray-400 overflow-hidden"
    >
      <div
        :style="{ width: `${width}px`, maxWidth: '50vw', minWidth: '190px' }"
        class="relative h-full flex-shrink-0 border-r border-gray-700"
      >
        <div class="h-12 p-4 flex justify-end">
          <div>
            <DropDown>
              <template #trigger="{toggle}">
                <strong @click="toggle">{{ $auth.user.name }}</strong>
              </template>
              <template #default>
                <PeachySurface class="px-2">
                  <button @click="logout">log out</button>
                </PeachySurface>
              </template>
            </DropDown>
          </div>
        </div>
        <div>
          <div>
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
  middleware: 'auth',
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
    },
    async logout() {
      await this.$auth.logout()
      this.$notifications.create({
        message: 'Success!',
        body: "You're now logged out"
      })
    }
  }
}
</script>
