import { defineComponent, ref } from 'vue';
import FavoriteView from '../views/FavoriteView';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";

const Favorite = defineComponent({
  setup() {
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
        onValue(favoriteRef, (snapshot) => {
          const favorites = [];
          snapshot.forEach((recipe) => {
            favorites.push({
              id: recipe.key,
              title: recipe.val().title,
              ingredients: recipe.val().ingredients,
              instructions: recipe.val().instructions
            });
          });
          favoriteRecipes.value = favorites;
        });
      } else {
        favoriteRecipes.value = [];
      }
    });


    return function render() {
      if (isAuthenticated.value === null){
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
        return <FavoriteView favoriteRecipes={favoriteRecipes} />;
      }
    };
  },
});

export default Favorite;
