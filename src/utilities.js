// Org id : org-G0wC5VQzaQZJqyB03akF2EMj (personal)
// Api    : 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 (personal)
import { gpt3recipe } from "./gpt3recipe.js";

function generateRecipe(ingredientsList) {
  return gpt3recipe(ingredientsList);
}

export { generateRecipe }