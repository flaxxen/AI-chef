import {defineComponent} from "vue";
import { RouterLink } from "vue-router";
const LoginView = defineComponent( {
    props: {

    },
    setup(props){

        return function render(){
            return (
                <div>
                    <h1 className="h1">Here you can login</h1>

                    <div className="login">
                        <input type="text" v-model="email" placeholder="Enter E-mail" className="input"/>
                        <input type="password" v-model="password" placeholder="Enter Password" className="input"/>
                        <button v-on:click="LoginPresenter" className="button">LoginPresenter</button>

                        <RouterLink to="signup" class="sign">Sign up</RouterLink>
                    </div>

                </div>);
        };

    },
});
export default LoginView;