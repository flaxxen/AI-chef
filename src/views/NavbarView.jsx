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

    return () => (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              {user.value && (
                <li class="nav-item">
                  <router-link to="/" class="nav-link">
                    Home
                  </router-link>
                </li>
              )}
            </ul>
            <ul class="navbar-nav">
              {user.value ? (
                <li class="nav-item">
                  <button class="btn btn-outline-danger" onClick={logout}>
                    Logout
                  </button>
                </li>
              ) : (
                <li class="nav-item">
                  <router-link to="/login" class="btn btn-primary">
                    Login
                  </router-link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  },
});
