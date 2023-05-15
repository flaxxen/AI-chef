import { defineComponent, reactive, onMounted, computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import SearchModel from './model.js';
import Navbar from './components/NavbarPresenter.jsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getAllUserRecipesFromFirebase, updateFirebaseFromModel, updateModelFromFirebase } from './firebaseModel.js';

const App = defineComponent({
  setup() {

  
    const auth = getAuth();
    const topModel = reactive(new SearchModel([]));
    const favoriteRecipes = computed(() => topModel.favoriteRecipes);
    updateFirebaseFromModel(topModel);

    onMounted(async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const values = await getAllUserRecipesFromFirebase();
            topModel.setAllFavorites(values);
          } catch (err) {
            topModel.setAllFavorites([]);
          }
        }
      });
    });

    return function render() {
      return (
        <div class="container">
          <div class="leftMargin"></div>
            <div class="middleBox">
              <Navbar />
              <div class="mainContent">              
                <RouterView model={topModel} />
              </div>
          </div>
          <div class="rightMargin"></div>
        </div>
      )
    }
  }
})

export default App;
