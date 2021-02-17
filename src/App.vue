<template>
  <div id="app">
    <header>
     
      <div id="nav">
         <img class="headerLogo" v-bind:src="imgUrl" alt/>
        <router-link to="/events">Events</router-link> |
        <router-link to="/">About</router-link> |
        <router-link to="/profile">Profile</router-link> |
      </div>
     
    </header>

  <router-view :events="events" />
  </div>
</template>

<script>
export default {
    data: () => ({
    events: {},
    imgUrl: require('@/assets/logo.png')
  }),
 beforeMount() {
    let promise = new Promise(resolve => {
      resolve(this.$store.dispatch('getAllEvents'));
    });
    promise.then(() => {
     this.events = this.$store.state.eventService.events;
    });
  },
  methods: {
    getImgURL() {
      return "src/assets/logo.png";
    }
  }
};
</script>

<style>
body {
  background-color: #f3e4e1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f3e4e1;
  height: 100%;
}
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: rgb(182, 94, 112);
  background-size: cover;
  text-align: center;
  width: 100%;
}
#nav {
  margin-right: 40%;
}
#nav a {
  font-weight: bold;
  color: #080808;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: #d8cfcb;
}
#nav img {
  height: 40px;
  width: 40px;
  margin-right: 55%;
}
</style>
