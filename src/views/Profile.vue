<template>
  <section class="event_history">
    <Login v-if="Object.keys(user).length === 0" />
    <div v-else>
      <br/>
      <div class="profile">
        <img class="portrait" src="../assets/user.png" alt />
        <h1 class="name">{{user.name}}</h1>
        <p class="email">{{user.emailId}}</p>
      </div>
      <h1 class="old_history">Event History</h1>
       <div  v-if="!eventHistory || !eventHistory.length" >
      <h2 style="color: red">No Events available</h2>
    </div>
    <div v-else>
          <EventHistory v-for="item in eventHistory" :key="item.event.id" :event="item.event" />
    </div>
    </div>
  </section>
</template>


<script>
import Login from "./../components/Login";
import EventHistory from './../components/EventHistory.vue';

export default {
  data() {
    return {
      visible: true,
    };
  },
  components: {
    Login,
    EventHistory
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
      return this.$store.state.userService.eventHistory;
    },
  },
  methods: {
    navOpen() {
      this.visible = false;
    },
    navClose() {
      this.visible = true;
    },
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

.name {
  font-family: "PT Serif", serif;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 900;
}

.email {
  font-family: "Work Sans", sans-serif;
  font-size: 1rem;
}
.portrait {
  border-radius: 50%;
  width: 4.3rem;
  background: #ffffff;
}

.history_scroll {
  width: 100%;
  height: 25rem;
  overflow: auto;
  overflow-x: hidden;
}

.history_scroll::-webkit-scrollbar {
  background: #3a322e;
  border-radius: 6px;
}
.history_scroll::-webkit-scrollbar-thumb {
  background: #534a46;
  border-radius: 6px;
}

.old_history {
  font-size: 1.4rem;
  font-family: "PT Serif", serif;
  font-weight: 900;
  line-height: 120%;
  text-align: left;
  width: 85%;
  margin-left: 10%;
}
</style>
