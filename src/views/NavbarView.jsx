import { defineComponent, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import '/src/assets/navbar.css';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default defineComponent({
  name: "Navbar",
  setup() {
    const router = useRouter();
    const auth = getAuth();
    const user = ref(null);

    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
    });

    const handleLogout = async () => {
      try {
        await signOut(auth);
        localStorage.removeItem("user");
        router.push("/login");
      } 
      catch (error) {
        console.log(error);
      }
    };

    const renderAuthButtons = () => {
      if (user.value) {
        return (
          <>
            <li class="nav-item">
              <button class="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        );
      } 
      else {
        return (
          <>
            <li class="nav-item">
              <router-link to="/login" class="btn btn-primary">
                Login
              </router-link>
            </li>
          </>
        );
      }
    };

    return () => (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav me-auto">
              {user.value && (
                <>
                  <li class="nav-item">
                    <router-link to="/" class="nav-link">
                      Home
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link to="/favorite" class="nav-link">
                      Favorites
                    </router-link>
                  </li>
                </>
              )}
            </ul>
            <ul class="navbar-nav">
              {renderAuthButtons()}
            </ul>
          </div>
        </div>
      </nav>
    );
  },
});
