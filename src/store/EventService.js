import axios from "axios";
const config = require('../assets/config.json');
export default {
  state: {
    events: {}
  }, 
  mutations: {
    showEvents(state, eventList) {
      console.log("in service" + eventList);
      state.events = eventList
      console.log( state.events);
  }
  },
  actions: {
    async getAllEvents(ctx) {
      
      return axios.get(config.dbURl, {

          headers: {
            "secret-key": config.token,
          },
      }).then(
      response => {
        ctx.commit('showEvents', response.data.events)
      }).catch(e => {
        console.log(e);
      });
  }

}
}