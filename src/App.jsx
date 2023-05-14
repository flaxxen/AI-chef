import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import SearchModel from './model.js';
import Navbar from './components/NavbarPresenter.jsx';

const App = defineComponent({
  render() {
    return (
      <div>
        <Navbar />
        <div class="container">
            <div class="mainContent">
            <header>
                <div class="wrapper">
                <h1>Welcome to the AI Chef!</h1>
                <p>Customize your meal by choosing your favorite ingredients.</p>
                {}
                </div>
            </header>
            <RouterView model={new SearchModel()} />
            </div>
        </div>
      </div>
    )
  }
})

export default App;
