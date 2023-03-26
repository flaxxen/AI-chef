import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.jsx'

const App = defineComponent({
    render() {
        return (
            <div>
                <header>
                    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

                    <div class="wrapper">
                    <HelloWorld msg="You did it!" />

                    <nav>
                        <RouterLink to="/">Home</RouterLink>
                        <RouterLink to="/about">About</RouterLink>
                    </nav>
                    </div>
                </header>
                <RouterView />
            </div>
        )
    }
})

export default App