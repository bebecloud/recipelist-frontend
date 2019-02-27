<template>
    <b-modal
        ref="recipeFormModal"
        id="recipeForm"
        v-bind:title="formtitle"
        size="lg"
        v-on:ok="submitData"
        >
        <b-form>
            <b-form-group
                id="formTitle"
                label="Title"
                label-for="formTitleInput"
            >
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
                    v-model="recipe.ingredients"
                    required
                    placeholder="Ingredients"
                />
            </b-form-group>

            <b-form-group
                id="formInstruction"
                label="Instructions"
                label-for="formInstructionInput"
            >
            <b-form-input
                    id="formInstructionInput"
                    type="text"
                    v-model="recipe.instructions"
                    placeholder="Instructions"
                />
            </b-form-group>
            <!-- <b-button type="submit" variant="primary">Create</b-button>
            <b-button type="reset" variant="danger">Clear</b-button> -->
        </b-form>
    </b-modal>
 </template>

<script>
import axios from 'axios';

export default {
  name: 'RecipeForm',
  data() {
    return {
      editMode: false,
      formtitle: 'Create Recipe',
      buttonTextOk: 'Create',
      recipe: {
        title: '',
        ingredients: '',
        instructions: '',
      },
    };
  },
  methods: {
    showModal(edit = false, recipe = null) {
      this.editMode = edit;
      if (this.editMode) {
        this.formtitle = 'Edit Recipe';
        this.buttonTextOk = 'Apply';
        if (recipe != null) {
          this.recipe = recipe;
        }
      }
      this.$refs.recipeFormModal.show();
    },
    hideModal() {
      this.$refs.recipeFormModal.hide();
    },
    submitData() {
      if (this.editMode) {
        // PUT-request, requires id to be specified
        
      } else {
        // POST-request
        axios
          .post('http://localhost:3000/recipes', {
            'recipe': {
              'title': this.recipe.title,
              'ingredients': this.recipe.ingredients,
              'instructions': this.recipe.instructions
            },
          })
          .then((response) => { console.log(response); })
      }
      console.log('submitData triggered');
    },
  },
};
</script>

<style>
</style>
