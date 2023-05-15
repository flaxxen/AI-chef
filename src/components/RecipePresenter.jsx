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
    const isAuthenticated = ref(false);
    const router = useRouter();  

    onAuthStateChanged(auth, (user) => {
      isAuthenticated.value = !!user
    })

    function addToFavorites() {
      /* If the user hasn't logged in, route to the login page. */
      const auth = getAuth().currentUser;
      if (!auth) {
        router.push('/login');
        return;
      }

      props.model.addCurrentRecipeToFavorites();
    };

      return function render() {
        return (
          <RecipeView isAuthenticated={isAuthenticated} addFavorite={addToFavorites} model={ props.model }/> 
        );
      };
  },
});

export default Recipe