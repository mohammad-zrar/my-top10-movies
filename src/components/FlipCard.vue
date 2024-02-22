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
        <div class="overview-section">
          <h3 class="header">My Overview</h3>
          <p class="body">
            A New York stockbroker refuses to cooperate in a large securities
            fraud case involving corruption on Wall Street, corporate banking
            world and mob infiltration. Based on Jordan Belfort's autobiography.
          </p>
        </div>
        <div class="rating-section">
          <h3 class="header">My Rate</h3>
          <p class="body"><span id="rate-value">8</span> / 10</p>
        </div>
        <div class="actions-section">
          <div class="edit-button">
            <base-button btnStyle="light">Edit</base-button>
          </div>
          <div class="delete-button">
            <base-button btnStyle="danger">Delete</base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import BaseButton from "./ui/BaseButton.vue";
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
.overview-section .header,
.rating-section .header {
  color: #ff2e63;
  display: inline-block;
  font-weight: 500;
  border-bottom: solid 1px #ff2e63;
  margin-bottom: 0.5rem;
}

.overview-section .body {
  font-size: 0.9rem;
  margin: auto 0.5rem;
}
.rating-section .body {
  font-size: 1rem;
}
#rate-value {
  color: #ff2e63;
  font-weight: bold;
}

/* ---- Actions section ---- */
.actions-section {
  display: flex;
}
</style>
