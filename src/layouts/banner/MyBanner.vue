<template>
  <div :class="$style.box">
    <q-banner v-for="(error, i) in getBannerErrors" :key="i" :class="[$style.banner]">
      <div :class="$style.content">
        <div :class="$style.iconWrapper" :style="{ backgroundColor: getIconConfig(error.type).bg }">
          <q-icon :class="$style.icon" size="2rem" :name="getIconConfig(error.type).name" />
        </div>
        <div :class="$style.messageWrapper">
          <div>{{ error.message || error.statusType }}</div>
        </div>
        <div :class="$style.btnWrapper">
          <q-btn flat round icon="close" @click="onClose(i)" />
        </div>
      </div>
    </q-banner>
  </div>
  <slot />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Bannerss } from 'src/constants/banners'
import { useBannerStore } from 'src/stores/banner'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const { ERROR, WARNING, SUCCESS, INFO } = Bannerss

const bannerStore = useBannerStore()
const { getBannerErrors } = storeToRefs(bannerStore)
const route = useRoute()
const prevPath = ref(route.fullPath)

const onClose = (i: number) => {
  bannerStore.resetBanners(i)
}

const getIconConfig = (type: Bannerss) => {
  switch (type) {
    case ERROR:
      return { name: 'error', bg: '#f44336' }
    case WARNING:
      return { name: 'warning', bg: '#ff9800' }
    case SUCCESS:
      return { name: 'check_circle', bg: '#4caf50' }
    case INFO:
      return { name: 'info', bg: '#2196f3' }
    default:
      return { name: 'help', bg: '#9e9e9e' }
  }
}

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    const isChangePage = oldPath !== newPath
    prevPath.value = newPath

    if (getBannerErrors.value.length > 0 && isChangePage) {
      bannerStore.resetBanners()
    }
  },
)

watch(getBannerErrors, (newVal) => {
  if (newVal.length > 0) {
    setTimeout(() => {
      bannerStore.resetBanners(newVal.length - 1)
    }, 4000)
  }
})
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
    width: 400px;
    margin: 5px;
    padding: 0;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.809);
    border-radius: 4px;

    .content {
      height: 100%;
      width: inherit;
      display: flex;
      justify-content: space-between;
      align-items: stretch;

      .iconWrapper {
        background-color: red;
        border-radius: 4px 0 0 4px;
        padding: 10px;
        margin: 1px 0;
        .icon {
          color: white;
        }
      }

      .messageWrapper {
        width: 100%;
        display: flex;
        align-items: center;
        margin: 5px 10px;
      }

      .btnWrapper {
        padding: 5px;
      }
    }
  }
}
</style>
