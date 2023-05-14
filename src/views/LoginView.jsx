import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import "/src/assets/login.css";


const LoginView = defineComponent({
  props: {
    onLogin: {
      type: Function,
    },
    onLogout: {
      type: Function,
    },
    errorMessage: {
      type: String,
      default: "", //default state is empty unless something is captured by it
    },
    updateEmail: {
      type: Function
    },
    updatePassword: {
      type: Function
    },
    user: {
      type: Object
    },
  },



  setup(props) {
    function emailChanged(event) {
      props.updateEmail(event.target.value);
    }
    function passwordChanged(event) {
      props.updatePassword(event.target.value);
    }
    return function render() {
      return (
        <div>
          {/*if user.value is not null the first segment will be run, if not the next */}
          {props.user.value ? (
            <div>
              <p>You are logged in as {props.user.value.email}.</p>
              <button onClick={props.onLogout} className="button">Log Out</button>
            </div>
          ) : (
            <div>
              <h1 className="h1">Login</h1>
              <div className={"loginError"}>{props.errorMessage && <p className="error">{props.errorMessage}</p>}</div>
              <div className="login">
              <input type="text" onChange= {emailChanged} onkeypress = {emailChanged} onpaste = {emailChanged} oninput ={emailChanged} placeholder="Enter E-mail" className="input"/>
              <input type="password" onChange={passwordChanged} onkeypress = {passwordChanged} onpaste = {passwordChanged} oninput ={passwordChanged} placeholder="Enter Password" className="input"/>
              <button onClick={props.onLogin} className="button">Login</button>
              <RouterLink to="signup" class="sign">Sign Up</RouterLink>
              </div>
            </div>
          )}
        </div>
      );
    };
  },
});

export default LoginView;