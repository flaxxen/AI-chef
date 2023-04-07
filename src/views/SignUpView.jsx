import {defineComponent, ref} from "vue";
import { RouterLink } from "vue-router";
import "/src/assets/SignUp.css";


const SignUpView = defineComponent( {
    props: {

    },
    setup(props){
        const name = ref("");
        const email = ref("");
        const password = ref("");


        return function render(){
            return (
                <div>

                    <h1 className="h1">Sign up</h1>
                    <div className="signup">
                        <input type="text" value={name.value} placeholder="Enter Name" className="input"/>
                        <input type="text" value={email.value} placeholder="Enter E-mail" className="input"/>
                        <input type="password" value={password.value} placeholder="Enter Password" className="input"/>
                        <button onClick="SignUpView" className="button">Sign Up</button>
                        <p>
                            <RouterLink to="/login" class="login">Login</RouterLink>

                        </p>
                    </div>



                </div>);
        };

    },
});
export default SignUpView;