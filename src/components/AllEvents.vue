<template>
  <div class="events">
    <div class="aboutEvent" @click="goTo(event.id)">
      <h4 style="color: grey"><i class="fa fa-calendar" /> {{ eventDate }}</h4>
      <h4 style="color: grey"><i class="fas fa-clock" /> {{ event.Time }}</h4>
      <h3>{{ event.Title }}</h3>
      <h3><i class="fa fa-map-marker" /> {{ event.Location }}</h3>
      <img :src="event.Img" alt="bild" />
    </div>
    <div>
      <button
        v-if="!isPastEvent"
        class="addBtn"
        @click="addToProfile(event.id)"
      >
        Sign up
      </button>
      <button v-else class="disabledButton" disabled>Event Completed</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: Object,
  },

  computed: {
    user() {
      return this.$store.state.userService.user;
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
      const date = new Date(this.event.When);
      const month = monthArray[date.getMonth()];
      const day = date.getDate();
      const year = date.getFullYear();
      return day + " " + month + " " + year;
    },
    isPastEvent() {
      const currentDate = Date.now();
      const eventDate = Date.parse(this.event.When);
      const timeDiff = currentDate - eventDate;
      if (timeDiff < 0) {
        return false;
      } else {
        return true;
      }
    },
  },

  methods: {
    goTo(id) {
      this.$router.push(`/eventInfo/${id}`);
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
.events {
  margin: 15px;
  padding: 1rem;
  border: 1px solid rgba(15, 15, 15, 0.329);
  background-color: #f3e4e1;
  box-shadow: 0 0 7px rgba(43, 41, 41, 0.623);
  float: left;
  width: 240px;
  color: #3d2f27;
  max-height: 20%;
  
}
.events img {
  width: 200px;
  height:  100px;
  max-width: 200px;
  max-height:  100px;
}
.addBtn {
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
.disabledButton span {
  float: left;
}
</style>