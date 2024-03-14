<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
<!-- NOTE off-canvas modal -->
<div class="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="myNotebooks" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">📓 My Notebooks</h5>
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
</template>


<script>
import { computed, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import NotebookCard from './components/NotebookCard.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState),
      account: computed(() => AppState.account),
      notebooks: computed(() => AppState.notebooks)
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
