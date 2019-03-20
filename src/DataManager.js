import axios from "axios";

const API_URL = process.env.NODE_ENV === 'production' ? 'http://ec2-3-94-8-177.compute-1.amazonaws.com:30000' : 'http://localhost:3000';

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
    return `${API_URL + "/recipes/"}${recipe._id}`;
}

export const DataManager = {
    getRecipes: () => {
        return axios.get(API_URL + "/recipes");
    },
    addRecipe: (recipe) => {
        axios
            .post(API_URL + "/recipes", getDatabaseObject(recipe))
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
        return axios.delete(API_URL + '/recipes/' + recipe._id);
    },
    refreshRecipe: (recipe) => {
        return axios.get(recipeUrl(recipe));
    }
}
