<template>
  <div class="pb-8 logo border">
    <h1 class=" font-display text-6xl leading-none">
      Peachy<span class="inline-block -ml-2">.</span>
    </h1>
    <p
      class="-mt-1 ml-1 uppercase tracking-wide text-xs font-semibold relative"
    >
      just screencasts
    </p>
  </div>
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
