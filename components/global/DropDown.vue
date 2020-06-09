<template>
  <div class="dropdown relative overflow-visible">
    <slot
      name="trigger"
      :toggle="toggle"
      :open="open"
      :close="close"
      :isOpen="isOpen"
    />

    <transition
      leave-active-class="duration-200 transtion-all ease-in-out"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-class="`opacity-100 scale-100"
      leave-to-class="opacity-0"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      @beforeLeave="beforeLeave"
    >
      <div
        v-if="isOpen"
        aria-hidden="!isOpen"
        class="absolute z-30"
        :class="[classes, origin]"
      >
        <div
          ref="dropdown absolute inset-0"
          :class="[animate ? animationType : '', origin]"
        >
          <slot :close="close" :toggle="toggle" :open="open" :isOpen="isOpen" />
          <GlobalEvents @keyup.esc="close" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
//  v-click-outside="close"

const variants = {
  dropdown: {
    right: 'right-0 left-auto',
    left: 'left-0 right-auto',
    top: 'top-100 bottom-auto',
    bottom: 'bottom-100 top-auto'
  },
  menu: {
    right: 'right-100 left-auto',
    left: 'left-100 right-auto',
    top: 'top-0 bottom-auto',
    bottom: 'bottom-0 top-auto'
  }
}

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dir: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'dropdown'
    }
  },
  data() {
    return {
      isOpen: this.visible,
      trigger: null,
      classes: null,
      origin: null,
      animate: false
    }
  },
  computed: {
    isLeft() {
      return this.dir === 'left'
    },
    animationType() {
      return ' scale-up fade-in'
    }
  },
  methods: {
    afterEnter(el) {
      const boundary = {
        height: Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        ),
        width: Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        )
      }

      const box = el.getBoundingClientRect()

      const fit = {
        top: box.top - box.height > 0,
        right: boundary.width - (box.width + box.left) > 0,
        bottom: boundary.height - (box.height + box.top) > 0,
        left: box.left - box.width > 0
      }

      const horizontal = fit.right
        ? this.isLeft && fit.left
          ? 'right'
          : 'left'
        : fit.left
        ? 'right'
        : 'left'

      const vertical = fit.bottom ? 'top' : fit.top ? 'bottom' : 'top'

      this.origin = `origin-${vertical}-${horizontal}`

      this.classes = [
        fit.right
          ? this.isLeft && fit.left
            ? variants[this.variant].right
            : variants[this.variant].left
          : fit.left
          ? variants[this.variant].right
          : variants[this.variant].left,

        fit.bottom
          ? variants[this.variant].top
          : fit.top
          ? variants[this.variant].bottom
          : variants[this.variant].top
      ]

      this.animate = true
    },

    beforeLeave() {
      this.animate = false
    },

    afterLeave() {
      this.classes = null
      this.origin = null
    },
    close() {
      if (this.trigger) {
        this.trigger.focus()
        this.trigger = null
      }
      this.isOpen = false
    },
    open(event) {
      this.isOpen = true
      this.trigger = event.target
    },
    toggle(event) {
      this.isOpen ? this.close() : this.open(event)
    }
  }
}
</script>

<style scoped>
.scale-up {
  animation: scaleup 200ms ease-in reverse forwards;
}

@keyframes scaleup {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.64);
  }
}

.w-overlap {
  width: calc(100% + 16px);
}
</style>
