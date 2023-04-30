<template>
  <div class="page login-page">
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="nav">
      <van-tabs v-model="active">
        <van-tab title="密码登录">
          <van-form @submit="onLogin">
            <van-field
              v-model="phone"
              type="text"
              name="phone"
              label="手机号码"
              placeholder="请输入手机号码"
              :rules="rules.phone"
            />
            <van-field
              v-model="password"
              type="password"
              name="password"
              label="登录密码"
              placeholder="请输入密码"
              :rules="rules.password"
            />
            <div style="margin: 16px">
              <van-button round block type="info" native-type="submit"
                >提交</van-button
              >
            </div>
          </van-form>
        </van-tab>
        <van-tab title="短信登录"></van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import http from "@/request/request.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      active: "",
      phone: "",
      password: "",
      rules: {
        phone: [
          { required: true, message: "手机号不能为空" },
          { pattern: /^1[3-9]\d{9}$/, message: "请输入11位的手机号码" },
        ],
        password: [
          { required: true, message: "密码不能为空" },
          { pattern: /^\d{4,}$/, message: "密码不能少于4位" },
        ],
      },
    };
  },

  methods: {
    async onLogin({ phone, password }) {
      // console.log(values);
      try {
        const res = await http.login(phone, password);
        this.login(res);
        // 登录成功获取我的书架信息
        const myShelf = await http.getMyShelf(res.Id);
        // 再次更新书架
        this.updateShelf(myShelf);
        this.$toast.success({
          message: "登录成功",
          onClose: () => {
            this.$router.back();
          },
        });
      } catch (err) {
        this.$toast.fail("登录失败哟" + err);
      }
    },
    ...mapMutations({
      login: "login",
      updateShelf: "updateShelf",
    }),
  },
};
</script>
<style scoped lang="less"></style>
