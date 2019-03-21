<template>
  <b-modal ref="recipeFormModal" id="recipeForm" size="lg" v-on:ok="submitData($event)">
    <template v-slot:modal-title>
      <slot name="title">{{ formtitle }}</slot>
    </template>
    <template v-slot:modal-ok>
      <slot name="ok">{{ buttonTextOk }}</slot>
    </template>
    <b-form>
      <b-form-group id="formTitle" label="Title" label-for="formTitleInput">
        <b-form-input
          id="formTitleInput"
          type="text"
          v-model="recipe.title"
          required
          placeholder="Title"
        />
      </b-form-group>

      <b-form-group
        id="formIngredient"
        label="Ingredients"
        label-for="formIngredientInput"
        description="separate ingredients by ,"
        required
      >
        <b-form-input
          id="formTitleInput"
          type="text"
          v-model="ingredientString"
          required
          placeholder="Ingredients"
        />
      </b-form-group>

      <b-form-group id="formInstruction" label="Instructions" label-for="formInstructionInput">
        <b-form-input
          id="formInstructionInput"
          type="text"
          v-model="recipe.instructions"
          placeholder="Instructions"
        />
      </b-form-group>

      <b-form-group id="formImageUpload" label="Upload an image" label-for="formImageInput">
        <b-form-file 
          accept="image/*"
          v-model="currentImage"
          :state="Boolean(currentImage)"
          placeholder="Choose image.."
          drop-placholder="Drop an image here.."
        />
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
// eslint-disable-next-line
import {DataManager} from "../DataManager.js"

export default {
  name: 'RecipeForm',
  data() {
    return {
      editMode: false,
      formtitle: "Create Recipe",
      buttonTextOk: "Create",
      currentImage: null,
      recipe: {
        _id: '',
        title: '',
        ingredients: [],
        instructions: '',
        imageUrl: '',
        author: '',
      },
    };
  },
  computed: {
    ingredientString: {
      get() {
        return this.recipe.ingredients.join(',');
      },
      set(ingredients) {
        this.recipe.ingredients = ingredients.split(',');
      },
    },
  },
  methods: {
    showModal(edit = false, recipe = null) {
      this.editMode = edit;
      if (this.editMode && recipe != null) {
        this.recipe = recipe;
        this.formtitle = 'Edit Recipe';
        this.buttonTextOk = 'Update';
      }
      this.$refs.recipeFormModal.show();
    },
    hideModal() {
      this.$refs.recipeFormModal.hide();
    },
    submitData(event) {
      // -------- Validation of form --------
      if (this.recipe.title === '' || this.recipe.ingredients === '') {
        // TODO provide better feedback, using the elements
        event.preventDefault();
        alert('Please fill in the title and ingredients');
        return;
      }

      if (!this.$auth.profile) {
        alert('Not logged in');
        return;
      }

      if (this.editMode) {
        DataManager.editRecipe(this.recipe, this.currentImage);
      } else {
        this.recipe.author_id = this.$auth.profile.sub;
        this.recipe.author = this.$auth.profile.nickname;
        DataManager.addRecipe(this.recipe, this.currentImage);
      }

      // NOT YET WORKING
      // ------- Update Parent -------
      this.$root.$nextTick(() => {
        this.$emit('db-update');
      });
    },
  },
};
</script>

<style>
</style>
