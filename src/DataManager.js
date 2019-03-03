import axios from "axios";

const HOST = "http://localhost:3000";

function getDatabaseObject(recipe) {
    return {
        recipe: {
            title: recipe.title,
            instructions: recipe.instructions,
            ingredients: recipe.ingredients,
            imageUrl: recipe.imageUrl,
        }
    }
}

function recipeUrl(recipe){
    return `${HOST + "/recipes/"}${recipe._id}`;
}

export const DataManager = {
    addRecipe: (recipe) => {
        axios
            .post(HOST + "/recipes", getCreateObject(recipe))
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
        axios
            .delete(HOST + '/recipes/' + recipe._id)
            .then((response) => { 
                console.log(response); 
            });
    },
    refreshRecipe: (recipe) => {
        return axios.get(recipeUrl(recipe))
    }
}