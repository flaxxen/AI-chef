import { defineComponent } from "vue"
import LoginView from "../views/LoginView";

const LoginPresenter = defineComponent({

    props: {

    },

    setup(props) {
        return function render() {
            return (
                <LoginView/>
            );
        };
    },
});

export default LoginPresenter;