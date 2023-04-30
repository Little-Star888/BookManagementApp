<template>
  <div class="page mine-page">
    <!-- 标题栏 -->
    <van-nav-bar title="我的" />
    <!-- 主体内容 -->
    <div class="page-body">
      <div class="header-image">
        <router-link :to="path">
          <van-image round width="90px" height="90px" :src="header" />
          <div class="nickName">{{ nickName }}</div>
        </router-link>
      </div>
      <div class="feature">
        <van-grid :column-num="4">
          <van-grid-item
            icon="shopping-cart-o"
            text="我的借阅"
            dot
            @click="$router.push('/record')"
          />
          <van-grid-item icon="home-o" text="我的地址" />
          <van-grid-item icon="apps-o" text="我的收藏" />
          <van-grid-item icon="chat-o" text="我的消息" />
          <van-grid-item icon="gold-coin-o" text="我要打赏" />
          <van-grid-item icon="bulb-o" text="我要投诉" />
          <van-grid-item icon="refund-o" text="我要充值" />
          <van-grid-item icon="desktop-o" text="软件反馈" />
          <van-grid-item icon="service-o" text="专属客服" />
          <van-grid-item icon="friends-o" text="关于我们" />
          <van-grid-item icon="replay" text="检查更新" />
          <van-grid-item icon="setting-o" text="设置" />
        </van-grid>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import myheader from "@/assets/images/my.jpg";
export default {
  data() {
    return {};
  },
  computed: {
    header() {
      return this.user
        ? this.user.Header
        : // : "https://img1.baidu.com/it/u=3834820558,1776972742&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400";
          myheader;
    },
    nickName() {
      return this.user ? this.user.Name : "未登录";
    },
    path() {
      return this.user ? "/personal" : "/login";
    },
    ...mapState({
      user(state) {
        return state.user;
      },
    }),
  },
};
</script>
<style scoped lang="less">
.header-image {
  height: 50vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .nickName {
    text-align: center;
    margin-top: 10px;
  }
}
.feature {
  margin-top: 20px;
}
</style>
