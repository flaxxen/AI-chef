import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import SearchModel from './model.js';
import Navbar from './components/NavbarPresenter.jsx';

const App = defineComponent({
  render() {
    return (
      <div class="container">
        <Navbar />
        <div class="mainContent">
          <header>
            <div class="wrapper">
              <h1>Welcome to the AI Chef!</h1>
              <p>Customize your meal by choosing your favorite ingredients.</p>
              {}
              <RouterLink to="/Login" style="padding: 0 10px;">Login</RouterLink>
              <RouterLink to="/Home" style="padding: 0 10px;">Home</RouterLink>
              <RouterLink to="/Favorite" style="padding: 0 10px;">Favorite</RouterLink>
            </div>
          </header>
          <RouterView model={new SearchModel()} />
        </div>
      </div>
    )
  }
})

export default App;
