<template>
  <q-layout class="layout" view="lHh Lpr lFf">
    <q-header elevated> header </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.layout {
  background: #6d96653b;
}
</style>
