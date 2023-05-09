import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import '/src/assets/login.css';
import AIchef from '/src/assets/AIchef.png';


const LoginView = defineComponent({
    props: {
        email: {
            type: String,
        },
        password: {
            type: String,
        },
        onLogin: {
            type: Function,
        },
    },



    setup(props) {
        const email = ref("");
        const password = ref("");

        const handleLogin = () => {
            props.onLogin(email.value, password.value);
        };

        return function render() {
            return (
                <div>
                    <img src={AIchef} alt="AI Chef" />
                    <h1 className="h1">Login</h1>
                    <div className="login">
                        <input type="text" value={email.value} onInput={(x) => email.value = x.target.value} placeholder="Enter E-mail" className="input"/>
                        <input type="password" value={password.value} onInput={(x) => password.value = x.target.value} placeholder="Enter Password" className="input"/>
                        <button onClick={handleLogin} className="button">Login</button>
                        <RouterLink to="signup" class="sign">SignUp</RouterLink>

                    </div>
                </div>
            );
        };
    },
});

export default LoginView;
