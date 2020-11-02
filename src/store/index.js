import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state = {}
const mutations = {}
const actions = {}
const getters = {}

import home from './home'
import users from './users'
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules:{
        home,
        users
    }
})