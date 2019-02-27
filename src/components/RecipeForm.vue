<template>
    <b-modal
        ref="recipeFormModal"
        id="recipeForm"
        v-bind:title="formtitle"
        size="lg"
        >
        <b-form @submit="onSubmit" @reset="onClear">
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
                id="formDescription"
                label="Description"
                label-for="formDescriptionInput"
            >
            <b-form-input
                    id="formDescriptionInput"
                    type="text"
                    v-model="recipe.description"
                    placeholder="Description"
                />
            </b-form-group>

            <!-- <b-button type="submit" variant="primary">Create</b-button>
            <b-button type="reset" variant="danger">Clear</b-button> -->
        </b-form>
    </b-modal>
 </template>

<script>
export default {
  name: 'RecipeForm',
  data() {
    return {
      formtitle: 'Create Recipe',
      recipe: {
        title: '',
        ingredients: '',
        description: '',
      },
    };
  },
  mounted() {
    if (this.recipe) {
      this.formtitle = 'Edit Recipe';
    }
  },
  methods: {
    showModal() {
      this.$refs.recipeFormModal.show();
    },
    hideModal() {
      this.$refs.recipeFormModal.hide();
    },
  },
};
</script>

<style>
</style>
