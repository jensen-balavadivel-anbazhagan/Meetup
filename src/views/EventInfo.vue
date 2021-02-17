<template>
  <div>
    <section>
      <img :src="eventInfo.Img" alt="no img avb">
      <article class="infoSection">
        <h2>{{ eventInfo.Title || event.Title }}</h2>
        <h2>{{ eventInfo.When }} kr</h2>
        <h3>Description:</h3>
        <p>{{ eventInfo.Description }}</p>
      <button class="addBtn" @click="addToCard(event)">Sign up</button>
      </article>

      
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    events() {
      return  this.$store.state.eventService.events
    },
    eventInfo() {
      let chosenEvent = {
        Title : this.infoChosen ? this.infoChosen.Title : 'Error',
        When : this.infoChosen ? this.infoChosen.When : 'Yet to be decided',
        Description : this.infoChosen ? this.infoChosen.Description : 'No description available',
        Img : this.infoChosen ? this.infoChosen.Img : 'No img available'
      }
      return chosenEvent;
    },
    infoChosen(){ 
        if ( this.$route !== undefined ) {
          return this.events.find(b => b.id == this.$route.params.id)
        } else {
          return null
        }
      }
    },
  methods: {
    addToCard(event) {
      this.cart.push({
        id: event.id,
        Title: event.Title,
        Price: event.Description,
        Type: event.Location,
        Img: event.Img
      });
    },
  },
};
</script>

<style scoped>
section {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 10%;
}
article {
  margin: 5rem;
  border: solid 2px #3d2f27;
  padding: 3rem;
   max-width: 50%;
  max-height: 50%;
  width: 50%;
 height: 50%;
}
div {
  color: #3d2f27;
}
img {
  margin-top: 0;
  max-width: 50%;
  max-height: 50%;
   width: 50%;
 height: 50%;
}

.addBtn {
     box-sizing: border-box;
    margin: 16px 0px 0px;
    min-width: 0px;
    width:180px;
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
