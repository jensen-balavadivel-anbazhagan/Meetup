<template>
  <section class="newReview">
    <h3 class="breadCrumb">
      <i class="fas fa-arrow-left" @click="goTo()">Back to Profile </i>
    </h3>

    <div class="ratingDiv">
      <h2 class="ratingHeading">Overall Rating:</h2>
      <div class="ratings">
        <FaRating
          :glyph="star"
          :item-size="30"
          inactive-color="white"
          active-color=" #cedf35"
          v-model="rating"
          :read-only="true"
        />
      </div>
    </div>

    <div class="ratingDiv">
      <h2 class="ratingHeading">Your Rating:</h2>
      <div class="ratings">
        <FaRating
          :glyph="star"
          :item-size="30"
          inactive-color="white"
          active-color=" #cedf35"
          v-model="newRatings"
        />
      </div>
    </div>

    <h2 class="ratingHeading">Write your review ( Max 500 characters)</h2>
    <h5 v-if="showError" style="color: red">
      Maximum limit is exceeded. Your review will be truncated!
    </h5>
    <div class="reviewText">
      <textarea
        name="review"
        id="review"
        placeholder="Write your review here..."
        max-length="5"
        v-model="reviewInput"
        @input="checkLimit"
      ></textarea>
    </div>

    <button class="saveReviewBtn" @click="saveReview()">Save Review</button>
  </section>
</template>


<script>
import { FaRating } from "vue-rate-it";
import Star from "vue-rate-it/glyphs/star";
export default {
  data() {
    return {
      star: "",
      reviewInput: "",
      newRatings: null,
      showError: false,
      maxLimit: 500,
    };
  },
  components: {
    FaRating,
  },
  created() {
    // register the icon
    this.star = Star;
  },
  computed: {
    eventId() {
      return this.$route.params.id;
    },
    rating() {
      return this.$store.state.reviewService.ratingForEvent;
    },
  },
  beforeMount() {
    this.getEvent();
  },
  methods: {
    getEvent() {
      this.$store.state.reviewService.ratingForEvent = 0;
      this.$store.state.reviewService.reviewList = [];
      this.$store.dispatch("getReviewForEvent", this.$route.params.id);
    },
    goTo() {
      this.$router.push(`/profile`);
    },
    checkLimit() {
      this.showError = this.maxLimit - this.reviewInput.length < 0;
    },
    saveReview() {
      let errMessage = "";
      
      if (this.newRatings > 0 && this.reviewInput.length > 0) {
        let user = this.$store.state.userService.user;
        let review = {
          eventId: this.eventId,
          userId: user.id,
          rating: this.newRatings,
          review: this.reviewInput,
        };
        this.$store.dispatch("addReview", review);
      } else {
        if (
          (this.newRatings == null || this.newRatings <= 0) &&
          this.reviewInput.length <= 0
        ) {
          errMessage = "Please provide your Rating and Review";
        } else if (this.newRatings == null || this.newRatings <= 0) {
          errMessage = "Please provide your rating";
        } else {
          errMessage = "Please provide your review";
        }

        this.$confirm({
          auth: false,
          message: errMessage,
          button: {
            no: "Ok",
          },
        });
      }
    },
  },
};
</script>


<style>
.newReview {
  display: flex;
  flex-direction: column;
   padding: 5px;
}

.newReview .ratingDiv {
  display: flex;
  flex-direction: row;
}
.newReview .ratingDiv .ratingHeading {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  margin-left: 10%;
}

.newReview .ratingDiv .ratings {
  font-size: 25px;
  align-items: center;
  padding-top: 1%;
  margin-left: 10%;
}

.newReview .reviewText {
  border: 1px solid #3d2f27;
  border-radius: 1rem;
  padding: 1rem;
  padding-bottom: 0.2rem;
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.newReview .reviewText textarea {
  width: 100%;
  min-height: 10rem;
  max-height: 13rem;
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.2px;
  line-height: 1.4rem;
  color: black;
  font-size: 1rem;
  border: none;
  background-color: #f3e4e1;
}

.newReview .reviewText textarea:focus {
  outline: none;
}

.saveReviewBtn {
  box-sizing: border-box;
  margin: 16px 0px 0px;
  min-width: 0px;
  max-width: 15%;
  appearance: none;
  display: inline-block;
  text-align: center;
  line-height: inherit;
  text-decoration: none;
  font-size: inherit;
  border-width: 0px;
  border-style: initial;
  border-image: initial;
  border-radius: 8px;
  cursor: pointer;
  color: var(--theme-ui-colors-white, #ffffff);
  fill: var(--theme-ui-colors-white, #ffffff);
  background-color: var(--theme-ui-colors-peach, #f65858);
  border-color: var(--theme-ui-colors-peach, #f65858);
  margin-left: 70%;
}
.saveReviewBtn:hover {
  background: #3d2f27;
  color: #ffffff;
  transition: 0.7s;
  cursor: pointer;
}
.saveReviewBtn span {
  float: left;
}
.newReview .breadCrumb {
  margin-right: 90%;
  min-width: 20%;
  width: 20%;
}
</style>
