import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/MenuPresenter';
import router from './router';
import SearchModel from './model.js'

const App = defineComponent({
    render() {
        return (
            <div>
                <header>
                    <div class="wrapper">
                    <Menu menuItems={router.getRoutes()}/>
                        <RouterLink to="/Login">Login</RouterLink>
                    </div>

                </header>
                <RouterView model={ new SearchModel() } />
            </div>
        )
    }
})

export default App