<template>
    <div class="index">

        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="#">NavBar</b-navbar-brand>
            <b-navbar-nav class="ml-auto">
                <b-button size="md" type="submit">Create Recipe</b-button>
            </b-navbar-nav>
        </b-navbar>

        <b-list-group class="w-50 h-100 mx-auto">
            <b-list-group-item size="md" class="recipe-list-button">
                Delicious Pasta Carbonara
            </b-list-group-item>
        </b-list-group>
        <div id="testcontainer">
            {{ recipes }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Index',
    data () {
        return {
            recipes: null
        }
    },
    mounted () {
        axios
            .get('localhost:3000/recipes')
            .then(response => (this.info = response))
    }
}
</script>

<style scoped>
.recipe-list-button:hover {
    background-color: #007bff;
    border-color: #007bff;
}
</style>
