import { defineComponent } from 'vue';
import FavoriteView from '../views/FavoriteView';

const Favorite = defineComponent({
  setup() {
    const favoriteRecipes = [ // just a default setting for now, should get favorite recipes from firebase
        {
          id: 1,
          title: "dish1",
          ingredients: "A, B, C",
          instructions: "instructions for dish1"
        },
        {
          id: 2,
          title: "dish2",
          ingredients: "D, E, F",
          instructions: "instructions for dish2"
        },
        {
          id: 3,
          title: "dish3",
          ingredients: "G, H, I",
          instructions: "instructions for dish3"
        }
      ];
    // return () => <FavoriteView favoriteRecipes={favoriteRecipes} />;
    return function render() {
      return <FavoriteView favoriteRecipes={favoriteRecipes} />;
    };
  },
});

export default Favorite;
