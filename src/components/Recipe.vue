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
    <b-button @click="deleteRecipe">Delete</b-button>
    <RecipeForm ref="recipeform"/>
  </b-modal>
</template>

<script>
import axios from 'axios';
import RecipeForm from './RecipeForm.vue';

export default {
  name: 'Recipe',
  props: ['recipe'],
  methods: {
    editRecipe() {
      console.log('Recipe id in Recipe');
      console.log(this.recipe._id);
      this.$refs.recipeform.showModal(true, this.recipe);
      console.log('Recipe: edit');
    },
    deleteRecipe() {
      axios
        .delete('http://localhost:3000/recipes/'+this.recipe._id)
        .then((response) => { console.log(response); });
        this.$refs.recipeModal.hide();
    },
    refresh() {
      axios
        .get('http://localhost:3000/recipes/'+this.recipe._id)
        .then((response) => { this.recipe = response.data });
    },
  },
  components: {
    RecipeForm,
  },
};
</script>
 <style scoped>
   .ingredients-list{
     text-align: left;
   }
</style>
