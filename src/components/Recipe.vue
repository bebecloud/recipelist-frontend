 <template>
  <b-modal ref="recipeModal" id="recipeModal" title="Recipe" v-if="recipe">
    <h1>{{ recipe.title }}</h1>
    By {{ recipe.author }}
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

    <div slot="modal-footer" class="w-100">
      <b-button v-if="validAuthor" @click="deleteRecipe" class="float-left mx-auto" variant="danger">Delete</b-button>
      <b-button v-if="validAuthor" @click="editRecipe" class="pl-3">Edit Recipe</b-button>
      <b-button @click="closeModal" class="float-right mx-auto" variant="primary">Ok</b-button>
    </div>

    <RecipeForm v-on:db-update="refresh" ref="recipeform"/> 
  </b-modal>
</template>

<script>
import axios from 'axios';
import RecipeForm from './RecipeForm.vue';
import {DataManager} from '../DataManager.js'

export default {
  name: 'Recipe',
  props: ['recipe'],
  computed: {
    validAuthor: function() {
      if (this.$auth.profile == null) {
        return false;
      }
      return this.$auth.profile.sub == this.recipe.author_id;
    },
  },
  methods: {
    editRecipe() {
      this.$refs.recipeform.showModal(true, this.recipe);
    },
    deleteRecipe() {
        DataManager.deleteRecipe(this.recipe).then((response) => {
          this.$emit('db-update');
          this.closeModal();
        });
    },
    refresh() {
        DataManager.refreshRecipe(this.recipe).then((response) => { 
          this.recipe = response.data 
        });
    },
    closeModal() {
      this.$refs.recipeModal.hide();
    }
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
