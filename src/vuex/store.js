import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import storage from "@/untils/storage";
const store = new Vuex.Store({
  state() {
    return {
      user: storage.getUser(),
      shelf: storage.getShelf(),
    };
  },
  mutations: {
    login(state, payload) {
      state.user = payload;
      storage.loginSave(state.user);
    },
    logout(state) {
      state.user = null;
      storage.logoutDel();
    },
    // 加入借书架
    addShelf(state, payload) {
      state.shelf.push(payload);
      // 更新书架
      storage.updateShelf(state.shelf);
    },
    // 退出登录再次登录重新更新书架
    updateShelf(state, payload) {
      state.shelf = payload;
      storage.updateShelf(state.shelf);
    },
    // 移除一项
    removeShelf(state, payload) {
      const index = state.shelf.findIndex(
        (item) => item.Book.Id === payload.Book.Id
      );
      if (index !== -1) {
        state.shelf.splice(index, 1);
      }
      storage.updateShelf(state.shelf);
    },
    // 清空书架
    clearShelf(state) {
      state.shelf = [];
      storage.clearShelf();
    },
  },
});
export default store;
