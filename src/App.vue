<template>
  <div class="app">
    <router-view></router-view>
    <b-navbar toggleable="lg" type="dark" variant="warning">

      <b-navbar-nav id="btnAuth">
        <b-button
        v-if="!isAuthenticated"
        @click.prevent="login"
        size="sm"
        class="my-2 my-sm-0"
        variant="danger"
        type="submit"
        >
          Login
        </b-button>

        <b-button
        v-if="isAuthenticated"
        @click.prevent="logout"
        size="sm"
        class="my-2 my-sm-0"
        variant="danger"
        type="submit"
        >
          Log Out
        </b-button>
      </b-navbar-nav>

      <b-navbar-nav
        v-if="profile"
      >
        <b-container>
          <b-nav-text>
            {{ (profile.name)  }}
          </b-nav-text>
        </b-container>
      </b-navbar-nav>

      <b-navbar-brand class="m-auto" href="#">
        RecipeBook
      </b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <b-button
          size="sm"
          variant="danger"
          :disabled="!isAuthenticated"
          @click="showCreateForm(edit = false, recipe = null)"
        >
          Create Recipe
        </b-button>
      </b-navbar-nav>
    </b-navbar>

    <Recipes v-on:db-update="refresh" v-bind:recipes="recipes"/>

    <!-- MODAL -->
    <RecipeForm v-on:db-update="refresh" ref="recipeform"/>

  </div>
</template>

<script>
// eslint-disable-next-line
import Recipes from './components/Recipes.vue';
import RecipeForm from './components/RecipeForm.vue';
import { DataManager } from './DataManager';

export default {
  name: 'app',
  data() {
    return {
      recipes: null,
      isAuthenticated: false,
      profile: this.$auth.profile,
    };
  },
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.log(e);
    }
  },
  mounted() {
    this.refresh();
    this.isAuthenticated = this.$auth.profile !== null;
  },
  methods: {
    showCreateForm(edit = false, recipe = null) {
      // Authenticate
      this.$refs.recipeform.showModal(edit, recipe);
    },
    refresh() {
      DataManager.getRecipes().then((response) => {
        this.recipes = response.data;
      });
    },
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logout();
    },
    handleLoginEvent(data) {
      console.log(data);
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    },
  },
  components: {
    Recipes,
    RecipeForm,
  },
};
</script>

<style scoped>
.recipe-list-button:hover {
  background-color: #007bff;
  border-color: #007bff;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
