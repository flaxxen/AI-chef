import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import "/src/assets/login.css";

const LoginView = defineComponent({
    props: {},
    setup(props) {
        const email = ref("");
        const password = ref("");

        function LoginPresenter() {

        }

        return function render() {
            return (
                <div>
                    <h1 className="h1">Login</h1>
                    <div className="login">
                        <input type="text" value={email.value} onInput={(x) => email.value = x.target.value} placeholder="Enter E-mail" className="input"/>
                        <input type="password" value={password.value} onInput={(x) => password.value = x.target.value} placeholder="Enter Password" className="input"/>
                        <button onClick={LoginPresenter} className="button">Login</button>
                        <RouterLink to="signup" class="sign">SignUp</RouterLink>
                    </div>
                </div>
            );
        };
    },
});

export default LoginView;