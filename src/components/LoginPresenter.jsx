import { defineComponent } from "vue"
import LoginView from "../views/LoginView";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



const LoginPresenter = defineComponent({

    props: {

    },

    setup(props) {

        const auth = getAuth();
        const login = (email, password) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // User signed in successfully
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    // An error occurred during login
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }


        return function render() {
            return (
                <LoginView onLogin={login}/>
            );
        };
    },
});

export default LoginPresenter;