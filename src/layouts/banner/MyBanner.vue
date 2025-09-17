<template>
  <div :class="$style.myBanner">
    <div :class="$style.box">
      <q-banner
        :class="$style.banner"
        v-for="(error, i) in getBannerErrors"
        :key="i"
        dense
        inline-actions
        class="text-white bg-red"
      >
        {{ error.type }} This app is offline.
        {{ error.statusType }}
        <template v-slot:action>
          <q-btn flat color="white" label="Turn ON Wifi" />
        </template>
      </q-banner>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBannerStore } from 'src/stores/banner'
import { watch } from 'vue'

const bannerStore = useBannerStore()
const { getBannerErrors } = storeToRefs(bannerStore)
watch(getBannerErrors, (newVal) => {
  console.log('Banner errors changed:', newVal)
})
</script>
<style module lang="scss">
.myBanner {
  position: relative;
  width: 100%;

  .box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9998;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .banner {
    margin: 5px;
  }
}
</style>
