<template>
  <div>
    <b-list-group class="w-50 h-100 mx-auto">
      <b-list-group-item
        size="md"
        class="recipe-list-button"
        v-for="recipe in recipes"
        v-bind:key="recipe.id"
        v-on:click="showRecipe(recipe)"
        button
      >
        <b-media>
          <b-img v-bind:src="recipe.imageUrl" slot="aside" alt="Recipe Image" class="recipe-image"/>
          <div class="ml-0">
            <h5>{{recipe.title}}</h5>
            By {{recipe.author}}
          </div>
          
          <p class="mb-0">{{recipe.instructions}}</p>
        </b-media>
      </b-list-group-item>
    </b-list-group>

    <Recipe v-on:db-update="refresh" v-bind:recipe="currentRecipe" ref="recipe"></Recipe>
  </div>
</template>
vb
<script>
import Recipe from './Recipe.vue';

export default {
  name: 'Recipes',
  props: ['recipes'],
  components: { Recipe },
  methods: {
    refresh() {
      this.$emit('db-update');
    },
    showRecipe(recipe) {
      this.currentRecipe = recipe;
      this.$nextTick(() => {
        this.$root.$emit('bv::show::modal', 'recipeModal');
      });
    },
  },
  data() {
    return {
      currentRecipe: null,
    };
  },
};
</script>

<style scoped>
.recipe-image {
  width: 80px;
  height: 80px;
}
</style>
