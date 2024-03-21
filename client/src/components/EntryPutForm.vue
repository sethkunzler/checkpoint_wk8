<template>
  <form  @submit.prevent="createEntry()">
    <div class="form-floating my-2">
      <input v-model="editableEntryData.img" type="url" class="form-control" id="img" placeholder="https://" title="Image URL" maxlength="500">
      <label for="img">Image Link</label>
    </div>
    <div class="form-floating my-2">
      <textarea v-model="editableEntryData.description" type="text" rows="12" class="form-control" id="description" title="Click to begin typing" maxlength="2000" placeholder="Today I..."  required ></textarea>
      <label for="description">New Note</label>
    </div>
    <div class="form-floating mb-3">
      <select v-model="editableEntryData.notebookId" class="form-select" id="icon">
        <option v-for="notebook in notebooks" :key="notebook.id" :value="notebook.id">{{ notebook.title }}</option>
      </select>
      <label for="icon">Select Notebook</label>
    </div>
    <div class="d-flex justify-content-end">
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </form>
</template>


<script>
import {Entry} from '../models/Entry.js'
import {computed} from 'vue'
import { AppState } from "../AppState.js"


export default {
  props: {editableEntryData: {type: Entry, required: true}},
  setup(){
    return{
      notebooks: computed(() => AppState.notebooks),
      notebook: computed(() => AppState.activeNotebook)
  }
  }
}
</script>


<style lang="scss" scoped>

</style>