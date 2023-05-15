import { defineComponent, ref } from 'vue';
import FavoriteView from '../views/FavoriteView';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get, getDatabase, ref as dbRef, onValue } from "firebase/database";

const Favorite = defineComponent({
  props: {
    model: {
      Object
    },
  },

  setup(props) {

    /*
    const auth = getAuth();
    const database = getDatabase();
    const user = ref(null);
    const favoriteRecipes = ref([]);
    const isAuthenticated = ref(null);
    onAuthStateChanged(auth, (userAuth) => {
      isAuthenticated.value = !!userAuth
      user.value = userAuth;
      if (userAuth) {
        const favoriteRef = dbRef(database, `users/${userAuth.uid}/favorites`);
        onValue(favoriteRef, async (snapshot) => {
          const favorites = [];
          const promises = [];

          snapshot.forEach((recipe) => {
            const recipeId = recipe.key;
            const recipeDataPromise = get(dbRef(database, `allfavorites/${recipeId}`)).then((recipeSnapshot) => {
              const recipeData = recipeSnapshot.val();
              if (recipeData) {
                return {
                  id: recipeId,
                  title: recipeData.title,
                  ingredients: recipeData.ingredients,
                  instructions: recipeData.instructions
                };
              }
            });
            promises.push(recipeDataPromise);
          });

          const results = await Promise.all(promises);
          favorites.push(...results.filter(Boolean));
          favoriteRecipes.value = favorites;
        });
      } else {
        favoriteRecipes.value = [];
      }
    });
*/
    const isSearching = ref(false);
    const favorites = reactive(props.model.favoriteRecipes);
    const currentlyDisplayedRecipes = favorites;
    const query = "";

    function search() {
      if (query == "") {
        currentlyDisplayedRecipes = favorites;
        isSearching.value = false;
      }

    }

    function removeFavorite(id) {
      props.model.removeFromFavorites(id);
    }

    function updateQuery(newQuery) {
      query = newQuery;
    }



    return function render() {
      if (isAuthenticated.value === null) {
        return null;
      }
      else if (!isAuthenticated.value) {
        return (
          <div>
            <p>You need to <router-link to="/login">log in</router-link> first.</p>
          </div>
        );
      }
      else {
        return <FavoriteView search={search} searching={isSearching.value} favoriteRecipes={currentlyDisplayedRecipes} updateQuery={updateQuery} removeFavorite={removeFavorite} />;
      }
    };
  },
});

export default Favorite;
