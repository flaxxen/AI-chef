import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import SearchModel from './model.js';
import Navbar from './components/NavbarPresenter.jsx';

const App = defineComponent({
  render() {
    return (
      <div class="container">
        <div class="leftMargin"></div>
          <div class="middleBox">
            <Navbar />
            <div class="mainContent">
              <header>
                <div class="wrapper">
                </div>
              </header>
              <RouterView model={new SearchModel()} />
            </div>
         </div>
        <div class="rightMargin"></div>
      </div>
    )
  }
})

export default App;
