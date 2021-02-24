<template>
  <article class="review">
    <div class="ratingsProfile">
      <div class="profile">
        <img class="portrait" src="../assets/user.png" alt />
        <h3>{{ review.user }}</h3>
      </div>

      <div class="ratings">
        <FaRating
          :glyph="star"
          :item-size="15"
          inactive-color="white"
          active-color="#cedf35"
          v-model="rating"
          :read-only="true"
          :spacing="1"
        />
      </div>
    </div>
    <p class="reviewDesc">{{ review.review }}</p>
  </article>
</template>

<script>
import { FaRating } from "vue-rate-it";
import Star from "vue-rate-it/glyphs/star";
export default {
  props: {
    review: Object,
  },
  components: {
    FaRating,
  },
  created() {
    // register the icon
    this.star = Star;
  },
  data() {
    return {
      star: "",
    };
  },
  computed: {
    rating() {
      return this.review.rating;
    },
  },
};
</script>

<style scoped>
.review {
  display: block;
  border: solid 2px #3d2f27;
  margin: 0 0.2rem;
  column-gap: 20px;
}
.ratingsProfile {
  display: grid;
  grid-template-columns: 50% 50%;
}
.profile {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  max-width: 40%;
}
.profile img {
  border-radius: 50%;
  width: 4.3rem;
  background: #ffffff;
  width: 25px;
  height: 20px;
}
.ratings {
  font-size: 15px;
  align-items: center;
  padding-top: 5%;
}

.reviewDesc {
  font-size: 15px;
  padding-bottom: 5%;
  width: 100%;
}
</style>