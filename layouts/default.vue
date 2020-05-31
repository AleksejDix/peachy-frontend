<template>
  <div class="bg-gray-100 h-screen">
    <div v-if="$auth.loggedIn">
      <strong>{{ $auth.user.email }}</strong>
      <button class="button" @click="$auth.logout()">log out</button>
      {{ $auth.user.slug }}
      <nuxt-link
        :to="{
          name: 'profile',
          params: {
            profile: $auth.user.slug
          }
        }"
        >profile</nuxt-link
      >
    </div>
    <div v-else>
      <nuxt-link to="/login">login</nuxt-link>
      <nuxt-link to="/register">register</nuxt-link>
    </div>
    <nuxt />
  </div>
</template>
