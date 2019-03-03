<template>
    <b-modal
        ref="recipeFormModal"
        id="recipeForm"
        size="lg"
        v-on:ok="submitData($event)"
        >
        <template v-slot:modal-title>
          <slot name="title">Create</slot>
        </template>
        <template v-slot:modal-ok>
          <slot name="ok">Create</slot>
        </template>
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
                    v-model="ingredientString"
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
      ingredientString: '',
      recipe: {
        _id: '',
        title: '',
        ingredients: [],
        instructions: '',
      },
    };
  },
  methods: {
    showModal(edit = false, recipe = null) {
      this.editMode = edit;
      if (this.editMode && recipe != null) {
        this.recipe = recipe;
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
      // -------- Update --------
      if (this.editMode) {
        // PUT-request, requires id to be specified
        console.log('Recipe id in Form');
        console.log(this.recipe.id);
        const targetUrl = `${'http://localhost:3000/recipes/'}${this.recipe._id}`;
        console.log(targetUrl);
        console.log(this.recipe);

        axios
          .put(targetUrl, {
            recipe: {
              title: this.recipe.title,
              ingredients: this.recipe.ingredients,
              instructions: this.recipe.instructions,
            },
          })
          .then((response) => { console.log(response); });
      } else {
        // ------- Create --------
        axios
          .post('http://localhost:3000/recipes', {
            recipe: {
              title: this.recipe.title,
              ingredients: this.recipe.ingredients,
              instructions: this.recipe.instructions,
            },
          })
          .then((response) => { console.log(response); });
      }
      // NOT YET WORKING
      // ------- Update Parent -------
      this.$root.$nextTick(() => {
        this.$root.$emit('db-update');
        console.log('submitData triggered');
      });
    },
  },
};
</script>

<style>
</style>
