import { defineComponent, ref } from "vue"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDatabase, update, ref as dbRef, push, set } from "firebase/database";
import { useRouter } from 'vue-router'
import '/src/assets/recipe.css'; // import the css file

const RecipeView = defineComponent({
  props: {
    model: {
      type: Object,
    }
  },

  setup(props) {
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

      event.target.disabled = true;

      console.log(user.uid)

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

      event.target.innerText = 'Already added!';
    }

    function renderIngredients() {
      return props.model.recipe.ingredients.map((ingredient) => <div>{ingredient}</div>);
    }
    function renderInstructions() {
      return props.model.recipe.instructions.map((instruction) => <div>{instruction}</div>);
    }

    return function render() {
      return (
        (props.model.searching ?
          <div class="loadDiv"><span class="loader"></span></div>
          : (props.model.recipe ?
            (<div>
              <ul>
                <li>
                  <div><h2 className="h2">{props.model.recipe.title}</h2></div>
                  <button v-if="isAuthenticated" className="button" onClick={addToFavorites}>Add to my favorites</button>
                  <div><h3>Ingredients</h3></div>
                  <div>{renderIngredients()}</div>
                  <div><h3>Instructions</h3></div>
                  <div>{renderInstructions()}</div>
                </li>
              </ul>
            </div>)
            : <div></div>)
        )
      );
    };
  },
});

export default RecipeView