import { defineComponent, ref } from "vue"
import SignUpView from "../views/SignUpView";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";



const SignUpPresenter = defineComponent({

    setup(props) {

        const auth = getAuth();


        const handleSignUp = (name, email, password) => {
            // Handle sign-up logic here

            createUserWithEmailAndPassword(auth,email, password)
                .then((userCredential) => {
                    // User signed up successfully
                    const user = userCredential.user;
                    console.log(user);
                })
                .catch((error) => {
                    // Handle errors here
                    console.error(error);
                });


        };

        return function render() {

            return (

                <SignUpView onSignUp={handleSignUp} />


            );
        };
    },
});

export default SignUpPresenter;