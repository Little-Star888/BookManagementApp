const HISTORY = "HISTORY";
const USER = "USER";
const SHELF = "SHELF";
export default {
  // 获取历史记录
  getStorages() {
    return JSON.parse(localStorage.getItem(HISTORY)) || [];
  },
  // 追加历史记录
  saveStorages(keyword) {
    const histories = this.getStorages();
    const index = histories.findIndex((item) => item === keyword);
    // 等于-1说明存在，就删掉
    if (index !== -1) {
      // 就删掉
      histories.splice(index, 1);
    }
    // 不存在就添加
    histories.unshift(keyword);
    localStorage.setItem(HISTORY, JSON.stringify(histories));
    return histories;
  },
  // 移除历史记录
  removeHistory(keyword) {
    const histories = this.getStorages();
    const index = histories.findIndex((item) => item === keyword);
    // 等于-1说明存在，就删掉
    if (index !== -1) {
      // 就删掉
      histories.splice(index, 1);
    }
    // 不存在就添加
    localStorage.setItem(HISTORY, JSON.stringify(histories));
    return histories;
  },
  // 清空历史记录
  clearHistory() {
    localStorage.removeItem(HISTORY);
    return [];
  },
  // 从本地读取用户信息
  getUser() {
    return JSON.parse(localStorage.getItem(USER));
  },
  // 登录时保存用户信息
  loginSave(user) {
    localStorage.setItem(USER, JSON.stringify(user));
  },
  // 注销时清除用户信息
  logoutDel() {
    localStorage.removeItem(USER);
  },
  // 获取本地图书架信息
  getShelf() {
    return JSON.parse(localStorage.getItem(SHELF)) || [];
  },

  // 更新本地书架
  updateShelf(shelf) {
    localStorage.setItem(SHELF, JSON.stringify(shelf));
  },
  clearShelf() {
    localStorage.removeItem(SHELF);
  },
};
