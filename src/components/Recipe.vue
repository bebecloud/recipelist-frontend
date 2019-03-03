 <template>
  <b-modal ref="recipeModal" id="recipeModal" title="Recipe" v-if="recipe">
    <h1>{{ recipe.title }}</h1>
    <b-media>
          <b-img v-bind:src="recipe.imageUrl" alt="Recipe Image"  fluid-grow />
    </b-media>
    <h2>Ingredients</h2>
      <ul class="ingredients-list">
        <li v-for="ingredient in recipe.ingredients" v-bind:key="ingredient">
          {{ingredient}}
        </li>
      </ul>
    <h2>Instructions:</h2>  
    <p>{{ recipe.instructions }}</p>
    <b-button @click="editRecipe">Edit Recipe</b-button>
    <RecipeForm ref="recipeform"/>
  </b-modal>
</template>

<script>
import RecipeForm from './RecipeForm.vue';

export default {
  name: 'Recipe',
  props: ['recipe'],
  components: { RecipeForm },
  methods: {
    editRecipe() {
      this.$refs.recipeform.showModal(true, this.recipe);
    },
  },
};
</script>
 <style scoped>
   .ingredients-list{
     text-align: left;
   }
</style>
