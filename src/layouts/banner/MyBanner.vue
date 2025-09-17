<template>
  <div :class="$style.box">
    <q-banner
      v-for="(error, i) in getBannerErrors"
      :key="i"
      dense
      inline-actions
      :class="[
        $style.banner,
        error.type === 'ERROR' && 'bg-red text-white',
        error.type === 'WARNING' && 'bg-orange text-white',
        error.type === 'SUCCESS' && 'bg-green text-white',
        error.type === 'INFO' && 'bg-blue text-white',
      ]"
    >
      {{ error.message }}
      {{ error.statusType }}
      <template v-slot:action>
        <q-btn flat color="white" @click="onClose(i)" label="Close" />
      </template>
    </q-banner>
  </div>
  <slot />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBannerStore } from 'src/stores/banner'
// import { useRoute } from 'vue-router'

const bannerStore = useBannerStore()
const { getBannerErrors } = storeToRefs(bannerStore)
// const route = useRoute()
// const prevPath = ref(route.fullPath)

const onClose = (i: number) => {
  bannerStore.resetBanners(i)
}

// // слідкуємо за зміною маршруту
// watch(
//   () => route.fullPath,
//   (newPath, oldPath) => {
//     const isChangePage = oldPath !== newPath
//     prevPath.value = newPath

//     if (getBannerErrors.value.length > 0 && isChangePage) {
//       bannerStore.resetBanners()
//     }
//   },
// )

// автозакриття останнього повідомлення якщо маршрут не змінився
// watch(getBannerErrors, (newVal) => {
//   if (newVal.length > 0) {
//     setTimeout(() => {
//       bannerStore.resetBanners(newVal.length - 1)
//     }, 4000)
//   }
// })

// watch(getBannerErrors, (newVal) => {
//   console.log('Banner errors changed:', newVal)
// })
</script>
<style module lang="scss">
.box {
  min-height: auto;
  max-height: 100vh;
  overflow-y: auto;
  position: absolute;
  z-index: 9998;
  right: 0;

  .banner {
    width: 300px;
    margin: 5px;
  }
}
</style>
