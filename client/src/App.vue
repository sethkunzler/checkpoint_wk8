<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
<!-- NOTE Notebooks off-canvas  -->
<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="myNotebooks" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">📓 My Notebooks</h5>
    <button class="btn btn-info fs-1 pt-0 px-3 my-0 border border-2 " data-bs-target="#CreateNotebookModal" data-bs-toggle="modal" title="Add Notebook">+</button>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div class="container">
      <section class="row">
        <div v-for="notebook in notebooks" :key="notebook.id" class="col-12 d-flex flex-row my-2">
        <NotebookCard :notebook="notebook" />
        </div>
      </section>
    </div>
  </div>
</div>
<!-- NOTE Create Notebook modal -->
<div class="modal fade" id="CreateNotebookModal" aria-hidden="true" aria-labelledby="CreateNotebookModalLabel" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="CreateNotebookModalLabel">Create a New Notebook</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <p class="opacity75 italic px-2 text-info">Clicking outside the box will dismiss it</p>
      <form @submit.prevent="createNotebook()">
        <div class="modal-body">
          <div class="form-floating mb-3">
            <input v-model="editableNotebookData.title" type="text" class="form-control" id="title" placeholder="Title" minlength="3" maxlength="50" required>
            <label for="title">Title</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editableNotebookData.coverImg" type="url" class="form-control" id="coverImg" minlength="3" maxlength="500" required placeholder="https://www.svgrepo.com/show/508699/landscape-placeholder.svg">
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
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>
<!-- NOTE Create New Entry Form Modal  -->
<div class="modal fade" id="newEntryFormModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="newEntryFormModalLabel">Write Your Entry</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form  @submit.prevent="createEntry()">
          <div class="form-floating my-2">
            <input v-model="editableEntryData.img" type="url" class="form-control" id="img" placeholder="https://" title="Image URL" maxlength="500">
            <label for="img">Image Link</label>
          </div>
          <div class="form-floating my-2">
            <textarea v-model="editableEntryData.description" type="text" rows="12" class="form-control" id="description" title="Click to begin typing" maxlength="2000" placeholder="Today I..."  required ></textarea>
            <label for="description">New Note</label>
          </div>
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


</template>


<script>
import { computed, ref } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import NotebookCard from './components/NotebookCard.vue'
import Pop from "./utils/Pop.js";
import { notebooksService } from "./services/NotebooksService.js";
import { entriesService } from "./services/EntriesService.js";
import { Modal } from "bootstrap";
import { useRoute, useRouter } from "vue-router";
import { Entry } from "./models/Entry.js";
import { logger } from "./utils/Logger.js";

export default {
  setup() {
    const editableNotebookData = ref({title: "My Notebook", coverImg: "https://images.unsplash.com/photo-1670974636823-1341d802d5b4?q=80&w=3864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",  icon: "mdi-pencil", color:"#FF0000"})
    const editableEntryData = ref({descrition: "", img: ""})
    const router = useRouter()
    const route = useRoute()
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
    return {
      myIcons,
      editableNotebookData,
      editableEntryData,
      appState: computed(() => AppState),
      account: computed(() => AppState.account),
      notebooks: computed(() => AppState.notebooks),
      async createNotebook() {
        try {
          const notebook = await notebooksService.createNotebook(editableNotebookData.value)
          editableNotebookData.value = {title: "", coverImg: "",  icon: "mdi-pencil", color:"#F0F0F0"}
          Modal.getOrCreateInstance('#createNotebookModal').hide()
          router.push({ name: 'Notebook', params: {notebookId: notebook.id}})
        } catch (error) {
          Pop.error(error)
        }
      }, 
      async createEntry() {
        try {
          const notebookId = route.params.notebookId
          const entryData = editableEntryData.value
          logger.log(entryData)
          await entriesService.createEntry(notebookId, entryData)
          editableEntryData.value = {img: "", description: ""}
          Modal.getOrCreateInstance('#newEntryFormModal').hide()
        } catch (error) {
          Pop.error(error)
        }
      }
    }

  },
  components: { Navbar, NotebookCard }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
  --orangutan-orange: #f2c64f; 
}
.o-orange {
  color: var(--orangutan-orange);
}
.bg-o-orange {
  background-color: var(--orangutan-orange);
}
.bold {
  font-weight: bold;
}
.italic {
  font-style: italic;
}
.text-shadow {
  text-shadow: 1px 1px 4px black;
}
.text-glow {
  text-shadow: -1px -1px 2px rgba(255, 255, 255, 0.75);
}
footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
