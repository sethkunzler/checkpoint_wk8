<template>
  <!-- <h1>Hi</h1> -->
  <div class="rounded shadow border border-2 p-1" :style="{ backgroundColor: notebook.color }"></div>
  <RouterLink :to="{name: 'Notebook', params: { notebookId: notebook.id}}" class="text-dark selectable rounded border border-subtle px-3 pt-1 shadow d-flex">
    <div class="d-flex flex-column justify-content-between">
      <h3 class=""><span class="mdi text-glow" :class="notebook.icon" :style="{color: `${notebook.color}`}"></span> {{notebook.title}}</h3>
      <img class="img-fluid rounded shadow mb-2" :src="notebook.coverImg" :alt="notebook.title">
      <div class="d-flex justify-content-between align-items-center">
        <RouterLink :to="{name: 'Account'}" class="text-light">
          <button @click="removeNotebook(notebook.id)" type="button" class="btn btn-danger p-1 px-2 mb-1"> Delete </button>
        </RouterLink>
        <p class="text-end italic mb-1">Entries: <b>{{ notebook.entryCount }}</b></p>
      </div>
    </div>
  </RouterLink> 
</template>


<script>
import { RouterLink, useRouter } from "vue-router";
import { Notebook } from '../models/Notebook.js'
import Pop from "../utils/Pop.js";
import { notebooksService } from "../services/NotebooksService.js";
import { AppState } from "../AppState.js";
export default {
  props: {notebook: {type: Notebook, required: true}},
  setup(){
    const router = useRouter
    return{
      async removeNotebook(notebookId) {
        try {
          const yes = await Pop.confirm()
          if (!yes) return
          await notebooksService.deleteNotebook(notebookId)
          AppState.activeNotebook = null
          router.loadPage('Home')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>