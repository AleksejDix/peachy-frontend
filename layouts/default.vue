<template>
  <div class="bg-orange-200 h-screen">
    <div v-if="$auth.loggedIn">
      <pre>{{ $auth.user }}</pre>
      <button @click="$auth.logout()">log out</button>
    </div>
    <div v-else>
      <nuxt-link to="/login">login</nuxt-link>
      <nuxt-link to="/register">register</nuxt-link>
    </div>
    <nuxt />
  </div>
</template>
