import firebaseConfig from "./firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, off, remove, get, push, update } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp(firebaseConfig);  
const db = getDatabase();

//  REF is the “root” Firebase path. NN is your TW2_TW3 group number
const REF="/allfavorites";

function CB(payload) {
	console.log(payload);
}

function observerRecap(model) {
    model.addObserver(CB);
}

function getAllUserRecipesFromFirebase(model) {
    function createModelACB(snapshot) {  
      const favorites = [];
      const promises = [];

      snapshot.forEach((recipe) => {
        const recipeId = recipe.key;
        const recipeDataPromise = get(ref(db, `allfavorites/${recipeId}`)).then((recipeSnapshot) => {
          const recipeData = recipeSnapshot.val();
          if (recipeData) {
            return {
              id: recipeId,
              title: recipeData.title,
              ingredients: recipeData.ingredients,
              instructions: recipeData.instructions
            };
          }
        });
        promises.push(recipeDataPromise);
      });

      const results = Promise.all(promises);
      return results;
    }

  const user = getAuth().currentUser;
  if (!user)
    throw new Error("No authenticated user"); 
  return get(ref(db, `users/${user.uid}/favorites`)).then(createModelACB);
}

function updateFirebaseFromModel(model) {
  console.log("adding CB to update fb");
	function relevantChangeACB(payload){

    console.log("Callback relevant change!");
    const user = getAuth().currentUser;
		if (payload && payload.addFavorite) {
      const recipeRef = push(ref(db, `allfavorites`));
      const recipeId = recipeRef.key;
      payload.setIdCB(recipeId);
      set(recipeRef, payload.addFavorite);
      const favoritesRef = ref(db, `users/${user.uid}/favorites`);
      const updates = {};
      updates[recipeId] = true;
      update(favoritesRef, updates);
		}
	}

  model.addObserver(relevantChangeACB);
}

function updateModelFromFirebase(model) {
  const auth = getAuth().currentUser;
  const currentUser = auth.currentUser; 
  if (!currentUser)
    return;
  
	ref(db, `users/${user.uid}/favorites`).on("child_added",
		function recipeAddedInFirebaseACB(firebaseData){ 
			function hasDifferentIdCB(recipe){
        return !(recipe.id === +firebaseData.key) && recipe.user == currentUser;
			}
		
			if (model.favoriteRecipes && !model.favoriteRecipes.every(hasDifferentIdCB)) 
				return;
             
		  model.addFavorite(+firebaseData.value);
		}
	);

	ref(db, REF).on("child_removed",
		function recipeRemovedInFirebaseACB(firebaseData){ 
			model.removeFromFavorites(+firebaseData.key);
		}
	);

  return;
}

export {observerRecap, getAllUserRecipesFromFirebase, updateFirebaseFromModel, updateModelFromFirebase};