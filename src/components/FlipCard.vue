<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <h1 class="rating">1</h1>
        <img
          src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/jHxCeXnSchAuwHnmVatTgqMYdX8.jpg"
          alt="Poster"
          style="width: 300px; height: 450px"
        />
      </div>
      <div class="flip-card-back">
        <h1>John Doe</h1>
        <p>Architect & Engineer</p>
        <p>We love that guy</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
</script>
<style scoped>
.flip-card {
  background-color: transparent;

  width: 300px;
  height: 450px;
  perspective: 1000px;
  margin: auto;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.rating {
  position: absolute;
  top: 40%;
  left: 50%;
  color: white;
  font-size: 4rem;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  background-color: #2980b9;
  color: white;
  transform: rotateY(180deg);
}
</style>
