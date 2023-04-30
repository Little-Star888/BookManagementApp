<template>
  <div class="main-page">
    <div class="content">
      <router-view></router-view>
    </div>
    <van-tabbar
      v-model="active"
      active-color="blue"
      inactive-color="orange"
      :fixed="false"
      :route="true"
    >
      <van-tabbar-item icon="wap-home" :to="{ name: 'home' }"
        >主页</van-tabbar-item
      >
      <van-tabbar-item icon="bars" :to="{ name: 'category' }"
        >分类</van-tabbar-item
      >
      <van-tabbar-item
        icon="coupon"
        :badge="size"
        :to="{ path: '/main/bookshelf' }"
        >书架</van-tabbar-item
      >
      <van-tabbar-item icon="manager-o" :to="{ name: 'mine' }"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      active: 0,
    };
  },
  computed: {
    size() {
      return this.shelf.length;
    },
    ...mapState({
      shelf(state) {
        return state.shelf;
      },
    }),
  },
};
</script>

<style scoped lang="less">
.main-page {
  height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow: hidden;
}

/deep/.van-nav-bar {
  background-color: skyblue;
  .van-nav-bar__title {
    color: rgb(255, 191, 0);
    font-weight: bolder;
    font-size: 20px;
  }
}
</style>
