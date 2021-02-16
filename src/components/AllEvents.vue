<template>
  <div class="events" >
    <div class="goToEvent" @click="goTo(event.id)">
      <h4 style="color: grey">{{ event.When }} </h4>
      <h3>{{ event.Title }}</h3>
      <h3>Where : {{ event.Location }}</h3>
      <img :src="event.Img" alt="bild" />
    </div>
    <div>
      <button class="addBtn" @click="addToCard(event)">Sign up</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: Object,
  },
  
  methods: {
    goTo(id) {
      this.$router.push(`/EventInfo/${id}`);
    },
    addToCard(event) {
     alert("To be implemented" + event)
    },
  },
};
</script>

<style scoped>
.events {
  margin: 15px;
  padding: 1rem;
  border: 1px solid rgba(15, 15, 15, 0.329);
  background-color: #c9c9c750;
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
  float: right;
  display: block;
  text-decoration: none;
  background: #705546;
  color: #eeeeee;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  transition: 0.7s;
  letter-spacing: 1px;
  width: 180px;
  margin-right: 30px;
  align-self: start;
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