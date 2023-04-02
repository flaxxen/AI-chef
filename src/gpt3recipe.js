import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: import.meta.env.VITE_OPENAI_ORG,
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});


function gpt3recipe(ingredientsList) {
  
  if ( !configuration.apiKey ) {
    console.log("NO API KEY");
    return;
  }

  return fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + configuration.apiKey
    },
    body: JSON.stringify({
        'model': 'text-ada-001',
        'prompt': generatePrompt(ingredientsList),
        'max_tokens': 1000,
        'temperature': 0
    })
  }).then(treatHTTPResponseACB).then(getResultsArrayACB);
}

function getResultsArrayACB(responseJson) {
	return responseJson.choices[0].text;
}

function treatHTTPResponseACB(response){ 
	/*TODO throw when the HTTP response is not 200, otherwise return response.json()*/
	if ( !response.ok ) throw new Error("API problem " + response.status);
	//console.log(resonse.json());
	return response.json(); 
}

function generatePrompt(ingredientsList) {
  console.log(ingredientsList);
  const ingredients = ingredientsList.join();
  return "create a recipe using " + ingredients + ". Start with a title and then step by step instructions. Sure! Here is the recipe for ";
}

export { gpt3recipe }