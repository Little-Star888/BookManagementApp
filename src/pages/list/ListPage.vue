<template>
  <div class="page list-page">
    <van-nav-bar
      title="图书列表"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="page-body">
      <template v-if="books.length > 0">
        <van-card
          :thumb="item.Book.Image"
          v-for="item in books"
          :key="item.Book.Id"
          @click-thumb="onDetail(item.Book)"
        >
          <template #title>
            <p class="item-title">{{ item.Book.Name }}</p>
          </template>
          <template #desc>
            <p>{{ item.Book.Author.Name }}</p>
            <p>{{ item.Book.PublishDate }}</p>
            <p>{{ item.Book.Publisher.Name }}</p>
          </template>
          <template #footer>
            <van-button type="danger" size="mini">加入书架</van-button>
          </template>
        </van-card>
      </template>
      <van-empty description="没有匹配的数据哟" v-else></van-empty>
    </div>
  </div>
</template>
<script>
import http from "@/request/request";
export default {
  data() {
    return {
      books: [],
    };
  },
  methods: {
    // 点击图书图片跳转详情页
    onDetail(book) {
      // console.log(book.Id);
      this.$router.push({ name: "detail", params: { id: book.Id } }); ///detail?id=   /detail/xxxx
    },
    // 获取图书
    async getBooks() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      const { keyword } = this.$route.query;
      try {
        const res = await http.book({ keyword });
        // console.log(res);
        // console.log(keyword);
        this.books = res;
      } catch (err) {
        this.$toast.fail("加载失败" + err);
      } finally {
        this.$toast.clear();
      }
    },
  },
  mounted() {
    this.getBooks();
  },
};
</script>
<style scoped lang="less">
.van-card {
  .item-title {
    color: blue;
    font-weight: bolder;
    font-size: 16px;
    margin-bottom: 10px;
  }
  .van-button {
    background-color: #4aa53b;
    border: none;
  }
}
</style>
