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
            for (const recipe of this.favoriteRecipes.value) {
                if (recipe.title.includes(this.searchText)) {
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
            //this.search();

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
                <h1>My Favorite Recipes</h1>

                <input type="text" v-model={this.searchText} placeholder="Search my favorite recipe" />
                <button onClick={this.search}>Search</button>

                {/* Search results */}
                {this.searchResults.length > 0 ? (
                    <ul>
                        {this.searchResults.map((recipe) => (
                            <li key={recipe.id}>
                                <div>
                                    <div><h3>Title:</h3> {recipe.title}</div>
                                    <div><h3>Ingredients:</h3> {recipe.ingredients}</div>
                                    <div><h3>Instructions:</h3> {recipe.instructions}</div>
                                    <button onClick={() => this.removeSearchRecipe(recipe.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>No results found.</div>
                )}

                <h3>All my favorites:</h3>
                <ul>
                    {this.reactiveFavorites.map(recipe => (
                        <li key={recipe.id}>
                            <div><h3>Title:</h3> {recipe.title}</div>
                            <div><h3>Ingredients:</h3> {recipe.ingredients}</div>
                            <div><h3>Instructions:</h3> {recipe.instructions}</div>
                            <button onClick={() => this.removeRecipe(recipe.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
                {this.favoriteRecipes.length === 0 && <div>No favorite recipe.</div>}
            </div>
        );
    },
});

export default FavoriteView;