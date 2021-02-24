<template>
  <div class="events" >
    <div class="aboutEvent" >
     <h4 style="color: grey"><i class="fa fa-calendar"/> {{ eventDate }} </h4> 
        <h4 style="color: grey"><i class="fas fa-clock"/> {{ event.Time }} </h4>
      <h3>{{ event.Title }}</h3>
      <h3><i class="fa fa-map-marker"/> {{ event.Location }}</h3>
      <img :src="event.Img" alt="bild" />
    </div>
    <div>
      <button v-if="isPastEvent" class="reviewBtn" @click="review(event)">Write Review</button>
      <button v-else class="reviewBtn" @click="joinEvent()">Join Event</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: Object,
  },
 computed: {
   eventDate() {
       const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const date = new Date(this.event.When);
            const month = monthArray[date.getMonth()];           
            const day = date.getDate();
            const year = date.getFullYear();
            return day + ' ' + month + ' ' + year;
    },
    isPastEvent() {
            const currentDate = Date.now();
            const eventDate = Date.parse(this.event.When);
            const timeDiff = currentDate-eventDate;
            if(timeDiff < 0) {
                return false;
            } else {
                return true;
            }
        }
 },
 
   
  methods: {
    
    review(event) {
           this.$router.push(`/newReview/${event.id}`);
    },
    joinEvent() {
      this.$confirm({
         auth: false,
         message: "Not Implemented yet",
         button: {
           no: 'Ok'
         }
       })
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
  max-height: 10%;
}
.events img {
  width: 200px;
  height: 160px;
}
.reviewBtn {
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
.reviewBtn:hover {
  background: #3d2f27;
  color: #ffffff;
  transition: 0.7s;
  cursor: pointer;
}
.reviewBtn span {
  float: left;
}
</style>