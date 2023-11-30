<template>
  <teleport to="body">
    <div class="backdrop" v-show="show" @click="emits('close')"></div>
    <Transition>
      <dialog open v-show="show">
        <header>
          <slot name="header"> <h2>Title</h2></slot>
        </header>
        <hr />
        <section>
          <slot name="body"></slot>
        </section>
        <hr />
        <menu>
          <slot name="actions">
            <base-button color="red" @click="emits('close')">Close</base-button>
          </slot>
        </menu>
      </dialog>
    </Transition>
  </teleport>
</template>

<script setup>
import BaseButton from "./BaseButton.vue";
import { ref } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["close"]);
</script>

<style scoped>
.backdrop {
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.25);

  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
}
dialog {
  position: absolute;
  top: 32%;
  margin: 0 auto;
  padding: 1rem 1rem 0.5rem;
  width: 45%;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  z-index: 16;
}
dialog section {
  padding: 1rem 0.5rem;
}
dialog menu {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0.6rem 0.3rem 0 0;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from {
  opacity: 0;
  transform: translateY(-64px);
}
.v-leave-to {
  opacity: 0;
  transform: translateY(64px);
}
</style>
