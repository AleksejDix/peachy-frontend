<template>
  <div class="logo w-12 h-12 bg-orange-500 rounded-full"></div>
</template>
<style>
.logo {
  animation: 1s appear;
  margin: auto;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
