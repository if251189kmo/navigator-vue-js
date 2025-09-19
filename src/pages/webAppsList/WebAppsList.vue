<template>
  <q-intersection transition="scale">
    <div :class="$style.webAppsList">webAppsList</div>
    <div :class="$style.webAppsList">webAppsList</div>
    <div :class="$style.webAppsList">webAppsList</div>
    <div :class="$style.webAppsList">webAppsList</div>
    <div :class="$style.webAppsList">webAppsList</div>
    <div :class="$style.webAppsList">webAppsList</div>
    <q-btn to="/" style="background: #ff0080; color: white" label="go home" />
  </q-intersection>
</template>

<!-- <script setup lang="ts">

</script> -->

<style module lang="scss">
.webAppsList {
  background-color: rgba(233, 40, 217, 0.733);
}
</style>
