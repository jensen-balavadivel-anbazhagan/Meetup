<template>
  <div id="app">
    <header>
      <div id="nav">
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
  }),
 beforeMount() {
    let promise = new Promise(resolve => {
      resolve(this.$store.dispatch('getAllEvents'));
    });
    promise.then(() => {
     this.events = this.$store.state.eventService.events;
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
header {
  background-image: url(./assets/logo.png);
  background-size: cover;
  height: 28vw;
  text-align: center;
  background-position: calc(100% - 1px) calc(50% - 1px);
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: #85756d;
}
</style>
