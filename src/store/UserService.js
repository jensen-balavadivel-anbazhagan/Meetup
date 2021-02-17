import axios from "axios";
const config = require('../assets/config.json');

export default {
  state: {
    user: {},
    eventHistory: []
  },
  mutations: {
    addUser(state, userData) {
      state.user = userData;
    },
    getUser(state, userData) {

      state.user = userData;
    },

    addUserEventHistory(state, data) {
      state.eventHistory = [];
      data.forEach(event => {
        state.eventHistory.push({
          event
        })
      });
    }
  },
  actions: {
    async createUser(ctx, user) {


      let resData;
      //get the user data first
      return axios.get(config.dbURl, {

        headers: {
          "secret-key": config.token,
        },
      }).then(
        response => {
          resData = response.data;
          //Check if the user already exists
          let filteredList = resData.users.filter((userD) => {
            return userD.emailId.toLowerCase() == (user.email.toLowerCase());
          });
          //If user does not exists then add the user first
          if (filteredList.length == 0) {
            let newUser = {
              id: resData.users.length+1,
              name: user.name,
              emailId: user.email,
              events: []
            }
            resData.users.push(newUser);
            return axios.put(config.dbURl, resData, {

              headers: {
                "secret-key": config.token,
                "versioning": false
              },
            }).then(
              res => {
                if (res.data.success == true) {
                  ctx.commit("addUser", newUser);
                  this.dispatch('getUserEventHistory', newUser);
                }

              }).catch(e => {
                console.log(e);
              });
            //If user exists already then just log in the user
          } else {
            ctx.commit("addUser", filteredList[0]);
            this.dispatch('getUserEventHistory', filteredList[0]);
          }
        }).catch(e => {
          console.log(e);
        });
    },


    async getUser(ctx, email) {
      return axios.get(config.dbURl, {

        headers: {
          "secret-key": config.token,
        },
      }).then(response => {
        let resData = response.data.users;
        if (resData != 'undefined' && email !== 'undefined') {
          let filteredList = resData.filter((userD) => {
            return userD.emailId.toLowerCase() == email.toLowerCase();
          });
          //If user does not exists then add the user first
          if (filteredList.length == 0) {
            ctx.commit("getUser", filteredList[0]);
          }
        }
      });
    },

    async getUserEventHistory(ctx, user) {
      //get all the events
      return axios.get(config.dbURl, {

        headers: {
          "secret-key": config.token,
        },
      }).then(
        response => {
          //filter the events of the user from the whole event list
          let filteredList = response.data.events.filter((event) => {
            return user.events.includes(event.id);
          });
          
          ctx.commit("addUserEventHistory", filteredList);
        }).catch(e => {
          console.log(e);
        });
    }
  }
}