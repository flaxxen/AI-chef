import {defineComponent} from "vue";
import { RouterLink } from "vue-router";
const SignUpView = defineComponent( {
    props: {

    },
    setup(props){

        return function render(){
            return (
                <div>

                    <h1 className="h1">Sign up</h1>
                    <div className="signup">
                        <input type="text" v-model="name" placeholder="Enter Name" className="input"/>
                        <input type="text" v-model="email" placeholder="Enter E-mail" className="input"/>
                        <input type="password" v-model="password" placeholder="Enter Password" className="input"/>
                        <button v-on:click="SignUpView" className="button">Sign Up</button>
                        <p>
                            <RouterLink to="/login" class="login">Login</RouterLink>

                        </p>
                    </div>



                </div>);
        };

    },
});
export default SignUpView;