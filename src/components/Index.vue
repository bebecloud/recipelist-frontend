<template>
  <div class="index">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-button size="md" type="submit">Create Recipe</b-button>
      </b-navbar-nav>
    </b-navbar>

    <Recipes v-bind:recipes="recipes"/>

    <b-button v-b-modal.modal1>Launch demo modal</b-button>

    <!-- Modal Component -->
    <b-modal id="modal1" title="BootstrapVue">
      <p class="my-4">Hello from modal!</p>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import Recipes from "./Recipes.vue";

export default {
  name: "Index",
  data() {
    return {
      recipes: null
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/recipes")
      .then(response => (this.recipes = response.data));
  },
  components: {
    Recipes
  }
};
</script>

<style scoped>
.recipe-list-button:hover {
  background-color: #007bff;
  border-color: #007bff;
}
</style>
