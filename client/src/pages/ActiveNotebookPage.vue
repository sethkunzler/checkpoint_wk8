<template>
  <div v-if="notebook">
    <div :style="{ backgroundImage: `url(${notebook.coverImg})` }" class="cover-image-container text-center user-select-none">
      <img class="cover-image" :src="notebook.coverImg" alt="">
    </div>
    <div class="container-fluid">
      <section class="row justify-content-center p-2 user-select-none">
        <div class="col-md-10">
          <h1 class="my-2 p-2 border border-dark rounded">
            <span class="mdi text-shadow border border-dark rounded px-2" :class="notebook.icon" :style="{ color: notebook.color}"></span>
              {{notebook.title}}
            <span class="mdi mdi-pencil fs-5 selectable rounded px-1"></span>
            </h1>
        </div>
        <div class="col-md-10">
          <div v-for="entry in entries" class="d-flex justify">
            <div class="p-1 rounded border border-2 shadow mx-1" :style="{ backgroundColor: notebook.color}"></div>
            <div class="bg-secondary p-2 rounded">
              <p>{{ entry }}</p>
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
</style>