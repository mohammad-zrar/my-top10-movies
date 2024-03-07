<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <h1 class="rank-number">1</h1>
        <img
          :src="imgPoster"
          alt="Poster"
          style="width: 300px; height: 450px"
        />
      </div>
      <div class="flip-card-back">
        <h1 class="movie-title">{{ title }} ({{ year }})</h1>
        <div class="overview-section">
          <h3 class="header">My Overview</h3>
          <div class="body-container">
            <p class="body">
              {{ overview }}
            </p>
          </div>
        </div>
        <div class="rating-section">
          <h3 class="header">My Rate</h3>
          <p class="body">
            <span id="rate-value">{{ rating }}</span> / 10
          </p>
        </div>
        <!-- Actions Section -->
        <div class="actions-section">
          <div class="edit-button">
            <base-button btnStyle="light">Edit</base-button>
          </div>
          <div class="delete-button">
            <base-button btnStyle="danger">Delete</base-button>
          </div>
        </div>
        <!-- End Action Section -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";
import BaseButton from "./ui/BaseButton.vue";

const movieInfo = defineProps({
  title: String,
  year: Number,
  overview: String,
  rating: Number,
  imgPoster: String,
});
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #242933;
  color: #ffffff;
  transform: rotateY(180deg);
  box-sizing: border-box;
  padding: 10px;
  overflow: hidden; /* Prevent overflow from the sides */
  width: 300px; /* Set the desired width */
  height: 450px; /* Set the desired height */
}
.rank-number {
  position: absolute;
  top: 40%;
  left: 50%;
  color: white;
  font-size: 4rem;
}
/* Movie title */
.movie-title {
  font-size: 1.25rem;
}

/* Overview section */

.overview-section .header,
.rating-section .header {
  color: #ff2e63;
  display: inline-block;
  font-weight: 500;
  border-bottom: solid 1px #ff2e63;
}

.overview-section .body {
  font-size: 0.75rem;
  margin-bottom: 10px;
}

/* ... existing styles ... */
.overview-section {
  max-height: calc(100% - 60px);
  overflow-y: hidden;
  word-wrap: break-word;
  position: relative; /* Ensure relative positioning for absolute positioning of header */

  /* Additional styles for the header */
  .header {
    color: #ff2e63;
    display: inline-block;
    font-weight: 500;
    border-bottom: solid 1px #ff2e63;
  }

  .body-container {
    overflow-y: auto; /* Enable scrolling only for the body container */
    max-height: calc(
      100% - 50px
    ); /* Adjust the value to leave space for the header */
    padding: 10px; /* Adjust padding as needed */
  }
}

/* Scrollbar styles for the body container */
.overview-section .body-container::-webkit-scrollbar {
  width: 8px;
}

.overview-section .body-container::-webkit-scrollbar-thumb {
  background-color: #d9d9d9;
  border-radius: 4px;
}

.overview-section .body-container::-webkit-scrollbar-track {
  background-color: #363b45; /* Color of the track */
  border-radius: 4px;
}
/* ... existing styles ... */

/* Rating Section */

.rating-section .body {
  font-size: 1rem;
}
#rate-value {
  color: #ff2e63;
  font-weight: bold;
}

/* ---- Actions section ---- */
.actions-section {
  margin-top: 4rem;
  display: flex;
  justify-content: space-around;
}
</style>
