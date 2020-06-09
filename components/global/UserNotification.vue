<template>
  <article :class="classes" class="shadow rounded-md p-2 flex space-x-2">
    <div class="flex-1 text-sm pl-2">
      <h1 class="text-white font-bold">{{ message }}</h1>
      <p v-if="body" class="text-gray-200">{{ body }}</p>
    </div>
    <div class="flex-shrink-0">
      <button @click="destroy(1)">
        <svg
          class="w-5 h-5 text-white fill-current"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  </article>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    message: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'success'
    },
    duration: {
      type: Number,
      default: 5000
    },
    body: {
      type: String,
      default: ''
    }
  },
  computed: {
    classes() {
      switch (this.type) {
        case 'error':
          return 'bg-red-900 border border-red-700'
        default:
          return 'bg-gray-800 border border-gray-600'
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.destroy(this.id)
    }, this.duration)

    if (this.type === 'success') {
      navigator.vibrate(200)
    } else if (this.type === 'fail') {
      navigator.vibrate(700)
    }
  },
  methods: {
    ...mapActions({
      destroy: 'notifications/destroy'
    })
  }
}
</script>
