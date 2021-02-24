<template>
  <div>
    <h3 class="breadCrumb"> <i class="fas fa-arrow-left "  @click="goBack()">Back to Events </i></h3>
    <section class="sectionStyle">
      <img :src="eventInfo.Img" alt="no img avb" />
      <article class="infoSection">
        <div v-if="isPastEvent">
          <FaRating
            :glyph="star"
            :item-size="30"
            inactive-color="white"
            active-color="#cedf35"
            :read-only="true"
            v-model="rating"
          />
        </div>
        <h2>{{ eventInfo.Title || event.Title }}</h2>
        <h2 style="color: grey">
          <i class="fa fa-calendar" /> {{ eventDate }}
        </h2>
        <h2 style="color: grey">
          <i class="fas fa-clock" /> {{ eventInfo.Time }}
        </h2>
        <h3>Description:</h3>
        <p>{{ eventInfo.Description }}</p>
        <button
          v-if="!isPastEvent"
          class="addBtn"
          @click="addToProfile(eventInfo.id)"
        >
          Sign up
        </button>
        <button v-else class="disabledButton" disabled>Event Completed</button>
      </article>
    </section>
    <div class="reviews" v-if="reviewList && reviewList.length">
      <h3>Reviews</h3>
      <ReviewItem
        v-for="reviewItem in reviewList"
        :key="reviewItem.review.id"
        :review="reviewItem.review"
      />
    </div>
  </div>
</template>

<script>
import { FaRating } from "vue-rate-it";
import Star from "vue-rate-it/glyphs/star";
import ReviewItem from "./../components/ReviewItem.vue";
export default {
  components: {
    ReviewItem,
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
    user() {
      return this.$store.state.userService.user;
    },
    events() {
      return this.$store.state.eventService.events;
    },
    eventInfo() {
      let chosenEvent = {
        Title: this.infoChosen ? this.infoChosen.Title : "Error",
        When: this.infoChosen ? this.infoChosen.When : "Yet to be decided",
        Description: this.infoChosen
          ? this.infoChosen.Description
          : "No description available",
        Img: this.infoChosen ? this.infoChosen.Img : "No img available",
        id: this.infoChosen ? this.infoChosen.id : "",
        Time: this.infoChosen ? this.infoChosen.Time : "Yet to be decided",
      };
      return chosenEvent;
    },
    infoChosen() {
      if (this.$route !== undefined) {
        return this.events.find((b) => b.id == this.$route.params.id);
      } else {
        return null;
      }
    },
    eventDate() {
      const monthArray = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const date = new Date(this.infoChosen.When);
      const month = monthArray[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      return day + " " + month + " " + year;
    },
    isPastEvent() {
      const currentDate = Date.now();
      const eventDate = Date.parse(this.infoChosen.When);
      const timeDiff = currentDate - eventDate;
      if (timeDiff < 0) {
        return false;
      } else {
        return true;
      }
    },
    rating() {
      return this.$store.state.reviewService.ratingForEvent;
    },
    reviewList() {
      return this.$store.state.reviewService.reviewList;
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
    goBack() {
      this.$router.push(`/events`);
    },
    addToProfile(eventId) {
      if (Object.keys(this.user).length == 0) {
        this.$confirm({
          auth: false,
          message:
            "You must Log in to Sign up for the event.Do you want to Sign in?",
          button: {
            no: "Cancel",
            yes: "Yes",
          },
          callback: (confirm) => {
            if (confirm == true) {
              this.$store.state.userService.selectedEventId = eventId;
              this.$router.push(`/profile`);
            }
          },
        });
      } else {
        this.$store.state.userService.selectedEventId = eventId;
        let filteredEvents = this.user.events.filter((events) => {
          return eventId == events;
        });
        if (filteredEvents.length == 0) {
          this.$store.dispatch("addEventToUser", eventId);
          this.$router.push(`/profile`);
        } else {
          this.$confirm({
            auth: false,
            message: "Event is already signed up for the user",
            button: {
              no: "Ok",
            },
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.sectionStyle {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10%;
}
.infoSection {
  margin: 5rem;
  border: solid 2px #3d2f27;
  padding: 3rem;
  max-width: 50%;
  max-height: 50%;
  width: 50%;
  height: 50%;
}
div {
  color: #3d2f27;
}
img {
  margin-top: 0;
  max-width: 50%;
  max-height: 50%;
  width: 50%;
  height: 50%;
}

.addBtn {
  box-sizing: border-box;
  margin: 16px 0px 0px;
  min-width: 0px;
  width: 180px;
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
}
.addBtn:hover {
  background: #3d2f27;
  color: #ffffff;
  transition: 0.7s;
  cursor: pointer;
}
.addBtn span {
  float: left;
}

.disabledButton {
  box-sizing: border-box;
  margin: 16px 0px 0px;
  min-width: 0px;
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
  fill: var(--theme-ui-colors-white, #cac4c4);
  background-color: var(--theme-ui-colors-peach, #c5bcbc);
  border-color: var(--theme-ui-colors-peach, #0e0c0c);
}

.reviews {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-x: auto;
  max-width: 50%;
}
.reviews h4 {
  justify-content: start;
}
.breadCrumb{
  margin-right:90%;
  min-width: 20%;
  width: 20%;
}
</style>