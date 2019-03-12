import axios from "axios";

const HOST = "http://localhost:3000";
const BUCKET = "https://bebecloudimages.s3.amazonaws.com/";
const IMAGE_BASE = "https://s3.amazonaws.com/bebecloudimages/"
const IMAGE_PLACEHOLDER = "https://livingstonbagel.com/wp-content/uploads/2016/11/food-placeholder.jpg";

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

function recipeUrl(recipe) {
    return `${HOST + "/recipes/"}${recipe._id}`;
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
    axios.post(HOST + "/recipes", getCreateObject(recipe))
        .then(response => {
            console.log(response);
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
                pushNewRecipe(recipe.imageUrl)
            })
        } else {
            recipe.imageUrl = IMAGE_PLACEHOLDER;
            pushNewRecipe(recipe);
        }
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