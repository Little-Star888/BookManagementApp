<template>
  <!-- 分类页面外层容器 -->
  <div class="page category-page">
    <!-- 标题栏 -->
    <van-nav-bar title="分类" />
    <!-- 主体内容 -->
    <div class="page-body">
      <!-- 左侧导航栏 -->
      <div class="left">
        <!-- 左侧导航栏组件 -->
        <van-sidebar v-model="activeIndex" @change="onChange">
          <!-- 循环遍历 categories 数组，并渲染到左侧导航栏中 -->
          <van-sidebar-item
            v-for="item in categories"
            :key="item.Id"
            :title="item.Name"
          />
        </van-sidebar>
      </div>
      <!-- 右侧图书分类详情 -->
      <div class="right">
        <!-- 图书分类九宫格 -->
        <div class="bookList">
          <!-- 如果 books 数组为空，则显示无数据提示 -->
          <van-empty description="无数据" v-if="size === 0" />
          <!-- 循环遍历 books 数组，并渲染到图书分类九宫格中 -->
          <van-grid v-else :border="false" :column-num="3">
            <van-grid-item
              v-for="item in books"
              :key="item.Book.Id"
              :to="{ name: 'detail', params: { id: item.Book.Id } }"
            >
              <!-- 显示图书封面图片 -->
              <van-image :src="item.Book.Image" />
              <!-- 显示图书名称 -->
              <p>{{ item.Book.Name }}</p>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/request/request";
export default {
  data() {
    return {
      // 当前选中的分类索引，默认为 0
      activeIndex: 0,
      // 所有图书分类数据，初始为空数组
      categories: [],
      // 当前分类下的所有图书数据，初始为空数组
      books: [],
    };
  },
  computed: {
    // 计算属性，返回当前 books 数组的长度
    size() {
      return this.books.length;
    },
  },
  methods: {
    // 改变图书分类时触发
    onChange() {
      // 获取当前选中的分类 ID
      const categoryId = this.categories[this.activeIndex].Id;
      // 打印 activeIndex 的值
      console.log("activeIndex:", this.activeIndex);
      // 根据分类 ID 获取该分类下的图书列表数据
      this.getBooks(categoryId);
    },

    // 获取所有图书分类数据
    async getCategories() {
      try {
        // 发送请求，获取所有图书分类数据
        const res = await http.category();
        // 在数组开头添加一个"全部"分类
        res.unshift({ id: "", Name: "全部" });
        // 将获取到的分类数据保存到 categories 数组中
        this.categories = res;
      } catch (err) {
        // 如果请求出错，则在控制台输出错误信息
        console.log(err);
      }
    },

    // 获取指定分类下的所有图书数据
    async getBooks(categoryId = "") {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        loadingType: "spinner",
      });
      try {
        // 发送请求，获取指定分类下的所有图书数据
        const res = await http.book({ categoryId });
        // 将获取到的图书数据保存到 books 数组中
        this.books = res;
      } catch (err) {
        // 如果请求出错，则显示错误提示信息
        this.$toast.fail("加载失败" + err);
      } finally {
        this.$toast.clear();
      }
    },
  },

  // 组件挂载后自动执行的钩子函数
  mounted() {
    // 获取所有图书分类数据，并保存到 categories 数组中
    this.getCategories();
    // 获取默认分类下的所有图书数据，并保存到 books 数组中
    this.getBooks();
  },
};
</script>
<style scoped lang="less">
.category-page {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.page-body {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  .left {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .right {
    flex: 1;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.van-sidebar {
  width: 100px;
}

.bookList {
  .van-grid {
    .van-image {
      padding: 0 10px;
    }
    p {
      margin: 10px;
      color: #666;
      font-size: 10px;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      width: 50px;
    }
  }
}
</style>
