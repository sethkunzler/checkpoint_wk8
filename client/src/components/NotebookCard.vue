<template>
  <!-- <h1>Hi</h1> -->
  <div class="rounded shadow border border-2 p-1" :style="{ backgroundColor: notebook.color }"></div>
  <div class="rounded border border-subtle px-3 pt-1 shadow selectable d-flex flex-column justify-content-between">
    <h3 class=""><span class="mdi text-glow" :class="notebook.icon" :style="{color: `${notebook.color}`}"></span> {{notebook.title}}</h3>
    <img class="img-fluid rounded shadow mb-2" :src="notebook.coverImg" :alt="notebook.title">
    <p class="text-end italic mb-1">Entries: <b>{{ notebook.entryCount }}</b></p>
  </div>
</template>


<script>
import { Notebook } from '../models/Notebook.js'
export default {
  props: {notebook: {type: Notebook, required: true}},
  setup(){
    return{}
  }
}
</script>


<style lang="scss" scoped>

</style>