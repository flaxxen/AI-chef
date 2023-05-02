import {defineComponent, ref} from "vue";
import { RouterLink } from "vue-router";
import "/src/assets/SignUp.css";


const SignUpView = defineComponent( {
    props: {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        onSignUp: {
            type: Function,
        },
    },
    setup(props){
        const name = ref("");
        const email = ref("");
        const password = ref("");

        const handleSignUp = () => {
            props.onSignUp(name.value, email.value, password.value);
        };

        return function render(){
            return (
                <div>

                    <h1 className="h1">Sign up</h1>
                    <div className="signup">
                        <input type="text" v-model={name.value} placeholder="Enter Name" className="input"/>
                        <input type="text" v-model={email.value} placeholder="Enter E-mail" className="input"/>
                        <input type="password" v-model={password.value} placeholder="Enter Password" className="input"/>
                        <button onClick={handleSignUp} className="button">Sign Up</button>
                        <p>
                            <RouterLink to="/login" class="login">Login</RouterLink>

                        </p>
                    </div>
                </div>)


        };

    },
});
export default SignUpView;