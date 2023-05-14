import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import NavbarView from "../views/NavbarView.jsx";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const NavbarPresenter = defineComponent({  
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const user = ref(null);
    const navbarOpen =ref(null);
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
    });

    function toggleMenu() {
      navbarOpen.value = navbarOpen.value ? false : true;
      console.log(navbarOpen.value);
    }
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
        <NavbarView user = { user.value } open={navbarOpen.value} toggleMenu = {toggleMenu} logoutFunction={logout}/>
      );
    };
  },
});

export default NavbarPresenter;