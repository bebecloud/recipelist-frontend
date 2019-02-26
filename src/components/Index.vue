<template>
    <div class="index">

        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">NavBar</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button size="md" type="submit">Create Recipe</b-button>
            </b-navbar-nav>
        </b-navbar>

        <Recipes v-bind:recipes="[{id:0, title:'Pasta!'}]"/>

        <div id="testcontainer">
            {{ recipes }}
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Recipes from './Recipes.vue';

export default {
  name: 'Index',
  data() {
    return {
      recipes: null,
    };
  },
  mounted() {
    // axios
    //   .get('localhost:3000/recipes')
    //   .then(response => (this.recipes = response.data));
  },
  components: {
    Recipes,
  },
};
</script>

<style scoped>
.recipe-list-button:hover {
    background-color: #007bff;
    border-color: #007bff;
}
</style>
