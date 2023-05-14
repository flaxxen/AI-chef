import { defineComponent, ref } from "vue"
import SignUpView from "../views/SignUpView";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
import { getDatabase, ref as dbRef, set } from "firebase/database";



const SignUpPresenter = defineComponent({

    setup(props) {

        const auth = getAuth();
        const database = getDatabase();
        const errorMessage = ref("");

        const name = ref("");
        const email = ref("");
        const password = ref("");

        function updateName(newName){
            name.value = newName;
        }
        function updateEmail(newEmail){
            email.value = newEmail;
        }
        function updatePassword(newPassword){
            password.value = newPassword;
        }

        function handleSignUp () {
            console.log("hello");
            createUserWithEmailAndPassword(auth,email.value, password.value)
                .then((userCredential) => {
                    // User signed up successfully
                    const user = userCredential.user;
                    console.log(user);

                    // Store user data in realtime database
                    const uid = user.uid;
                    const userRef = dbRef(database, `users/${uid}`);
                    set(userRef, {
                        name: name.value,
                        email: email.value
                    });


                    sendEmailVerification(user)
                        .then(() => {

                        })
                        .catch((error) => {

                        });

                    auth.signOut();
                    errorMessage.value = "A verification link has been sent to your email";

                    name.value = '';
                    email.value = '';
                    password.value = '';


                })
                .catch((error) => {

                    if (error.code === "auth/weak-password") {
                        errorMessage.value = "Password should be at least 6 characters";
                    }

                    else if (error.code === "auth/invalid-email") {
                        errorMessage.value = "Error, Invalid email";
                    }

                    else if (error.code === "auth/email-already-in-use") {
                        errorMessage.value = "Error, Email already in use";
                    }


                    console.error(error);
                });


        };

        return function render() {

            return (

                <SignUpView updatePassword={updatePassword} updateEmail={updateEmail} updateName={updateName} onSignUp={handleSignUp} errorMessage={errorMessage.value} />


            );
        };
    },
});

export default SignUpPresenter;