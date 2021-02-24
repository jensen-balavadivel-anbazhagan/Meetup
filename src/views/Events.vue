<template>
  <section style="background-color: #f3e4e1;">
    <div class="wrapper">
      <div class="search-wrapper">
        <input
          id="search"
          type="text"
          v-model="search"
          placeholder="Search for a event here.."
          @input="filter()"
        />
      </div>
    </div>
   <div class="events"> 
     <h1 class = "old_history">Upcoming Events</h1>
    <div  v-if="!filteredList || !filteredList.length" >
      <h2 style="color: red">No Upcoming Events available</h2>
    </div>
    <div v-else>
      <AllEvents v-for="event in filteredList" :key="event.id" :event="event" />
    </div>
     <h1 class = "old_history">Past Events</h1>
    <div  v-if="!filteredPastList || !filteredPastList.length" >
      <h2 style="color: red">No Past Events available</h2>
    </div>
    <div v-else>
      <AllEvents v-for="pastEvent in filteredPastList" :key="pastEvent.id" :event="pastEvent" />
    </div>
   </div>
  </section>
</template>

<script>
import AllEvents from "./../components/AllEvents";
export default {
  props: {
    events: {},
  },
  data: () => ({
    search: "",
    filteredList: {},
    filteredPastList: {},
  }),
  components: {
    AllEvents,
  },
  methods: {
    filter() {
      if (
        this.search == "undefined" ||
        this.search == null ||
        this.search == ""
      ) {
        this.filteredList = this.events.filter(eventItem => {
        return (Date.now() - Date.parse(eventItem.When)) <= 0;
      });
      this.filteredPastList = this.events.filter(eventItem => {
        return (Date.now() - Date.parse(eventItem.When)) > 0;
      });

      } else {
        this.filteredList = this.events.filter((event) => {
          return event.Title.toLowerCase().includes(this.search.toLowerCase()) && (Date.now() - Date.parse(event.When)) <= 0;
        });
         this.filteredPastList = this.events.filter((event) => {
          return event.Title.toLowerCase().includes(this.search.toLowerCase()) && (Date.now() - Date.parse(event.When)) > 0;
        });
      }
    },
  },
  beforeMount() {
     this.filter();
  },
};
</script>

<style>
.wrapper {
  display: flex;
  padding: 5px;
  flex-direction: row;
  justify-content: center;
 background-color: #f3e4e1;

}
.wrapper h1 {
  margin-left: 20%;
  width: 60%;
}
.wrapper .search-wrapper {
  position: relative;
  width: 40%;
}
.search-wrapper {
  display: flex;
  flex-direction: column;
}
.wrapper .search-wrapper input {
  padding: 1rem;
  color: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.12);
  transition: 0.15s all ease-in-out;
  background: white;
  display: flex;
  border-radius: 5px;
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
