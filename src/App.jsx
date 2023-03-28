import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './views/HelloWorldView.jsx'

const App = defineComponent({
    render() {
        return (
            <div>
                <header>
                    <div class="wrapper">
                    <nav>
                        <RouterLink to="/">Home</RouterLink>
                    </nav>
                    </div>
                </header>
                <RouterView />
            </div>
        )
    }
})

export default App