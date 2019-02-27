<template>
  <div class="index">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-button
          size="md"
          @click="showCreateForm(edit = false, recipe = null)"
        >
          Create Recipe
        </b-button>
      </b-navbar-nav>
    </b-navbar>

    <Recipes v-bind:recipes="recipes"/>

    <!-- MODALS -->
    <!-- modal v-slot is not working!!!-->
    <RecipeForm ref="recipeform">
      <template v-slot:modal-ok>
        TestButtonOk
      </template>
      <template v-slot:modal-title>
        TestModalTitle
      </template>
    </RecipeForm>

  </div>
</template>

<script>
import axios from 'axios';
import Recipes from './Recipes.vue';
import RecipeForm from './RecipeForm.vue';

export default {
  name: 'Index',
  data() {
    return {
      recipes: null,
    };
  },
  mounted() {
    axios
      .get('http://localhost:3000/recipes')
      .then((response) => { this.recipes = response.data; });
  },
  methods: {
    showCreateForm(edit = false, recipe = null) {
      console.log(edit);
      this.$refs.recipeform.showModal(edit, recipe);
    },
  },
  components: {
    Recipes,
    RecipeForm,
  },
};
</script>

<style scoped>
.recipe-list-button:hover {
  background-color: #007bff;
  border-color: #007bff;
}
</style>
