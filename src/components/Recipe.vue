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
    </b-modal>
 </template>

<script>
export default {
  name: 'Recipe',
  props: ['recipe'],
};
</script>

 <style>

 </style>
