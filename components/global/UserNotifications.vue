<template functinal>
  <transition-group
    name="notification"
    tag="div"
    class="notifications m-4 fixed z-10 w-80 bottom-0 right-0 space-y-2"
  >
    <user-notification
      v-for="notification in notifications"
      :key="notification.id"
      class="notification"
      v-bind="notification"
    />
  </transition-group>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      notifications: 'notifications/list'
    })
  }
}
</script>

<style scoped>
.notification {
  transition: all 1s;
}
.notification-enter,
.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
