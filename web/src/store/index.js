import Vue from "vue";
import Vuex from "vuex";
import host from "./modules/host"
import user from "./modules/user"

Vue.use(Vuex);

export default new Vuex.Store({
    actions:{
        _resetVuex({state,commit}){
            console.log("state",state)
            // commit(state.)
        }
    },
    modules: {
        host,
        user
    }
});
