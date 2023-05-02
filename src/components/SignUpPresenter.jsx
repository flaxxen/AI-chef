import { defineComponent, ref } from "vue"
import SignUpView from "../views/SignUpView";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref as dbRef, set } from "firebase/database";



const SignUpPresenter = defineComponent({

    setup(props) {

        const auth = getAuth();
        const database = getDatabase();

        const handleSignUp = (name, email, password) => {
            // Handle sign-up logic here

            createUserWithEmailAndPassword(auth,email, password)
                .then((userCredential) => {
                    // User signed up successfully
                    const user = userCredential.user;
                    console.log(user);

                    // Store user data in realtime database
                    const uid = user.uid;
                    const userRef = dbRef(database, `users/${uid}`);
                    set(userRef, {
                        name,
                        email
                    });
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