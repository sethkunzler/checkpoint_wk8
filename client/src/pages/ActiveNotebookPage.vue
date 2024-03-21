<template>
  <div v-if="notebook">
    <div :style="{ backgroundImage: `url(${notebook.coverImg})` }"
      class="cover-image-container text-center user-select-none">
      <img class="cover-image" :src="notebook.coverImg" alt="">
    </div>
    <div class="container-fluid">
      <!-- NOTE this is the Notebook details -->
      <section class="row justify-content-center p-2 user-select-none notebook-details" v-if="!editing">
        <div class="col-md-10">
          <div class="d-flex my-2 justify-content-between">
            <h1>
              <span class="mdi text-shadow px-2" :class="notebook.icon" :style="{ color: notebook.color }">
              </span>
              {{ notebook.title }}
              <button v-if="account.id == notebook.creatorId" class="btn" @click="editing = true" alt="click to edit notebook title, image, color, or icon" title="Click to Edit Notebook">
                <span class="mdi mdi-pencil fs-5 selectable rounded px-1">
                </span>
              </button>
            </h1>
            <button v-if="account.id == notebook.creatorId" type="button" class="btn btn-info text-light" data-bs-toggle="modal"
              data-bs-target="#newEntryFormModal" alt="click to create a new entry notebook" title="Click to create a New Entry">
              New Entry
            </button>
          </div>
        </div>
        <div class="col-md-10">
          <p class="fs-6 px-2 italic">
            Updated At: <span class="bold">{{ notebook.updatedAt.toLocaleDateString() + ' || ' +
    notebook.updatedAt.toLocaleTimeString() + ', ' }}</span>
            Created At: <span class="bold">{{ notebook.createdAt.toLocaleDateString() + ' || ' +
    notebook.createdAt.toLocaleTimeString() }}</span>
          </p>
        </div>
      </section>
      <!-- NOTE this the Form  -->
      <section class="row edit-notebook justify-content-center" v-else>
        <div class="col-md-10">
          <!-- <NotebookPutForm :notebook="notebook" /> -->
          <form @submit.prevent="editNotebookData()" class="mt-4">
            <div class="form-floating mb-3">
              <input v-model="editableNotebookData.title" type="text" class="form-control" id="title" placeholder="Title" minlength="3" maxlength="50">
              <label for="title">Title</label>
            </div>
            <div class="form-floating mb-3">
              <input v-model="editableNotebookData.coverImg" type="url" class="form-control" id="coverImg" minlength="3" maxlength="500" placeholder="https://www.svgrepo.com/show/508699/landscape-placeholder.svg">
              <label for="coverImg">Cover Image Link</label>
            </div>
            <div class="form-floating mb-3">
              <select v-model="editableNotebookData.icon" class="form-select" id="icon">
                <option value="mdi-pencil" selected>Pencil</option>
                <option v-for="icon in myIcons" :key="icon.value" :value="icon.value">{{ icon.label }}</option>
              </select>
              <label for="icon">Select Your Icon</label>
            </div>
            <div class="px-2">
              <label for="color" class="form-label">Notebook Color</label>
              <input v-model="editableNotebookData.color" type="color" class="form-control form-control-color" id="color" value="#6905FF" title="Choose your color">
              <p class="italic opacity75 text-info mb-0">recommended: not black or white</p>
            </div>
            <button type="submit" class="btn btn-primary my-2" alt="Save Notebook Information" title="Click to Save the New Notebook Information">Save</button>
          </form>
        </div>
      </section>

      <section class="row entries justify-content-center">
        <div class="col-md-10">
          <hr class="bg-o-orange p-1 rounded">
          <div v-for="entry in entries" :key="entry.id">
            <EntryCard :entry="entry" />
            <!-- STUB Original Entry Card  -->
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
      </section>

      <section class="row notebook-controls justify-content-center">
        <div class="col-md-10 my-3 d-flex justify-content-end">
          <!-- :class="theme == 'light' ? 'text-shadow' : 'text-glow'"-->
          <button v-if="account.id == notebook.creatorId" @click="removeNotebook(notebook.id)" type="button"
            class="btn btn-danger shadow">
            Delete Notebook
          </button>
        </div>
      </section>
    </div>
  </div>
</template>


<script>
import { useRoute } from 'vue-router'
import Pop from '../utils/Pop.js'
import { notebooksService } from "../services/NotebooksService.js"
import { computed, ref, watch } from "vue"
import { AppState } from "../AppState.js"
import { entriesService } from "../services/EntriesService.js"
import { router } from "../router.js"
import EntryCard from "../components/EntryCard.vue"
import NotebookPutForm from "../components/NotebookPutForm.vue"
import { logger } from "../utils/Logger.js"
// import { loadState, saveState } from "../utils/Store.js"
export default {
  setup() {
    const route = useRoute()
    const editing = ref(false)
    const editableNotebookData = ref({...AppState.activeNotebook})
    // const theme = ref(loadState('theme'))
    const notebookId = route.params.notebookId
    const myIcons = [
      {value: 'mdi-database', label: 'Data base'}, 
      {value: 'mdi-cloud', label: 'Cloud'}, 
      {value: 'mdi-package', label: 'Package'},
      {value:'mdi-palette', label: 'Palette'},
      {value:'mdi-home', label: 'home'},
      {value:'mdi-code-array', label: 'Code Array'},
      {value:'mdi-xml', label: 'XML'},
      {value:'mdi-cash', label: 'Cash'},
      {value:'mdi-food-apple', label: 'Apple'},
      {value:'mdi-account', label: 'Person'},
      {value:'mdi-shield', label: 'Shield'},
    ]
    async function getNotebookById(notebookId) {
      try {
        await notebooksService.getNotebookById(notebookId)
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getEntriesByNotebookId(notebookId) {
      try {
        await entriesService.getEntriesByNotebookId(notebookId)
      } catch (error) {
        Pop.error(error)
      }
    }
    watch(() => route.params.notebookId, () => {
      getNotebookById(route.params.notebookId)
      getEntriesByNotebookId(route.params.notebookId)
    }, { immediate: true })
    watch(() => AppState.activeNotebook, () => {
      editableNotebookData.value = {...AppState.activeNotebook}
      getEntriesByNotebookId(route.params.notebookId)
    })
    // watch(theme, )
    return {
      // theme,
      editing,
      editableNotebookData,
      notebookId, 
      myIcons,
      account: computed(() => AppState.account),
      notebook: computed(() => AppState.activeNotebook),
      entries: computed(() => AppState.entries.reverse()),
      async editNotebookData() {
        try {
          await notebooksService.editNotebookData(editableNotebookData.value, notebookId)
          editing.value = false
        } catch (error) {
          Pop.error(error)
        }
      },
      async removeNotebook(notebookId) {
        try {
          const yes = await Pop.confirm()
          if (!yes) return
          const message = await notebooksService.deleteNotebook(notebookId)
          Pop.success(message)
          AppState.activeNotebook = null
          router.push({ name: 'Account' })
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  },
  components: { EntryCard, NotebookPutForm }
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