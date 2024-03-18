<template>
  <div v-if="notebook">
    <div :style="{ backgroundImage: `url(${notebook.coverImg})` }" 
    class="cover-image-container text-center user-select-none">
      <img class="cover-image" :src="notebook.coverImg" alt="">
    </div>
    <div class="container-fluid">
      <section class="row justify-content-center p-2 user-select-none">
        <div class="col-md-10">
          <div class="d-flex my-2 justify-content-between">
            <h1>
              <span class="mdi text-shadow px-2" :class="notebook.icon" :style="{ color: notebook.color}">
              </span>
                {{notebook.title}}
              <span class="mdi mdi-pencil fs-5 selectable rounded px-1">
              </span>
            </h1>
            <button type="button" 
            class="btn btn-info text-light" 
            data-bs-toggle="modal" 
            data-bs-target="#newEntryFormModal">
              New Entry
            </button>
          </div>
          <hr class="bg-o-orange p-1 rounded">
        </div>
        <div class="col-md-10">
          <div v-for="entry in entries" :key="entry.id">
            <div>
              <div class="d-flex justify my-2">
                <div class="p-1 rounded border border-2 shadow mx-1" 
                :style="{ backgroundColor: notebook.color}">
                </div>
                <div class="bg-secondary p-2 shadow rounded my-1">
                  <p>{{ entry.description }}</p>
                  <div class="text-center">
                    <img class="entry-image img-fluid rounded" 
                    :src="entry.img" 
                    :alt="'Figure from' + notebook.creator.name" 
                    :title="'Figure from' + notebook.creator.name">
                  </div>
                  <div>
                    <div class="d-flex justify-content-between align-items-center mx-2 mt-2">
                      <span class="text-end mb-0 italic">
                        Last Edit: {{ entry.updatedAt.toLocaleDateString() + ' ' + entry.updatedAt.toLocaleTimeString() }}
                      </span>
                      <span role="button" class="px-3 btn btn-danger bold">X</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { notebooksService } from "../services/NotebooksService.js"
import { computed, onMounted } from "vue"
import { AppState } from "../AppState.js"
import { entriesService } from "../services/EntriesService.js"

export default {
setup(){
  const route = useRoute()
  onMounted(() => {
    getNotebookById()
    getEntriesByNotebookId()
  })
  async function getNotebookById() {
    try {
      const notebookId = route.params.notebookId
      await notebooksService.getNotebookById(notebookId)
    } catch (error) {
      Pop.error(error)
    }
  }
  async function getEntriesByNotebookId() {
    try {
      const notebookId = route.params.notebookId
      await entriesService.getEntriesByNotebookId(notebookId)
    } catch (error) {
      Pop.error(error)
    }
  }
return{
  notebook: computed(() => AppState.activeNotebook),
  entries: computed(() => AppState.entries)
}
}
}
</script>


<style lang="scss" scoped>
.cover-image {
  min-width: 20dvw;
  max-width: 80dvw;
  height: 20dvh;
  object-fit: cover;
}
.cover-image-container {
  background-color: rgba(0, 0, 0, 0.50);
  background-blend-mode: color;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.entry-image {
  max-height: 80dvh;
}
</style>