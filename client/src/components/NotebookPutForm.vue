<template>
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
</template>


<script>
import { ref } from "vue";
import { Notebook } from '../models/Notebook.js'
export default {
  props: {notebook: {type: Notebook, required: true }},
  setup(){
    const editableNotebookData = ref({notebook})
    return{
    }
  }
}
</script>


<style lang="scss" scoped>

</style>