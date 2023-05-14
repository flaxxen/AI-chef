import {defineComponent, ref} from "vue";
import { RouterLink } from "vue-router";
import "/src/assets/SignUp.css";


const SignUpView = defineComponent( {
    props: {
        updateName: {
            type: Function,
        },
        updateEmail: {
            type: Function,
        },
        updatePassword: {
            type: Function,
        },
        onSignUp: {
            type: Function,
        },
        errorMessage: {
            type: String,
            default: "", //default state is empty unless something is captured by it
        },
    },
    setup(props){
        
        function nameChanged(event) {
            props.updateName(event.target.value);
        }
        function emailChanged(event) {
            props.updateEmail(event.target.value);
        }
        function passwordChanged(event) {
            props.updatePassword(event.target.value);
        }
 
        return function render(){
            return (
                <div>

                    <h1 className="h1">Sign up</h1>

                    <div className="signError">

                        {props.errorMessage && <p className="error">{props.errorMessage}</p>}

                    </div>

                    <div className="signup">
                        <input type="text" onChange={nameChanged} onkeypress = {nameChanged} onpaste = {nameChanged} oninput ={nameChanged} placeholder="Enter Name" className="input"/>
                        <input type="text" onChange= {emailChanged} onkeypress = {emailChanged} onpaste = {emailChanged} oninput ={emailChanged} placeholder="Enter E-mail" className="input"/>
                        <input type="password" onChange={passwordChanged} onkeypress = {passwordChanged} onpaste = {passwordChanged} oninput ={passwordChanged} placeholder="Enter Password" className="input"/>
                        <button onClick={props.onSignUp} className="button">Sign Up</button>
                        <p><RouterLink to="/login" class="login">Login</RouterLink></p>
                    </div>
                </div>)


        };

    },
});
export default SignUpView;