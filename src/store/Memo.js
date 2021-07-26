import Vue from "vue"
import Vuex from "vuex"


Vue.use(Vuex)

export default new Vuex.Store({
  // state เหมือน fields ใน oop
  state: {
    data: [],
  },

  getters: {
    memos: (state) => state.data,
  },

  // mutations เหมือน private setter ใน oop
  // เอาไว้เปลี่ยนแปลงค่าใน state
  mutations: {
    fetch(state, { res }) {
      state.data = res.data
    },
    add(state, { payload }) {
      state.data.push(payload)
    },
    edit(state, { payload }) {
      state.data[payload.index].money = payload.money
      state.data[payload.index].detail = payload.detail
      state.data[payload.index].type = payload.type
    },
  },

  // actions เหมือน public methods ใน oop
  // ให้ภายนอก (component อื่น) เรียกใช้
  // หรือดึงค่าจากภายนอก เช่น API, server
  actions: {
    editMemo({ commit }, payload) {
      // todo: call api to edit data
      commit("edit", { payload })
    },

    // commit เป็น keyword ไว้เรียก mutation
    fetchMemo({ commit }) {
      let res = {
        data:[{
          "detail": "โดนปล้น",
          "money": {
            "profits": "0",
            "losts": "10000",
          },
          "type": [
            "10",
            "November",
            "2020"
          ],
        },
        {
          "detail": "ปล้นโจรคืน",
          "money": {
            "profits": "10000",
            "losts": "0",
          },"total":{ "income" : "0", "expense" : "0" },
          "type": [
            "11",
            "November",
            "2020"
          ],
        }]
      }

      commit("fetch", { res })
    },
    addMemo({ commit }, payload) {
      // todo: call api to add data
      commit("add", { payload })
    },
  },

  modules: {},
})
