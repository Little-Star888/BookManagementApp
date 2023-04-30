<template>
  <div class="page home-page">
    <!-- 标题栏 -->
    <van-nav-bar title="主页" />
    <!-- 主体内容 -->
    <div class="page-body">
      <!-- 搜索框 -->
      <div class="search">
        <router-link to="/search">
          <van-search
            v-model="value"
            placeholder="请输入要搜索的图书"
            input-align="center"
            shape="round"
          />
        </router-link>
      </div>
      <div class="loading" v-if="loading">
        <van-loading type="spinner" color="#1989fa" />
      </div>
      <!-- 轮播 -->
      <div class="bookSwipe">
        <van-swipe :autoplay="3000">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <router-link to="/">
              <img v-lazy="image.Image" />
            </router-link>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!-- 图书部分 -->
      <div class="book" v-for="book in books" :key="book.Id">
        <!-- 图书分类标题 -->
        <div class="bookCategory">
          <van-cell :title="book.Name" is-link to="/" />
        </div>
        <!-- 图书分类九宫格 -->
        <div class="bookList">
          <van-grid :border="false" :column-num="3">
            <van-grid-item
              v-for="item in book.Books"
              :key="item.Book.Id"
              :to="{ name: 'detail', params: { id: item.Book.Id } }"
            >
              <van-image :src="item.Book.Image" />
              <p>{{ item.Book.Name }}</p>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from "../../request/request.js";
export default {
  data() {
    return {
      images: [],
      books: [],
      value: "",
      loading: true,
    };
  },
  methods: {
    async getSwipeImage() {
      try {
        const res = await http.getSwipe();
        this.images = res;
        this.loading = false;
      } catch (err) {
        this.$toast.fail("请求失败" + err);
      }
    },
    async getBookCategory() {
      try {
        const res = await http.getCategory();
        this.books = res;
      } catch (err) {
        this.$toast.fail("请求失败" + err);
      }
    },
  },
  mounted() {
    this.getSwipeImage();
    this.getBookCategory();
  },
};
</script>
<style scoped lang="less">
.bookSwipe {
  .van-swipe {
    height: 42vw;
    img {
      display: block;
      width: 100%;
    }
  }
}
.bookList {
  .van-grid {
    .van-image {
      padding: 0 10px;
    }
    p {
      color: #666;
      margin: 10px;
      height: 36px;
      line-height: 18px;
    }
  }
}
</style>
