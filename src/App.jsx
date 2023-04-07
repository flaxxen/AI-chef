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
                    {/* <Menu menuItems={router.getRoutes()}/> */}
                        <RouterLink to="/Login" style="padding: 0 10px;">Login</RouterLink>
                        <RouterLink to="/Home" style="padding: 0 10px;">Home</RouterLink>
                        <RouterLink to="/Favorite" style="padding: 0 10px;">Favorite</RouterLink>
                    </div>

                </header>
                <RouterView model={ new SearchModel() } />
            </div>
        )
    }
})

export default App