import { defineComponent, ref } from "vue"
import RecipeView from '../views/RecipeView.jsx'

import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDatabase, update, ref as dbRef, push, set } from "firebase/database";
import { useRouter } from 'vue-router'
const Recipe = defineComponent({
  
  props: {
    model: {
      type: Object,
    }, 
  },

  setup( props ) {
    const isAuthenticated = ref(false)
    const auth = getAuth()
    const router = useRouter()
    const database = getDatabase()
    const user = auth.currentUser;

    onAuthStateChanged(auth, (user) => {
      isAuthenticated.value = !!user
    })

    function addToFavorites() {
      /* If the user hasn't logged in, route to the login page. */
      if (!isAuthenticated.value) {
        router.push('/login');
        return;
      }

      
      const recipeRef = push(dbRef(database, `allfavorites`));
      const recipeId = recipeRef.key;
      set(recipeRef, {
        title: props.model.recipe.title,
        ingredients: props.model.recipe.ingredients,
        instructions: props.model.recipe.instructions
      });

      const favoritesRef = dbRef(database, `users/${user.uid}/favorites`);
      const updates = {};
      updates[recipeId] = true;
      update(favoritesRef, updates);

    };

      return function render() {
        return (
          <RecipeView isAuthenticated={isAuthenticated} addFavorite={addToFavorites} model={ props.model }/> 
        );
      };
  },
});

export default Recipe