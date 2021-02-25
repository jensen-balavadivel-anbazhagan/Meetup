<template>
  <section class="eventsSec">
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
      <div v-if="!filteredList || !filteredList.length" style="margin-top: 5%">
        <h1 class="old_history">Upcoming Events</h1>
        <div>
          <h2 style="color: red">No Upcoming Events available</h2>
        </div>
      </div>
      <div v-else>
        <h1 class="old_history">Upcoming Events</h1>
        <div>
          <AllEvents
            v-for="event in filteredList"
            :key="event.id"
            :event="event"
          />
        </div>
      </div>

      <div v-if="!filteredPastList || !filteredPastList.length" style="margin-top: 10%">
        <h1 class="old_history">Past Events</h1>
        <div>
          <h2 style="color: red">No Past Events available</h2>
        </div>
      </div>

      <div v-else >
        <h1 class="old_history">Past Events</h1>
        <div>
          <AllEvents
            v-for="pastEvent in filteredPastList"
            :key="pastEvent.id"
            :event="pastEvent"
          />
        </div>
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
        this.filteredList = this.events.filter((eventItem) => {
          return Date.now() - Date.parse(eventItem.When) <= 0;
        });
        this.filteredPastList = this.events.filter((eventItem) => {
          return Date.now() - Date.parse(eventItem.When) > 0;
        });
      } else {
        this.filteredList = this.events.filter((event) => {
          return (
            event.Title.toLowerCase().includes(this.search.toLowerCase()) &&
            Date.now() - Date.parse(event.When) <= 0
          );
        });
        this.filteredPastList = this.events.filter((event) => {
          return (
            event.Title.toLowerCase().includes(this.search.toLowerCase()) &&
            Date.now() - Date.parse(event.When) > 0
          );
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
.eventsSec {
  background-color: #f3e4e1;
  max-height: 80%;
}
.eventsSec .wrapper {
  display: flex;
  padding: 5px;
  flex-direction: row;
  justify-content: center;
  background-color: #f3e4e1;
}

.wrapper .search-wrapper {
  position: relative;
  width: 40%;
}
.wrapper .search-wrapper {
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
  max-height: 80%;
  height: 80%;
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
