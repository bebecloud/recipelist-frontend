 <template>
    <b-modal
        ref="recipeModal"
        id="recipeModal"
        title="Recipe"
        v-if="recipe">
        <h1>{{ recipe.title }}</h1>
        <p>
            {{ recipe.instructions }}
        </p>

        <RecipeForm
            v-on:db-update="refresh" 
            v-bind:recipe="recipe"
            ref="editform">
          <template v-slot:title>
            Edit Recipe
          </template>
          <template v-slot:ok>
            Apply
          </template>
        </RecipeForm>

        <template v-slot:modal-footer>
          <b-button @click="deleteRecipe">Delete</b-button>
          <b-button @click="editRecipe">Edit</b-button>
        </template>
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
      this.$refs.editform.showModal(true, this.recipe);
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

 <style>

 </style>
