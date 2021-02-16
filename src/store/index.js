import Vue from 'vue';
import Vuex from 'vuex';
import eventService from "../store/EventService";

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
    }
})
