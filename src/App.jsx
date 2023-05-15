import { defineComponent, reactive } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import SearchModel from './model.js';
import Navbar from './components/NavbarPresenter.jsx';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getAllUserRecipesFromFirebase, updateFirebaseFromModel, updateModelFromFirebase } from './firebaseModel.js';

const App = defineComponent({
  setup() {

  
    const auth = getAuth();
    const topModel = reactive(new SearchModel([]));
    updateFirebaseFromModel(topModel);
    onAuthStateChanged(auth, async (user) => {
      try {
        const values = await getAllUserRecipesFromFirebase();
        topModel.setAllFavorites(values);
      } catch (err) {
        topModel.setAllFavorites([]);
      }
    });

    return function render() {
      return (
        <div class="container">
          <div class="leftMargin"></div>
            <div class="middleBox">
              <Navbar />
              <div class="mainContent">
                <header>
                  <div class="wrapper">
                    <h1>Welcome to the AI Chef!</h1>
                    <p>Customize your meal by choosing your favorite ingredients.</p>
                    {}
                  </div>
                </header>
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
