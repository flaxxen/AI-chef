import { defineComponent, ref, computed, onMounted } from 'vue';
import FavoriteView from '../views/FavoriteView';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Favorite = defineComponent({
  props: {
    model: {
      type: Object
    },
  },

  setup(props) {
    const auth = getAuth();
    const isAuthenticated = ref(false);
    const isSearching = ref(true);
    const favorites = computed(() => props.model.favoriteRecipes);
    const query = ref("");
    
    onAuthStateChanged(auth, (userAuth) => {
      isAuthenticated.value = !!userAuth
    }); 

    function getSearchResults() {
      if (query.value == "")
        return favorites.value;
       
      const searchRegex = new RegExp(query.value, 'i');
      return props.model.favoriteRecipes.filter((recipe) => searchRegex.test(recipe.title));
    }

    function search() {
      if (query.value == "") 
        isSearching.value = false;
      else 
        isSearching.value = true;
    }

    function removeFavorite(id) {
      props.model.removeFromFavorites(id);
    }

    function updateQuery(newQuery) {
      query.value = newQuery;
      if (query === "")
        isSearching.value = false;
    }

    return function render() {
      const displayRecipes = isSearching.value ? getSearchResults() : favorites.value;
      if (isAuthenticated.value)
        return <FavoriteView search={search} 
                              searching={isSearching.value} 
                              favoriteRecipes={displayRecipes} 
                              updateQuery={updateQuery} 
                              removeFavorite={removeFavorite} />
      else
        return (
          <div>
            <p>You need to <router-link to="/login">log in</router-link> first.</p>
          </div>
        )
    }
  },
});

export default Favorite;
