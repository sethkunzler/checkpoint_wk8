<template>
  <div>
    <div class="d-flex justify my-2">
      <div v-if="!entry.notebook" class="p-1 rounded border border-2 shadow mx-1 bg-o-orange">
      </div>
      <div v-if="entry.notebook" class="p-1 rounded border border-2 shadow mx-1" 
      :style="{ backgroundColor: entry.notebook.color }">
      </div>
      <div class="bg-secondary entry-card p-2 shadow rounded my-1">
        <div>
          <div class="d-flex justify-content-between px-2 py-1 align-items-center user-select-none">
            <img :src="entry.creator.picture" :alt="entry.creator.name" class="profile-picture">
            <p class="fs-5 px-2 mb-0">Note <span v-if="entry.notebook">on <i>{{ entry.notebook.title }}</i>, </span>by {{entry.creator.name}}</p>
          </div>
        </div>
        <p>{{ entry.description }}</p>
        <div class="text-center">
          <img v-if="entry.img"
          class="entry-image img-fluid rounded user-select-none" 
          :src="entry.img" 
          :alt="'Figure from' + entry.creator.name" 
          :title="'Figure from' + entry.creator.name">
        </div>
        <div>
          <div class="d-flex justify-content-between align-items-center mx-2 mt-2 user-select-none">
            <span class="text-end mb-0 italic pe-2">
              Last Edit: {{ entry.updatedAt.toLocaleDateString() + ' ' + entry.updatedAt.toLocaleTimeString() }} By: {{entry.creator.name }}
            </span>
            <span v-if="account.id == entry.creatorId" @click="deleteEntry(entry.id)" role="button" class="px-3 btn btn-danger bold" alt="click to delete this entry" title="Click to Delete this Entry">X</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "vue"
import { Entry } from "../models/Entry.js"
import { entriesService } from "../services/EntriesService.js"
import Pop from "../utils/Pop.js"
import { AppState } from "../AppState.js"

export default {
  props: {entry: {type: Entry, required: true}},
setup(){

return{
  account: computed(() => AppState.account),
  // TODO edit entry
  async deleteEntry(entryId) {
      try {
        const yes = await Pop.confirm()
        if (!yes) return 
        const message = await entriesService.deleteEntry(entryId)
        Pop.success(message)
      } catch (error) {
        Pop.error(error)
      }
    }
  }
}
}
</script>


<style lang="scss" scoped>
.entry-image {
  max-height: 80dvh;
}
.entry-card {
  width: 100%;
}
.profile-picture {
  max-height: 48px;
  max-width: 48px;
  border-radius: 50%;
  border: 1px solid var(--orangutan-orange);
}
</style>