<template>
  <div id="app">
    <link rel="stylesheet" 
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" 
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" 
        crossorigin="anonymous">
    <header>
        <img class="headerLogo" v-bind:src="imgUrl" alt />
      <div id="nav">
      
        <router-link to="/events">Events</router-link> |
        <router-link to="/">About</router-link> |
          <router-link to="/profile">Profile</router-link> |
         
      </div>
      <div v-if="Object.keys(user).length != 0" class="toolTip">
       <img  v-bind:src="logUrl"  class="logLogo"  @click="logout"> 
      <span>Logout</span>
      </div>
     <div v-else class="toolTip"> 
          <img   v-bind:src="logUrl"    class="logLogo" @click="login"/>
    <span>Login/SignUp</span>
     </div>
  </header>
    <vue-confirm-dialog class="confirmBtn"></vue-confirm-dialog>
    <router-view :events="events" />
  </div>
</template>

<script>
export default {
  data: () => ({
    events: {},
    imgUrl: require("@/assets/logo.png"),
    logUrl: require("@/assets/logImg.png")
  }),
  beforeMount() {
    let promise = new Promise((resolve) => {
      resolve(this.$store.dispatch("getAllEvents"));
    });
    promise.then(() => {
      this.events = this.$store.state.eventService.events;
    });
  },
  computed: {
    user() {
      return this.$store.state.userService.user;
    },
  },
  methods: {
    getImgURL() {
      return "src/assets/logo.png";
    },
    login() {
      this.$router.push("/login");
    },
    logout() {
      this.$store.dispatch("logOffUser");
    },
  },
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
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  background-color: rgb(182, 94, 112);
  background-size: cover;
  text-align: center;
  width: 100%;
  grid-column-gap: 35%;
}

 .headerLogo {
  height: 40px;
  width: 40px;
}
 .logLogo {
  height: 40px;
  width: 40px;
}
#nav {
  padding-top: 10%;
}
#nav a {
  font-weight: bold;
  color: #080808;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  color: #d8cfcb;
}

.confirmBtn button {
  border-radius: 0 0 1rem 0;
  border: 0;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 700;
  outline: none;
  min-height: 50px;
  cursor: pointer;
  color: var(--theme-ui-colors-white, #ffffff);
  fill: var(--theme-ui-colors-white, #ffffff);
  background-color: var(--theme-ui-colors-peach, #f65858);
  border-color: var(--theme-ui-colors-peach, #f65858);
}
.confirmBtn button:hover {
  background: #3d2f27;
  color: #ffffff;
  transition: 0.7s;
  cursor: pointer;
}

.confirmBtn button .left {
  border-radius: 0;
  border-right: 1px solid var(--button-border-color);
}
.confirmBtn .vc-text-grid {
  padding: 1rem;
}
.confirmBtn .vc-btn-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 0 0 1rem 1rem;
  overflow: hidden;
}
.confirmBtn .vc-btn-grid.isMono {
  grid-template-columns: 1fr;
}
.toolTip {
    text-decoration: none
}
.toolTip:hover {
    cursor: pointer;
    position: relative
}
.toolTip span {
    display: none;
    color: #000;
}
.toolTip:hover span {
    border: #030303 1px;
    display: block;
    z-index: 100;
    left: 0px;
    margin-right: 40px;
    width: 35px;
    position: absolute;
    top: 30px;
    text-decoration: none;
}
</style>