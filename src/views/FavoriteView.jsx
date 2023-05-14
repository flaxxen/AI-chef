import { defineComponent, reactive } from 'vue';
import { getDatabase, ref, remove } from 'firebase/database';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const FavoriteView = defineComponent({
    props: {
        favoriteRecipes: {
            type: Array,
            required: true
        }
    },

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

                {/* Search results */}
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
                                    {console.log(typeof recipe.instructions)} */}
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