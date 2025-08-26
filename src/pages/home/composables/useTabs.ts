import { useTabsStore } from 'src/stores/home.js'
import { onMounted } from 'vue'

export function useTabs() {
  const tabsStore = useTabsStore()

  onMounted(() => {
    void tabsStore.fetchTabs()
  })

  return { tabsStore }
}