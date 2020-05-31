<template>
  <div v-if="errors.length > 0" class="py-2 text-red-600 rounded text-sm">
    <div v-for="(error, index) in errors" :key="index">
      <div v-for="m in error.messages" :key="m.id">
        {{ m.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default: () => []
    }
  }
}
</script>
