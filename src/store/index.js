import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
const state = {
  siteName: "",
  siteLogo: "",
  siteIcon: "",
};
const mutations = {
  editSiteSetting(state, payload) {
    state.siteName = payload.siteName;
    state.siteLogo = payload.siteLogo;
    state.siteIcon = payload.siteIcon;
  },
  getsiteData(state) {
    let result = axios.get(`http://localhost:3000/settingPage/1`).then((response)=>{
      state.siteName = response.data.siteName
      state.siteLogo = response.data.siteLogo
      state.siteIcon = response.data.siteIcon
    })
  },
};
export default new Vuex.Store({
  state: state,
  getters: {},
  mutations: mutations,
  actions: {},
  modules: {},
});
