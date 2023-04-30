<template>
  <div class="flash-page">
    <!-- 内容 -->
    <!-- 跳过图标和背景图片 -->
    <van-button
      @click="onJump"
      round
      type="info"
      size="small"
      color="blue"
      v-if="durations <= 6"
      >跳过</van-button
    >
    <van-button round type="info" size="small" color="orange"
      >{{ durations }}s</van-button
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      durations: 9,
    };
  },
  methods: {
    onJump() {
      this.$router.replace("main");
      clearInterval(this.timer);
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      this.durations--;
      if (this.durations === 0) {
        this.onJump();
      }
    }, 1000);
  },
};
</script>
<style scoped lang="less">
.flash-page {
  height: 100%;
  overflow: hidden;
  position: relative;
  background: url("../../assets/images/lake.jpeg") no-repeat !important;
}
.van-button:nth-last-of-type(1) {
  width: 50px;
  position: absolute;
  right: 60px;
  top: 10px;
}
.van-button:nth-last-of-type(2) {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
