import { defineComponent, ref } from "vue";
import { RouterLink } from "vue-router";
import "/src/assets/login.css";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";


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
        errorMessage: {
            type: String,
            default: "", //default state is empty unless something is captured by it
        },
    },



    setup(props) {

        const auth = getAuth();

        const email = ref("");
        const password = ref("");
        const user = ref(null);


        //whenever auth state changes this function will be called and update the user prop
        onAuthStateChanged(auth, (firebaseUser) => {
            user.value = firebaseUser;
        });

        const handleLogin = () => {
            props.onLogin(email.value, password.value);
        };

        const handleLogout = () => {
            signOut(auth)
                .then(() => {

                })
                .catch((error) => {
                    console.log(error);
                });
        };


return function render() {
    return (
        <div>



            {/*if user.value is not null the first segment will be run, if not the next */}
            {user.value ? (
                <div>
                    <p>You are logged in as {user.value.email}.</p>
                    <button onClick={handleLogout} className="button">Log Out</button>
                </div>
            ) : (



                <div>

                    <h1 className="h1">Login</h1>

                    <div className={"loginError"}>{props.errorMessage && <p className="error">{props.errorMessage}</p>}</div>

                <div className="login">
                <input type="text" value={email.value} onInput={(x) => email.value = x.target.value} placeholder="Enter E-mail" className="input"/>
                <input type="password" value={password.value} onInput={(x) => password.value = x.target.value} placeholder="Enter Password" className="input"/>
                <button onClick={handleLogin} className="button">Login</button>
                <RouterLink to="signup" class="sign">SignUp</RouterLink>

                </div>


                </div>

            )}
        </div>
    );
};

},
});

export default LoginView;