<template>
  <div class="events" >
    <div class="aboutEvent" @click="goTo(event.id)">
      <h4 style="color: grey">{{ event.When }} </h4>
      <h3>{{ event.Title }}</h3>
      <h3>Where : {{ event.Location }}</h3>
      <img :src="event.Img" alt="bild" />
    </div>
    <div>
      <button class="addBtn" @click="addToProfile(event.id)">Sign up</button>
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
    }
   },
 
  methods: {
    goTo(id) {
      this.$router.push(`/eventInfo/${id}`);
    },
    addToProfile(eventId) {
      
     if(Object.keys(this.user).length == 0) {
     this.$confirm({
         auth: false,
         message: "You must Log in to Sign up for the event.Do you want to Sign in?",
         button: {
           no: 'Cancel',
           yes: 'Yes'
         },
         callback: confirm => {
           if(confirm == true) {
             this.$store.state.userService.selectedEventId = eventId;
             this.$router.push(`/profile`);
           } 
         }
       })
       
     } else {
        this.$store.state.userService.selectedEventId = eventId;
       let filteredEvents = this.user.events.filter( events =>{
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
           no: 'Ok'
         }
       })
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
}
.events img {
  width: 200px;
  height: 160px;
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
    color: var(--theme-ui-colors-white,#FFFFFF);
    fill: var(--theme-ui-colors-white,#FFFFFF);
    background-color: var(--theme-ui-colors-peach,#F65858);
    border-color: var(--theme-ui-colors-peach,#F65858);
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
</style>