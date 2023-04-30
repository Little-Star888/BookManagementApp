<template>
  <div class="page login-page">
    <van-nav-bar
      title="订单详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="page-body">
      <!-- 1-未登录，显示未登录 -->
      <div class="no-login" v-if="!user">
        <van-button type="info" to="/login" size="large" round
          >请登录</van-button
        >
      </div>
      <div class="log-in" v-else>
        <van-tabs v-model="active">
          <van-tab title="当前借阅">
            <van-empty description="无数据" v-if="size2 === 0"></van-empty>

            <van-card
              v-for="item in currentRecords"
              :key="item.Id"
              :desc="item.AuthorName"
              :title="item.BookName"
              :thumb="item.BookImage"
              v-else
              @click="onDetail(item)"
            >
              <template #footer>
                <van-button
                  @click="onClickItem(item)"
                  :disabled="item.State === 3"
                  :type="
                    item.State === 1
                      ? 'primary'
                      : item.State === 2
                      ? 'info'
                      : 'warning'
                  "
                  size="mini"
                  >{{
                    item.State === 1
                      ? "取消"
                      : item.State === 2
                      ? "确认"
                      : "借阅中"
                  }}</van-button
                >
              </template>
            </van-card>
          </van-tab>
          <van-tab title="借阅记录">
            <van-empty description="无数据" v-if="size === 0"></van-empty>
            <van-card
              v-for="item in historyRecords"
              :key="item.Id"
              :desc="item.AuthorName"
              :title="item.BookName"
              :thumb="item.BookImage"
              v-else
            >
              <template #footer>
                <van-button type="danger" size="mini">好看不</van-button>
              </template>
            </van-card>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/request/request";
import { mapState } from "vuex";
export default {
  data() {
    return {
      active: 0,
      records: [],
    };
  },
  computed: {
    size() {
      return this.historyRecords.length;
    },
    size2() {
      return this.currentRecords.length;
    },
    currentRecords() {
      return this.records.filter((item) => item.State > 0 && item.State < 4);
    },
    historyRecords() {
      return this.records.filter((item) => item.State === 4);
    },
    ...mapState({
      user(state) {
        return state.user;
      },
    }),
  },
  methods: {
    // 点击图书图片跳转详情页
    onDetail(book) {
      console.log(book);
      this.$router.push({ name: "detail", params: { id: book.BookId } }); ///detail?id=   /detail/xxxx
    },
    // 取消借阅
    cancel(book) {
      // 提示确认一下
      this.$confirm({
        title: "取消",
        message: "确定取消借阅吗？",
      })
        // 请求服务器
        .then(async () => {
          await http.cancelBorrow(book.Id, this.user.Id);
          book.State = 0;
          // 更新本地
          this.$toast.success({
            message: "已取消借阅",
            onClose: () => {
              // console.log("666");
            },
          });
        });
    },
    // 确认收到图书
    confirm(book) {
      // 提示确认一下
      this.$confirm({
        title: "确认",
        message: "确定收到书了吗？",
      })
        // 请求服务器
        .then(async () => {
          await http.confirmReciveBook(book.Id, this.user.Id);
          book.State = 3;
          // 更新本地
          this.$toast.success({
            message: "签收成功",
            onClose: () => {
              // console.log("666");
            },
          });
        });
    },
    // 操作当前借阅的单项
    onClickItem(book) {
      // 1-取消借阅
      if (book.State === 1) {
        this.cancel(book);
        // 2-确认收到图书
      } else {
        this.confirm(book);
      }
    },
    // 获取借阅记录
    async getRecord() {
      if (!this.user) return;
      try {
        // console.log(this.user.Id + "666666666666");
        const res = await http.getMyRecord(this.user.Id);
        // console.log(res);
        this.records = res;
      } catch (err) {
        this.$toast.fail("加载失败了啦" + err);
      }
    },
  },
  mounted() {
    this.getRecord();
  },
};
</script>
<style scoped lang="less">
.nav {
  .van-tabs {
    margin-bottom: 50px;
  }
}
</style>
