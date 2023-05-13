import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import NavbarView from "../views/NavbarView.jsx";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = defineComponent({  
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const user = ref(null);

    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
    });

    function logout () {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("user");
          router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return function render() {
      return (
        <NavbarView user = { user.value } logoutFunction={logout}/>
      );
    };
  },
});

export default Navbar;