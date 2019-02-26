<template>
    <b-list-group class="w-50 h-100 mx-auto">
        <b-list-group-item
            size="md"
            class="recipe-list-button"
            v-for="recipe in recipes"
            v-bind:key="recipe.id"
            button>
            <b-media>
                <b-img v-bind:src="recipe.imageUrl" slot="aside" alt="Recipe Image" class="recipe-image"/>
                <h5 class="mt-0">{{recipe.title}}</h5>
                <p class="mb-0">
                    {{recipe.instructions}}
                </p>
            </b-media>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
export default {
  name: 'Recipes',
  props: ['recipes']
};
</script>

<style scoped>
    .recipe-image{
        width: 80px;
        height: 80px;
    }
</style>
