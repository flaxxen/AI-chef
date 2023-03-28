import { defineComponent } from "vue"

const HelloWorldView = defineComponent({
  props: {
    msg: {
      type: String,
    },
  },
  
  setup(props) {
    return function renderACB() {
      return (
        <div>
          This is JSX! And this is a prop: {props.msg}
        </div>
      );
    };
  },
});

export default HelloWorldView