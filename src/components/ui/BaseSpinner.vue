<template>
  <div class="back-bone"></div>
  <div class="spinner">
    <div class="spin-1"></div>
    <div class="spin-2"></div>
  </div>
</template>

<style scoped>
.back-bone {
  z-index: 11;
  background-color: transparent;
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.spinner {
  display: block;
  position: absolute;
  top: 40%;
  left: 45%;
  z-index: 12;
}
.spin-1,
.spin-2 {
  width: 2.5rem;
  height: 2.5rem;
  background-color: transparent;
  position: absolute;
}
.spin-1 {
  border: 6px solid #08d9d6;
  border-radius: 50%;
  border-top-color: transparent;
  border-right-color: transparent;
  animation: spin 1s linear infinite;
}
.spin-2 {
  border: 6px solid #08d9d6;
  border-radius: 50%;
  border-right-color: transparent;
  border-top-color: transparent;
  animation: spin 1s ease infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
