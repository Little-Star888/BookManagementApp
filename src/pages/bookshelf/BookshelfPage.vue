<template>
  <div class="page bookshelf-page">
    <!-- 标题栏 -->
    <van-nav-bar title="书架" right-text="清空" @click-right="onClear">
    </van-nav-bar>
    <!-- 主体内容 -->
    <div class="page-body">
      <!-- 1-未登录，显示未登录 -->
      <div class="no-login" v-if="!user">
        <van-button type="info" to="/login" size="large" round
          >请登录</van-button
        >
      </div>
      <!-- 2-已登录，未选择图书，显示无数据 -->
      <div class="login" v-else>
        <van-empty description="无数据" v-if="size === 0"></van-empty>
        <!-- 3-已登录，有图书，正常显示图书列表 -->

        <div v-else>
          <van-swipe-cell v-for="item in cloneShelf" :key="item.Book.Id">
            <div class="cell-item">
              <van-checkbox
                v-model="item.checked"
                @click="onItemSelected(item)"
              ></van-checkbox>
              <van-card
                :desc="item.Book.PublishDate"
                :title="item.Book.Name"
                class="goods-card"
                :thumb="item.Book.Image"
                @click="onDetail(item.Book)"
              />
            </div>

            <template #right>
              <van-button
                square
                text="删除"
                type="danger"
                class="delete-button"
                @click="onRemoveItem(item)"
              />
            </template>
          </van-swipe-cell>

          <van-submit-bar button-text="提交借阅" @submit="onSubmit">
            <van-checkbox v-model="checked" @click="onSelectedAll"
              >全选</van-checkbox
            >
          </van-submit-bar>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import http from "@/request/request";
export default {
  data() {
    return {
      checked: false,
      cloneShelf: [],
    };
  },
  computed: {
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
    // 图书详情页
    onDetail(book) {
      // console.log(book.Id);
      this.$router.push({ name: "detail", params: { id: book.Id } }); ///detail?id=   /detail/xxxx
    },
    // 反选
    onItemSelected(item) {
      console.log(item);
      this.checked =
        this.cloneShelf.length ===
        this.cloneShelf.filter((item) => item.checked).length;
    },
    // 全选
    onSelectedAll() {
      this.cloneShelf.forEach((item) => (item.checked = this.checked));
    },
    // 清空
    onClear() {
      // 提示确认一下
      this.$confirm({
        title: "清空借书架",
        message: "确定清空借书架吗？",
      })
        // 请求服务器清空
        .then(async () => {
          await http.clearShelf(this.user.Id);
          // 更新本地
          this.$toast.success({
            message: "清除成功",
            onClose: () => {
              this.clearShelf();
              this.cloneShelf = [];
            },
          });
        });
    },
    // 移除单项
    async onRemoveItem(item) {
      try {
        // 先删除服务器
        await http.removeItemFromShelf(this.user.Id, item.Book.Id);
        this.$toast.success({
          message: "删除成功",
          onClose: () => {
            // 再删除本地
            this.removeShelf(item);
            const index = this.cloneShelf.findIndex(
              (it) => it.Book.Id === item.Book.Id
            );
            if (index !== -1) {
              this.cloneShelf.splice(index, 1);
            }
          },
        });
      } catch (err) {
        this.$toast.fail("删除失败" + err);
      }
    },
    ...mapMutations({
      removeShelf: "removeShelf",
      clearShelf: "clearShelf",
    }),
    // 提交
    onSubmit() {
      // 提示确认一下
      this.$confirm({
        title: "提交借阅",
        message: "确定提交吗？",
      })
        // 请求服务器清空
        .then(async () => {
          await http.submit(this.user.Id);
          // 更新本地
          this.$toast.success({
            message: "提交成功",
            onClose: () => {
              this.clearShelf();
              this.cloneShelf = [];
            },
          });
        });
    },
  },
  created() {
    // 克隆一份借书架的数据
    this.cloneShelf = this.shelf.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
  },
};
</script>
<style scoped lang="less">
.page-body {
  margin-bottom: 50px;
}
.no-login {
  margin-top: 16px;
  text-align: center;
}
.goods-card {
  margin: 0;
  background-color: white;
}
.delete-button {
  height: 100%;
}
.cell-item {
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.van-submit-bar {
  bottom: 50px;
  /deep/ .van-submit-bar__bar {
    justify-content: space-between;
  }
}
</style>
