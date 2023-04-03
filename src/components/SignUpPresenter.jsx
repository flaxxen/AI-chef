import { defineComponent } from "vue"
import SignUpView from "../views/SignUpView";

const SignUpPresenter = defineComponent({

    props: {

    },

    setup(props) {
        return function render() {
            return (
                <SignUpView/>
            );
        };
    },
});

export default SignUpView;