import { defineComponent, ref } from "vue"; 
import { useRoute, useRouter } from "vue-router";
import '/src/assets/navbar.css'; 
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default defineComponent({
  name: "Navbar",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const auth = getAuth();
    const user = ref(null);

    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
    });

    const logout = () => {
      signOut(auth)
        .then(() => {
          localStorage.removeItem("user");
          router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return () => {
      if (user.value) {
        return (
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
              <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto"></ul>
                <ul class="navbar-nav">
                  <li class="nav-item">
                    <button class="btn btn-outline-danger" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        );
      } else {
        return null; // Navbar only rendered if user is logged in.
      }
    };
  },
});
