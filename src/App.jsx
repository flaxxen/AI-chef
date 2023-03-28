import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import Menu from './components/MenuPresenter';
import router from './router';

const App = defineComponent({
    render() {
        return (
            <div>
                <header>
                    <div class="wrapper">
                    <Menu menuItems={router.getRoutes()}/>
                    </div>
                </header>
                <RouterView />
            </div>
        )
    }
})

export default App