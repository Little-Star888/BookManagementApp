<template>
  <div class="page personal-page">
    <van-nav-bar
      title="个人中心"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="loginout">
      <van-button type="primary" size="large" @click="onLogout"
        >退出登录</van-button
      >
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    onLogout() {
      this.logout();
      this.clearShelf();
      this.$router.back();
    },
    ...mapMutations({
      logout: "logout",
      clearShelf: "clearShelf",
    }),
  },
};
</script>
<style scoped lang="less">
.loginout {
  .van-button {
    margin-top: 10px;
  }
}
</style>
