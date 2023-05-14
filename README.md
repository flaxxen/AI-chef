# AI-chef

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## How to define define components

An example of how to define a component in JSX can be found in HelloWorld.jsx. When creating a new page you can add your component to the index.js file and a temporary routinglink in the App.jsx file to be able to access your page.

Generally we want to follow the advice given here: https://www.npmjs.com/package/@vitejs/plugin-vue-jsx  and i propose we stick to the 4:th definition all the time just to make the code more coherrent.

## About the project
The AI-Chef application is an interactive website with the specific purpose of recommending alternative recipes based on available ingredients provided by
the user through a familiar search bar interface.

Up to this point in the project, we've developed a basic skeleton for the web application's appearance. It includes a main page where users can add various ingredients into the AI-powered recipe generator, 
a favorites page where users can save recipes they enjoy to a list, and a login/signup page where the saved favorites can be stored for more long-term use.

Later on in the project we will integrate the login/signup page to a firebase powered database which will handle the data storage, we will also improve upon the user-interface to make it
more user-friendly and connect the different pages to each-other so that they can share information between each-other. We might also add a few more views and also some settings to the web application.

The project is structured in a way where views,components and assets have their own folders. The views hold the actual code/components of the different page views whilst
the presenters render these. The main jsx file "App.jsx" routes to these presenters when different views need to be shown. The asset folder holds most of the aesthetic modifying
css files. Lastly there is also a dedicated folder to define the different paths for the routing links used.

test