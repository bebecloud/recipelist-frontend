import axios from "axios";

const BUCKET = "https://bebecloudimages.s3.amazonaws.com/";
const IMAGE_BASE = "https://s3.amazonaws.com/bebecloudimages/"
const IMAGE_PLACEHOLDER = "https://livingstonbagel.com/wp-content/uploads/2016/11/food-placeholder.jpg";
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

function uploadImage(imageFile) {
    return new Promise(function (resolve, reject) {
        axios.put(BUCKET + imageFile.name, imageFile, {
            'Content-Type': imageFile.type,
            'Content-Length': imageFile.size
        }).then(function (response) {
            resolve(IMAGE_BASE + imageFile.name);
        }).catch((error) => {
            console.log(error);
            reject();
        })
    });
}

function pushNewRecipe(recipe) {
    axios.post(API_URL + "/recipes", getDatabaseObject(recipe))
        .then(response => {
            console.log(response);
        }).catch(error =>{
            console.log("Recipe uplaod failed: ");
            console.log(error)
        });
}

function pushEditedRecipe(recipe) {
    axios.put(recipeUrl(recipe), getDatabaseObject(recipe))
        .then(response => {
            console.log(response);
        });
}

export const DataManager = {
    addRecipe: (recipe, imageFile = nul) => {
        if (imageFile) {
            uploadImage(imageFile).then(imageUrl => {
                recipe.imageUrl = imageUrl;
                pushNewRecipe(recipe);
            })
        } else {
            recipe.imageUrl = IMAGE_PLACEHOLDER;
            pushNewRecipe(recipe);
        }
    },
    getRecipes: () => {
        return axios.get(API_URL + "/recipes");
    },
    editRecipe: (recipe, imageFile = null) => {
        if (imageFile) {
            uploadImage(imageFile).then((imageUrl) => {
                recipe.imageUrl = imageUrl;
                pushEditedRecipe(recipe);
            });
        } else {
            pushEditedRecipe(recipe);
        }
    },
    deleteRecipe: (recipe) => {
        return axios.delete(API_URL + '/recipes/' + recipe._id);
    },
    refreshRecipe: (recipe) => {
        return axios.get(recipeUrl(recipe));
    }
}
