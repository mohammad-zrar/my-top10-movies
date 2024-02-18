<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <h1 class="rank-number">1</h1>
        <img
          src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/jHxCeXnSchAuwHnmVatTgqMYdX8.jpg"
          alt="Poster"
          style="width: 300px; height: 450px"
        />
      </div>
      <div class="flip-card-back">
        <h1 class="movie-title">The Wolf of Wall Street (1999)</h1>
        <div class="overview">
          <h3 class="header">Overview</h3>
          <p class="body">
            A New York stockbroker refuses to cooperate in a large securities
            fraud case involving corruption on Wall Street, corporate banking
            world and mob infiltration. Based on Jordan Belfort's autobiography.
          </p>
        </div>
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
  background-color: #242933;
  color: #ffffff;
  transform: rotateY(180deg);
}
.rank-number {
  position: absolute;
  top: 40%;
  left: 50%;
  color: white;
  font-size: 4rem;
}
.movie-title {
  margin-top: 1rem;
}
.overview .header {
  display: inline-block;
  font-weight: 500;
  border-bottom: solid 2px #eaeaea;
}

.overview .body {
  font-size: 0.8rem;
  margin: auto 1.2rem;
}
</style>
