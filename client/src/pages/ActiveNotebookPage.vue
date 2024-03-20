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
            <EntryCard :entry="entry"/>
            <!-- STUB  -->
            <!-- <div>
              <div class="d-flex justify my-2">
                <div class="p-1 rounded border border-2 shadow mx-1" 
                :style="{ backgroundColor: notebook.color}">
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
            </div> -->
          </div>
        </div>
        <div class="col-md-10 my-3 d-flex justify-content-end">
          <RouterLink :to="{name: 'Account'}" class="text-light">
            <!-- :class="theme == 'light' ? 'text-shadow' : 'text-glow'"-->
            <button v-if="account.id == notebook.creatorId" @click="removeNotebook(notebook.id)" type="button" class="btn btn-danger shadow"> Delete Notebook </button>
          </RouterLink>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { notebooksService } from "../services/NotebooksService.js"
import { computed, onMounted, ref, watch } from "vue"
import { AppState } from "../AppState.js"
import { entriesService } from "../services/EntriesService.js"
import { router } from "../router.js"
import EntryCard from "../components/EntryCard.vue"
// import { loadState, saveState } from "../utils/Store.js"
export default {
  setup(){
    const route = useRoute()
    // const theme = ref(loadState('theme'))
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
    // watch(theme, )
    return{
      // theme,
      account: computed(() => AppState.account),
      notebook: computed(() => AppState.activeNotebook),
      entries: computed(() => AppState.entries),
      async removeNotebook(notebookId) {
        try {
          const yes = await Pop.confirm()
          if (!yes) return
          const message = await notebooksService.deleteNotebook(notebookId)
          Pop.confirm(message)
          AppState.activeNotebook = null
          router.loadPage('Account')
        } catch (error) {
          Pop.error(error)
        }
      }
    }
    components: { EntryCard }
  }
}
</script>


<style lang="scss" scoped>
.cover-image {
  min-width: 20dvw;
  max-width: 80dvw;
  height: 60dvh;
  object-fit: cover;
}
.cover-image-container {
  background-color: rgba(0, 0, 0, 0.40);
  background-blend-mode: color;
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>