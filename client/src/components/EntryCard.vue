<template>
  <p>Hello</p>
  <div>
    <div class="d-flex justify my-2">
      <div v-if="!entry.notebookId" class="p-1 rounded border border-2 shadow mx-1 bg-o-orange">
      </div>
      <div v-if="entry.notebookId" class="p-1 rounded border border-2 shadow mx-1" 
      :style="{ backgroundColor: entry.notebook.color }">
      </div>
      <div class="bg-secondary entry-card p-2 shadow rounded my-1">
        <p>{{ entry.description }}</p>
        <div class="text-center">
          <img class="entry-image img-fluid rounded" 
          :src="entry.img" 
          :alt="'Figure from' + entry.creator.name" 
          :title="'Figure from' + entry.creator.name">
        </div>
        <div>
          <div class="d-flex justify-content-between align-items-center mx-2 mt-2">
            <span class="text-end mb-0 italic pe-2">
              Last Edit: {{ entry.updatedAt.toLocaleDateString() + ' ' + entry.updatedAt.toLocaleTimeString() }} By: {{entry.creator.name }}
            </span>
            <span v-if="account.id == entry.creatorId" @click="deleteEntry(entry.id)" role="button" class="px-3 btn btn-danger bold" >X</span>
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
</style>