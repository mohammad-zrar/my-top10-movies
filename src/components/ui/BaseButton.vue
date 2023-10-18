<template>
  <button class="btn" :class="btnStyle">
    <slot>Button</slot>
  </button>
</template>
<script>
import { computed } from "vue";
export default {
  props: {
    btnStyle: {
      type: String,
      required: false,
      default: "blue",
      validator(value) {
        // The value must match one of these strings
        return ["blue", "red", "gray", "flat"].includes(value);
      },
    },
  },
  setup(props) {
    const btnStyle = props.btnStyle;

    return { btnStyle };
  },
};
</script>

<style scoped>
.btn {
  border: none;
  padding: 0.6rem 1rem;
  letter-spacing: 1px;
  font-size: 0.9rem;
  font-weight: 600;
  color: #252a34;
  border-radius: 5px;
  cursor: pointer;
}
.blue {
  background-color: #08d9d6;
}
.blue:hover,
.blue:active {
  background-color: #06c8c5;
}
.flat {
  background-color: inherit;
}
.flat:hover,
.flat:active {
  background-color: #d9d9d9;
}
</style>
