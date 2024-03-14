<template>
  <nav class="d-flex flex-row justify-content-around navbar navbar-expand-sm bg-o-orange shadow px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <img alt="logo" src="../assets/img/noter-logo.png" height="45" />
      </div>
    </router-link>
    <div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <button v-if="notebooks != []" class="btn bg-o-orange text-dark selectable border-dark border-subtle" type="button" data-bs-toggle="offcanvas" data-bs-target="#myNotebooks" aria-controls="offcanvasScrolling">📓 My Notebooks</button>
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
          <button class="btn text-dark text-glow" @click="toggleTheme">
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
import { computed, onMounted, ref } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
import { AppState } from '../AppState.js'
import { notebooksService } from "../services/NotebooksService.js";
export default {
  setup() {
    const theme = ref(loadState('theme') || 'light')
    onMounted(() => {
      document.documentElement.setAttribute('data-bs-theme', theme.value)
    })

    return {
      user: computed(() => AppState.user),
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
