import axios from "axios";

const HOST = "http://localhost:3000";

function getDatabaseObject(recipe) {
    return {
        recipe: {
            title: recipe.title,
            instructions: recipe.instructions,
            ingredients: recipe.ingredients,
            imageUrl: recipe.imageUrl,
            author_id: recipe.author_id,
            author: recipe.author,
        }
    }
}

function recipeUrl(recipe){
    return `${HOST + "/recipes/"}${recipe._id}`;
}

export const DataManager = {
    getRecipes: () => {
        return axios.get(HOST + "/recipes");
    },
    addRecipe: (recipe) => {
        axios
            .post(HOST + "/recipes", getDatabaseObject(recipe))
            .then(response => {
                console.log(response);
            });
    },
    editRecipe: (recipe) => {
        axios
            .put(recipeUrl(recipe), getDatabaseObject(recipe))
            .then(response => {
                console.log(response);
            });
    },
    deleteRecipe: (recipe) => {
        return axios.delete(HOST + '/recipes/' + recipe._id);
    },
    refreshRecipe: (recipe) => {
        return axios.get(recipeUrl(recipe));
    }
}