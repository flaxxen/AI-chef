import { defineComponent, reactive } from 'vue';
import { getDatabase, ref, remove } from 'firebase/database';
import { getAuth, onAuthStateChanged } from "firebase/auth";
/*
const FavoriteView = defineComponent({
  props: {
    favoriteRecipes: {
      type: Array,
      required: true
    }
   ,

    data() {
        return {
            searchText: '',
            searchResults: [],
            reactiveFavorites: []
        }
    },

    created() {
        this.reactiveFavorites = reactive(this.favoriteRecipes);
    },

    methods: {
        search() {
            this.searchResults = [];

            const searchRegex = new RegExp(this.searchText, 'i');

            for (const recipe of this.favoriteRecipes.value) {
                if (searchRegex.test(recipe.title)) {
                    this.searchResults.push(recipe);
                }
            }
        },

        removeSearchRecipe(recipeId) {

            const index = this.favoriteRecipes.value.findIndex(recipe => recipe.id === recipeId);
            console.log(`Removing recipe with ID ${recipeId}`);
            console.log(this.favoriteRecipes);
            this.reactiveFavorites.splice(index, 1);
            console.log(`Removed recipe with ID ${recipeId}`);
            console.log(this.favoriteRecipes);

            const auth = getAuth();
            const db = getDatabase();
            const recipeRef = ref(db, `users/${auth.currentUser.uid}/favorites/${recipeId}`);
            remove(recipeRef).then(() => {
                console.log(`Removed recipe with ID ${recipeId} from Firebase Realtime Database`);
            }).catch((error) => {
                console.error(`Error removing recipe with ID ${recipeId} from Firebase Realtime Database: ${error}`);
            });

            this.search();
        },

        removeRecipe(recipeId) {
            const index = this.favoriteRecipes.value.findIndex(recipe => recipe.id === recipeId);
            console.log(`Removing recipe with ID ${recipeId}`);
            console.log(this.favoriteRecipes);
            this.reactiveFavorites.splice(index, 1);
            console.log(`Removed recipe with ID ${recipeId}`);
            console.log(this.favoriteRecipes);

            const auth = getAuth();
            const db = getDatabase();
            const recipeRef = ref(db, `users/${auth.currentUser.uid}/favorites/${recipeId}`);
            remove(recipeRef).then(() => {
                console.log(`Removed recipe with ID ${recipeId} from Firebase Realtime Database`);
            }).catch((error) => {
                console.error(`Error removing recipe with ID ${recipeId} from Firebase Realtime Database: ${error}`);
            });
        }
    },

    render() {
        return (
            <div>
                <h1 className="h1">My Favorite Recipes</h1>

                <input type="text" className="input" v-model={this.searchText} placeholder="Search my favorite recipe" />
                <button onClick={this.search} className="button">Search</button>

                {/* Search results *//*}
                {this.searchResults.length > 0 ? (
                    <div className="scroll-container">
                        <ul>
                            {this.searchResults.map((recipe) => (
                                <li key={recipe.id} class="favoriteList">
                                    <div>
                                        <div><h2 className="h2">{recipe.title}</h2></div>
                                        <button className="button" onClick={() => this.removeSearchRecipe(recipe.id)}>Delete</button>
                                        <div>
                                            <h3>Ingredients:</h3>
                                            {Object.values(recipe.ingredients).map((ingredient, index) => (
                                                <div key={index}>{ingredient}</div>
                                            ))}
                                        </div>
                                        <div>
                                            <h3>Instructions:</h3>
                                            {Object.values(recipe.instructions).map((instruction, index) => (
                                                <div key={index}>{instruction}</div>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <div>No results found.</div>
                )}

                <h3 className="hh">All my favorites:</h3>
                {this.reactiveFavorites.length > 0 ? (
                    <ul>
                        {this.reactiveFavorites.map(recipe => (
                            <li key={recipe.id} class="favoriteList">
                                <div>
                                    <div><h2 className="h2">{recipe.title}</h2></div>
                                    <button className="button" onClick={() => this.removeRecipe(recipe.id)}>Delete</button>
                                    <div>
                                        <h3>Ingredients:</h3>
                                        {Object.values(recipe.ingredients).map((ingredient, index) => (
                                            <div key={index}>{ingredient}</div>
                                        ))}
                                    </div>
                                    <div>
                                        <h3>Instructions:</h3>
                                        {Object.values(recipe.instructions).map((instruction, index) => (
                                            <div key={index}>{instruction}</div>
                                        ))}
                                    </div>
                                    {/* {console.log(typeof recipe.ingredients)}
                                    {console.log(typeof recipe.instructions)} *//*}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (<div>No favorite recipe.</div>)}
            </div>
        );
    },
});

export default FavoriteView;

*/

const FavoriteView = defineComponent({
props: {
  favoriteRecipes: {
    type: Array,
    default: []
  },
  removeFavorite: {
      type: Function
  },
  search: {
      type: Function
  },
  searching: {
    type: Boolean,
    default: false
  },
  updateQuery: {
    type: Function
  }
},

  setup( props ) {
    function queryChanged(event) {
        updateQuery(event.target.value);
    }
    
    function renderInstructions() {
      return (
        Object.values(recipe.instructions).map((instruction, index) => (
            <div key={index}>{instruction}</div>
        ))
      )
    }

    function renderIngredients(ingredients) {
      return (
        Object.values(ingredients).map((ingredient, index) => (
          <div key={index}>{ingredient}</div>
        ))
      )
    }

    function renderRecipes(){
      return props.favoriteRecipes.map((recipe) => 
        <li key={recipe.id} class="favoriteList">
          <div>
            <div><h2 className="h2">{recipe.title}</h2></div>
            <button className="button" onClick={props.removeFavorite(recipe.id)}>Delete</button>
            <div>
              <h3>Ingredients:</h3>
              {renderIngredients(recipe.ingredients)}  
            </div>
            <div>
              <h3>Instructions:</h3>
              {renderInstructions(recipe.instructions)}
            </div>
          </div>  
        </li>
      )
    }


    return (
        <div>
          <h1 className="h1">My Favorite Recipes</h1>
          <input type="text" className="input" onChange={queryChanged} onkeypress = {queryChanged} onpaste = {queryChanged} oninput ={queryChanged} placeholder="Search my favorite recipe" />
          <button onClick={props.search} className="button">Search</button>
          {props.favoriteRecipes.length > 0 ? 
            <div className="scroll-container">
              <ul>
                {renderRecipes()}
              </ul>
            </div>
          : props.searching ? 
            <div>No results found.</div>
          : <div>No favorite recipe.</div>
          }
        </div>
    )
  }
})

export default FavoriteView;