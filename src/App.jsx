import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/MenuPresenter';
import router from './router';
import SearchModel from './model.js'

const App = defineComponent({
    render() {
        return (
            <div class="container">
                <div class="mainContent">
                <header>
                    <div class="wrapper">
                    <Menu menuItems={router.getRoutes()}/>
                    </div>
                </header>
                <RouterView model={ new SearchModel() } />
                </div>
            </div>
        )
    }
})

export default App