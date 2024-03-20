<template>
  <div class="about text-center">
    <h1 class="italic">Welcome {{ account.name }}!</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="container">
    <section class="row">
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center my-2">
          <h2>Unassigned Entries</h2>
          <button 
          type="button" 
          class="btn btn-info text-light" 
          data-bs-toggle="modal" 
          data-bs-target="#newEntryFormModal"> 
            + Create New Entry 
          </button>
        </div>
      </div>
    </section>
    <section class="row">
      <div v-for="entry in entries" class="col-md-12">
        <EntryCard :entry="entry" />
      </div>
    </section>
    <section class="row">
      <div class="col-md-12">
        
      </div>
    </section>
    <section class="row">
      <div class="col-md-12">
        <h2>My Notebooks</h2>
      </div>
    </section>
    <section class="row my-2">
      <div v-for="notebook in notebooks" :key="notebook.id" class="col-md-4 d-flex my-2">
        <NotebookCard :notebook="notebook" />
        <!-- STUB stubbed card into a component -->
        <!-- <div class="rounded shadow border border-2 p-1"
        :style="{ backgroundColor: notebook.color }"></div>
        <div class="rounded border border-subtle px-3 pt-1 shadow selectable d-flex flex-column justify-content-between">
          <h3 class=""><span class="mdi text-glow" :class="notebook.icon" :style="{color: `${notebook.color}`}"></span> {{notebook.title}}</h3>
          <img class="img-fluid rounded shadow mb-2" :src="notebook.coverImg" :alt="notebook.title">
          <p class="text-end italic mb-1">Entries: <b>{{ notebook.entryCount }}</b></p>
        </div> -->
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { notebooksService } from "../services/NotebooksService.js";
import Pop from "../utils/Pop.js";
import NotebookCard from '../components/NotebookCard.vue'
import EntryCard from "../components/EntryCard.vue";
import { entriesService } from "../services/EntriesService.js";
export default {
  setup() {
    onMounted(() => {
      getMyNotebooks()
      getMyEntries()
    })
    async function getMyNotebooks() {
      try {
        await notebooksService.getMyNotebooks()
      } catch (error) {
        Pop.error(error)
      }
    }
    async function getMyEntries() {
      try {
        await entriesService.getMyEntries()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      account: computed(() => AppState.account),
      notebooks: computed(() => AppState.notebooks.slice(0,9)),
      entries: computed(() => AppState.entries.reverse())
    }
  },
  components: { NotebookCard }
}
</script>

<style scoped>

</style>
