<template>
  <q-card :class="$style.tab" dark bordered>
    <q-card-section :class="$style.title">
      <div :class="$style.label">
        <div><img src="{{tab.iconUrl}}" /></div>
        <div>{{ tab.label }}</div>
      </div>
      <div :class="$style.actions">
        <q-btn
          padding="xs"
          @click="onEditHandler(`edit_${tab.id}`)"
          color="warning"
          icon="navigation"
        />
        <q-btn
          padding="xs"
          color="primary"
          @click="onDeleteHandler(`delete_${tab.id}`)"
          icon="eco"
        />
      </div>
    </q-card-section>
    <q-separator dark inset />
    <q-card-section>
      <Link v-for="link in tab.groups" :key="link.id" :link="link" />
    </q-card-section>
  </q-card>

  <Dialog v-bind="editDialog">
    <template #content>
      <div>
        <div>Назва таби</div>
        <div>{{ tab.label }}</div>
      </div>
      <div>
        <q-btn color="warning" icon="navigation">Змінити іконку</q-btn>
        <q-btn color="primary" icon="eco">Добавити блок із ссилками</q-btn>
      </div>
      <div>Блок ссилок</div>
      <div>
        <q-btn color="warning" icon="navigation">Зберегти</q-btn>
        <q-btn color="primary" icon="eco">Видалити</q-btn>
      </div>
    </template>
  </Dialog>
  <Dialog v-bind="deleteDialog">
    <template #content>
      <div>Видалити?</div>
      <div>
        <q-btn color="warning" icon="navigation">Зберегти</q-btn>
        <q-btn color="primary" icon="eco">Видалити</q-btn>
      </div>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '../../../../components/dialog/indexPage.vue'
import Link from '../../components/link/indexPage.vue'
import type { Tab } from '../../../../models/index.js'
import { useDialogsStore } from 'src/stores/dialog'
import type { DialogProps } from 'src/components/dialog/types'

const { tab } = defineProps<{ tab: Tab }>()
const dialogsStore = useDialogsStore()

const onEditHandler = (name: DialogProps['name']) => {
  dialogsStore.openDialog(name)
}
const onDeleteHandler = (name: DialogProps['name']) => {
  dialogsStore.openDialog(name)
}

const editDialog = {
  name: `edit_${tab.id}`,
  title: `Редагування таби №- ${tab.id} «${tab.label}»`,
}

const deleteDialog = {
  name: `delete_${tab.id}`,
  title: `Редагування таби №- ${tab.id} «${tab.label}»`,
}
</script>

<style module lang="scss">
@import './styles.module.scss';
</style>
