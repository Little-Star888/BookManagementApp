<template>
  <div class="page search-page">
    <van-nav-bar
      title="搜索图书"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="page-body">
      <van-search
        v-model="keyword"
        shape="round"
        show-action
        background="#f2f2f2"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
      <div v-if="size > 0" class="history-list">
        <van-cell
          :to="{ path: '/list', query: { keyword: item } }"
          :title="item"
          v-for="item in histories"
          :key="item"
        >
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="cross" @click="onRemove(item)" />
          </template>
        </van-cell>
        <div class="clear-box">
          <van-button
            round
            type="info"
            size="normal"
            color="#ea9705"
            @click="onClear"
            >清空搜索历史</van-button
          >
        </div>
      </div>
      <van-empty v-else description="无历史记录"></van-empty>
    </div>
  </div>
</template>
<script>
import storages from "../../untils/storage.js";
export default {
  data() {
    return {
      keyword: "",
      histories: [],
    };
  },
  computed: {
    size() {
      return this.histories.length;
    },
  },
  methods: {
    // 删除单项
    onRemove(keyword) {
      this.histories = storages.removeHistory(keyword);
    },
    // 清空历史记录
    onClear() {
      this.histories = storages.clearHistory();
    },
    // 搜索
    onSearch() {
      // console.log(this.keyword);
      this.histories = storages.saveStorages(this.keyword);
      this.$router.push({ path: "/list", query: { keyword: this.keyword } });
      // console.log("/list?keyword=" + this.keyword);
      // name====param,,,path=======query
    },
  },
  created() {
    this.histories = storages.getStorages();
  },
};
</script>

<style scoped lang="less">
/deep/.van-nav-bar {
  .van-icon-arrow-left {
    // font-weight: bolder;
    color: red;
  }
  .van-nav-bar__text {
    color: aquamarine;
  }
}
.van-search__action {
  color: purple;
}
.van-search__content {
  background-color: #113eff85;
}
.clear-box {
  text-align: center;
  margin-top: 10px;
}
</style>
