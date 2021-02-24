<template>
  <section class="event_history">
    <Login v-if="Object.keys(user).length === 0" />
    <div v-else>
      <br />
      <div class="profile">
       <div class = "user"> <img class="portrait" src="../assets/user.png" alt />
        <h1 class="name">{{ user.name }}</h1></div>
        <p class="email">{{ user.emailId }}</p>
      </div>
      <div class="events">
      <h1 class="old_history">Upcoming Events</h1>
      <div v-if="!eventHistory || !eventHistory.length">
        <h2 style="color: red">No Upcoming Events available</h2>
      </div>
      <div v-else>
        <EventHistory
          v-for="item in eventHistory"
          :key="item.event.id"
          :event="item.event"
        />
      </div>
      <h1 class="old_history">Past Events</h1>
      <div v-if="!pastEventHistory || !pastEventHistory.length">
        <h2 style="color: red">No Past Events available</h2>
      </div>
      <div v-else>
        <EventHistory
          v-for="pastItem in pastEventHistory"
          :key="pastItem.event.id"
          :event="pastItem.event"
        />
      </div>
      </div>
    </div>
  </section>
</template>


<script>
import Login from "./../components/Login";
import EventHistory from "./../components/EventHistory.vue";

export default {
  data() {
    return {
      visible: true,
    };
  },
  components: {
    Login,
    EventHistory,
  },

  mounted() {
    if (Object.keys(this.user).length != 0) {
      this.getUser(this.user.emailId);
    }
  },
  computed: {
    user() {
      return this.$store.state.userService.user;
    },
    eventHistory() {
      let eventList = this.$store.state.userService.eventHistory;
      let newList = eventList.filter(eventItem => {
        return (Date.now() - Date.parse(eventItem.event.When)) <= 0;
      })
      return newList;
    },
    pastEventHistory() {
      let eventList = this.$store.state.userService.eventHistory;
      let newList = eventList.filter(eventItem => {
        return (Date.now() - Date.parse(eventItem.event.When)) > 0;
      })
      return newList;
    },
  },
  methods: {
    getUser(email) {
      this.$store.dispatch("getUser", email);
    },
    getUserEventHistory(user) {
      this.$store.dispatch("getUserEventHistory", user);
    },
  },
};
</script>


<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile .name {
  font-family: "PT Serif", serif;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 900;
}

.profile .email {
  font-family: "Work Sans", sans-serif;
  font-size: 1rem;
}
.profile .portrait {
  border-radius: 50%;
  width: 4.3rem;
  background: #ffffff;
}

.profile .user {
   display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.events {
  display: flex;
  flex-direction: column;
}

.events .old_history {
  font-size: 1.4rem;
  font-family: "PT Serif", serif;
  font-weight: 900;
  line-height: 120%;
  text-align: left;
  width: 85%;
  margin-left: 10%;
}
</style>
