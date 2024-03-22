<template>
  <div>
    <div class="d-flex justify my-2">
      <!-- NOTE Side Bar -->
      <div v-if="!entryData.notebook" class="p-1 rounded border border-2 shadow mx-1 bg-o-orange">
      </div>
      <div v-else class="p-1 rounded border border-2 shadow mx-1" 
      :style="{ backgroundColor: entryData.notebook.color }">
      </div>
      <div class="bg-secondary entry-card p-2 shadow rounded my-1">
        <!-- NOTE Form // logged in display -->
        <div v-if="account.id == entry.creator.id"> 
          <div class="d-flex justify-content-between align-items-center mx-2 my-2 user-select-none">
            <span class="text-start mb-0 italic pe-2">
              Created At: {{ entryData.createdAt.toLocaleDateString() + ' ' + entryData.createdAt.toLocaleTimeString() }}
              <br>Last Edit: {{ entryData.updatedAt.toLocaleDateString() + ' ' + entryData.updatedAt.toLocaleTimeString() }}
            </span>
            <span v-if="account.id == entry.creatorId" @click="deleteEntry(entryData.id)" role="button" class="px-3 btn btn-danger bold" alt="click to delete this entry" title="Click to Delete this Entry">X</span>
          </div>
          <form  @submit.prevent="editEntry(entryData.id)">
            <div class="form-floating mb-3">
              <select v-model="entryData.notebookId" class="form-select" id="icon">
                <option v-for="notebook in notebooks" :key="notebook.id" :value="notebook.id">{{ notebook.title }}</option>
              </select>
              <label for="icon">Current Notebook</label>
            </div>
            <p class="italic px-2 text-primary mb-0">Clicking off of the note text box will save the Note</p>
            <div class="form-floating mb-2">
              <textarea @blur="editEntry(entryData.id)" v-model="entryData.description" type="text" class="form-control entry-note-text" id="description" title="Click to begin typing" maxlength="2000" placeholder="Today I..."  required ></textarea>
              <label for="description">Edit Note:</label>
            </div>
            <div class="text-center">
              <img v-if="entryData.img"
              class="entry-image img-fluid rounded user-select-none" 
              :src="entryData.img" 
              :alt="'Figure from' + entryData.creator.name" 
              :title="'Figure from' + entryData.creator.name">
            </div>
            <div class="form-floating my-2">
              <input v-model="entryData.img" type="url" class="form-control" id="img" placeholder="https://" title="Image URL" maxlength="500">
              <label for="img">Image Link</label>
            </div>
            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
        <!-- NOTE informational display card // logged out or different user -->
        <div v-else>
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
  </div>
</template>


<script>
import { computed, ref } from "vue"
import { Entry } from "../models/Entry.js"
import { entriesService } from "../services/EntriesService.js"
import Pop from "../utils/Pop.js"
import { AppState } from "../AppState.js"

export default {
  props: {entry: {type: Entry, required: true}},
setup(props){
  const entryData = ref({})
  entryData.value = {...props.entry}

return{
  entryData,
  account: computed(() => AppState.account),
  notebooks: computed(() => AppState.notebooks),
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
    },
  async editEntry(entryId) {
    try {
      await entriesService.editEntry(entryId, entryData.value)
      Pop.success('Entry was saved')
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
.entry-note-text {
  min-height: 20dvh;
}
</style>