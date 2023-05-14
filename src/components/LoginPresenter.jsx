import { defineComponent , ref } from "vue"
import LoginView from "../views/LoginView";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";


const LoginPresenter = defineComponent({

  setup() {

    const auth = getAuth();
    const email = ref("");
    const password = ref("");
    const user = ref(null);
    const errorMessage = ref("");

    //whenever auth state changes this function will be called and update the user prop
    onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser;
    });

    function handleLogout() {
      signOut(auth)
        .then(() => {
        })
        .catch((error) => {
          console.log(error);
        });
    };
    function updateEmail(newEmail){
      email.value = newEmail;
    }
    function updatePassword(newPassword){
      password.value = newPassword;
    }
    function login () {
      signInWithEmailAndPassword(auth, email.value, password.value)
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
        <LoginView onLogin={login} onLogout={handleLogout} updateEmail={updateEmail} updatePassword={updatePassword} user={user} errorMessage={errorMessage.value}/>
      );
    };
  },
});

export default LoginPresenter;