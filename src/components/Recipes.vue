<template>
    <b-list-group class="w-50 h-100 mx-auto">
        <b-list-group-item
            size="md"
            class="recipe-list-button"
            v-for="recipe in recipes"
            v-bind:key="recipe.id"
            button>
            {{ recipe.title }}
        </b-list-group-item>
    </b-list-group>
</template>

<script>
export default {
  name: 'Recipes',
  props: ['recipes']
};
</script>
