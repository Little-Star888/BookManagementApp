import axios from "axios";
axios.defaults.baseURL = "http://139.9.209.237/librarywebapi";
// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 在发送请求之前做些什么
    const { Code, Message, Data } = response.data;
    // console.log(response.data);
    if (Code === 100) {
      return Data;
    }
    return Promise.reject(Message);
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject("请求服务器错误" + error);
  }
);
// 导出各请求方法
export default {
  // 请求轮播图片数据
  getSwipe() {
    return axios.get("/advert/list");
  },
  // 请求图书数据
  getCategory() {
    return axios.get("/section/list");
  },
  // 分类页面请求图书分类标题数据
  category() {
    return axios.get("/category/list");
  },
  // 分类页面请求图书详情数据
  book({ categoryId = "", keyword = "" }) {
    return axios.get("/book/list", { params: { categoryId, keyword } });
  },
  // 获取图书细节
  datail(id) {
    return axios.get("/book/single", { params: { id } });
  },
  //验证登录
  login(phone, password) {
    return axios.post("/member/login", { phone, password });
  },
  // 加入借书架
  addShelf(readerId, bookId) {
    return axios.get("/Transaction/AddBookShelf", {
      params: { readerId, bookId },
    });
  },
  // 移出借书架中的单项
  removeItemFromShelf(readerId, bookId) {
    return axios.get("/Transaction/RemoveBookFromShelf", {
      params: { readerId, bookId },
    });
  },
  // 清空借书架
  clearShelf(readerId) {
    return axios.get("/Transaction/RemoveMyShelf", { params: { readerId } });
  },
  // 提交借阅
  submit(readerId) {
    return axios.post("/Transaction/SubmitOrder", { readerId });
  },
  // 我的借书架
  getMyShelf(readerId) {
    return axios.get("/Transaction/GetMyShelf", { params: { readerId } });
  },
  // 获取借阅记录
  getMyRecord(readerId) {
    return axios.get("/Transaction/GetBorrowRecords", { params: { readerId } });
  },
  // 取消借阅
  cancelBorrow(orderId, readerId) {
    return axios.post("/Transaction/CancelOrder", { orderId, readerId });
  },
  // 确认收到图书
  confirmReciveBook(orderId, readerId) {
    return axios.post("/Transaction/ConfirmOrder", { orderId, readerId });
  },
};
