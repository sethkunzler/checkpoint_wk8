<template>
  <!-- TODO fun landing page -->
  <h1 class="text-center mt-2 italic">Welcome to Noter!</h1>
  <div class="container">
    <section class="row">
      <div class="col-md-12">
        <h2>My Notebooks</h2>
      </div>
    </section>
    <section class="row my-2">
      <!-- v-for="notebook in notebooks" :key="notebook.id" -->
      <div class="col-md-6 d-flex">
        <div class="rounded bg-danger shadow border border-2 p-1"></div>
        <div class="rounded border border-subtle px-3 pt-1 shadow selectable">
          <h3>A Notebook</h3>
          <img class="img-fluid notebook-img" src="../assets/img/noter-logo.png" alt="filler">
          <p class="text-end italic">Entries: <b>12</b></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Pop from "../utils/Pop.js"

export default {
  setup() {
    onMounted(() => {getMyNotebooks()})
    async function getMyNotebooks() {
      try {
        
      } catch (error) {
        Pop(error)
      }
    }
    return {
      
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

</style>
