<template>
  <div class="page detail-page">
    <van-nav-bar
      title="图书详情"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="page-body">
      <div class="book-coverImage">
        <van-card :desc="Author" :title="Book" :thumb="ImageUrl" />
      </div>
      <div class="book-publisher">
        <van-cell-group>
          <van-cell title="出版信息" size="large" />
          <van-cell title="出版社" :value="Publisher" />
          <van-cell title="出版日期" :value="PublishDate" />
          <van-cell title="ISBN" :value="ISBN" />
          <van-cell title="分类" :value="category" />
        </van-cell-group>
      </div>
      <div class="book-description">
        <van-cell-group>
          <van-cell title="简介" size="large" />
          <div class="content">
            {{ Introduce }}
          </div>
        </van-cell-group>
      </div>
      <div class="bottom">
        <van-goods-action>
          <van-goods-action-icon
            icon="bag-o"
            text="书架"
            :badge="size"
            color="red"
            to="/main/bookshelf"
          />
          <van-goods-action-button
            type="danger"
            :text="buttonText"
            @click="onAddCart"
          />
        </van-goods-action>
      </div>
    </div>
  </div>
</template>
<script>
import http from "@/request/request";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      details: {},
    };
  },
  computed: {
    buttonText() {
      if (!this.user) {
        return "请登录";
      }
      if (this.details.Number === 0) {
        return "无库存";
      }
      if (this.details.Book) {
        const index = this.shelf.findIndex(
          (item) => item.Book.Id === this.details.Book.Id
        );
        if (index !== -1) {
          return "已借阅";
        }
      }
      return "加入借书架";
    },
    ImageUrl() {
      return this.details.Book?.Image;
    },
    Author() {
      return this.details.Book?.Author.Name;
    },
    PublishDate() {
      return this.details.Book?.PublishDate;
    },
    ISBN() {
      return this.details.Book?.ISBN;
    },
    category() {
      return this.details.Book?.Category.Name;
    },
    Book() {
      return this.details.Book?.Name;
    },
    Publisher() {
      return this.details.Book?.Publisher.Name;
    },
    Introduce() {
      return this.details.Book?.Introduce;
    },
    size() {
      return this.shelf.length;
    },
    ...mapState({
      user(state) {
        return state.user;
      },
      shelf(state) {
        return state.shelf;
      },
    }),
  },
  methods: {
    async onAddCart() {
      // 1-检查能否借阅
      // 1-1 检查是否登录
      if (!this.user) {
        this.$toast({
          message: "请登录",
          onClose: () => {
            this.$router.push("/login");
          },
        });
        return;
      }
      // 1-2 检查库存
      if (this.details.Number === 0) {
        this.$toast("此书都被借光啦");
        return;
      }
      // 1-3 检查是否借过
      const index = this.shelf.findIndex(
        (item) => item.Book.Id === this.details.Book.Id
      );
      if (index !== -1) {
        return this.$toast("该书已借阅");
      }
      // 2-正式借阅
      try {
        const res = await http.addShelf(this.user.Id, this.details.Book.Id);
        console.log(res);
        this.addShelf(this.details);
        this.$toast.success("借阅成功啦");
      } catch (err) {
        this.$toast.fail("借阅失败咯" + err);
      }
    },

    // 获取图书详情
    async getBookDetail() {
      const { id } = this.$route.params;
      console.log(id+'777777777777777');
      try {
        const res = await http.datail(id);
        this.details = res;
        // console.log(id);
        // console.log(res);
        // console.log(this.details.Book.Name);
      } catch (err) {
        this.$toast.fail("加载失败啦" + err);
      }
    },
    ...mapMutations({
      addShelf: "addShelf",
    }),
  },
  mounted() {
    this.getBookDetail();
  },
};
</script>
<style scoped lang="less">
.page-body {
  margin-bottom: 50px;
}
.book-coverImage {
  .van-card__title {
    font-size: 16px;
    font-weight: bolder;
    color: blue;
    margin-bottom: 10px;
    margin-left: 20px;
  }
  .van-card__desc {
    color: red;
    margin-left: 20px;
  }
}
.book-publisher {
  margin-bottom: 10px;
}
.book-description {
  .content {
    text-indent: 2em;
    color: #666;
    overflow: hidden;
  }
}
</style>
