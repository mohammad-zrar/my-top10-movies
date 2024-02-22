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
      default: "primery",
      validator(value) {
        // The value must match one of these strings
        return ["primery", "warning", "danger", "light"].includes(value);
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
/* Primery */
.primery {
  background-color: #08d9d6;
  color: #252a34;
}
.primery:hover,
.primery:active {
  background-color: #07c8c5;
}
/* light */
.light {
  background-color: #eaeaea;
  color: #252a34;
}
.light:hover,
.light:active {
  background-color: #d9d9d9;
}
/* danger */
.danger {
  background-color: #ff2e63;
  color: #eaeaea;
}
.danger:hover,
.danger:active {
  background-color: #ee1d52;
}
</style>
