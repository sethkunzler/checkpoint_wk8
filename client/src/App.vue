<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
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
