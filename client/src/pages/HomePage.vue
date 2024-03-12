<template>
  <!-- TODO fun landing page -->
  <h1 class="text-center mt-2">Welcome to Noter!</h1>
  <div class="container">
    <section class="row">
      <div class="col-md-12">
        <h2>My Notebooks</h2>
      </div>
    </section>
    <section class="row my-2">
      <div class="col-md-6 d-flex">
        <div class="tab rounded bg-dark shadow border border-subtle p-1"></div>
        <div class="rounded border border-subtle px-3 pt-1 shadow selectable">
          <h3>A Notebook</h3>
          <img class="img-fluid notebook-img" src="../assets/img/noter-logo.png" alt="filler">
          <p class="text-end">Entries: 12</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  setup() {
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
  .tab {

  }
}

notebook-img {}
</style>
