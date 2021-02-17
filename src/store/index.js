import Vue from 'vue';
import Vuex from 'vuex';
import eventService from "../store/EventService";
import userService from "../store/UserService";

Vue.use(Vuex);


export default new Vuex.Store({

    state: {
    },
 
    mutations: {
    },
    actions: {
    },
    modules: {
        eventService,
        userService
    }
})
