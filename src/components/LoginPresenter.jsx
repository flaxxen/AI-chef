import { defineComponent } from "vue"
import LoginView from "../views/LoginView";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {ref } from "vue";



const LoginPresenter = defineComponent({

    props: {

    },

    setup(props) {

        const auth = getAuth();
        const errorMessage = ref("");

        const login = (email, password) => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    const user = userCredential.user;

                    if(!user.emailVerified) {
                        errorMessage.value = "Please verify your email before you sign in"
                        auth.signOut();
                    }

                    console.log(user);
                })
                .catch((error) => {

                    if (error.code === "auth/invalid-email") {
                        errorMessage.value = "Error, Invalid email";
                    }
                    else if (error.code === "auth/invalid-password") {
                        errorMessage.value = "Error, Wrong password";
                    }

                });
        }


        return function render() {
            return (
                <LoginView onLogin={login} errorMessage={errorMessage.value}/>
            );
        };
    },
});

export default LoginPresenter;