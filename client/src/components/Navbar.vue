<template>
  <nav class="d-flex flex-row justify-content-around navbar navbar-expand-sm bg-o-orange shadow px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="../assets/img/noter-logo.png" height="45" />
      </div>
    </router-link>
    <div class="text-center">
      <button class="navbar-toggler my-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse text-center" id="navbarText">
        <button v-if="account.id != undefined" class="btn bg-o-orange text-black selectable border-black border-subtle" type="button" role="button" data-bs-toggle="offcanvas" data-bs-target="#myNotebooks" aria-controls="myNotebooks" alt="a button that pulls up a list of all my notebooks" title='Click to pull up all "My Notebooks"'>My Notebooks</button>
        <!-- REVIEW need a navbar? -->
        <!-- <ul class="navbar-nav me-auto">
          <li>
            <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
              About
            </router-link>
          </li>
        </ul> -->
        <!-- LOGIN COMPONENT HERE  -->
        <div>
          <button class="btn text-dark bg-light m-2" @click="toggleTheme" :title="theme == 'light' ? 'Enable Dark Mode' : 'Disable Dark Mode'">
            <i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i>
            <!-- :class="theme == 'light' ? 'text-glow' : 'text-shadow'" -->
          </button>
        </div>
        <Login />
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref, watch } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
import { AppState } from '../AppState.js'
import { notebooksService } from "../services/NotebooksService.js";
import Pop from "../utils/Pop.js";
export default {
  setup() {
    const theme = ref(loadState('theme') || 'light')
    // async function getMyNotebooks() {
    //   try {
    //     await notebooksService.getMyNotebooks()
    //   } catch (error) {
    //     Pop.error(error)
    //   }
    // }
    watch(() => theme, () => {
      document.documentElement.setAttribute('data-bs-theme', theme.value)
    }, {immediate: true})
    // watch(() => AppState.activeNotebook, () => {
    //   getMyNotebooks()
    // }, {immediate: true})
    // watch(() => AppState.entries, () => {
    //   getMyNotebooks()
    // }, {immediate: true})
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      notebooks: computed(() => AppState.notebooks),
      theme,
      toggleTheme() {
        theme.value = theme.value == 'light' ? 'dark' : 'light'
        document.documentElement.setAttribute('data-bs-theme', theme.value)
        saveState('theme', theme.value)
      }
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 576px) {
  nav {
    height: 64px;
  }
}
</style>
