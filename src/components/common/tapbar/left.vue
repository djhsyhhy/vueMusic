<template>
  <div class="left">
    <a href="#">
      <img src="~assets/img/common/logo.png" alt="404" />
    </a>
    <span style="fontsize: 13px" v-if="currentUserInfo">{{
      currentUserInfo.nickname
    }}</span>
    <el-button type="text" @click="dialogFormVisible = true" style="color: #fff" v-if="currentUserInfo == null"
      >登录</el-button
    >
    <el-button
      @click="logout"
      v-if="currentUserInfo !== null"
      size="mini"
      style="margin-top: 10px; margin-left: 15px"
      >退出</el-button
    >
    <el-dialog title="请登录" :visible.sync="dialogFormVisible" width="20%">
      <img
        src="~assets/img/login/phone.png"
        style="display: block; margin: 10px auto; width: 18%"
        alt
      />
      <el-form :model="form" :rules="loginInfoRules">
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input
            v-model="form.password"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPhoneLogin,
  getPhoneLoginOut,
  getUserSonglist,
} from "network/login";
import { USER_SONGLIST } from "@/store/mutationType";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        phone: "13479636407",
        password: "kzj2372966718",
      }, // 默认给个数据，方便测试
      loginInfoRules: {
        phone: [{ required: true, message: " ", trigger: "blur" }],
        password: [{ required: true, message: " ", trigger: "blur" }],
      }, // 登录格式的校验
      formLabelWidth: "80px", //登录内输入框的宽度
      userImg: require("assets/img/common/logo.png"), //默认
      currentUserInfo:  window.localStorage.getItem("currentUserInfo") === "null"
          ? null
          : JSON.parse(window.localStorage.getItem("currentUserInfo"))//查看浏览器是否已存有数据
    };
  },
  computed: {
    // currentUserInfo() {
    //   return window.localStorage.getItem("currentUserInfo") === "null"
    //       ? null
    //       : JSON.parse(window.localStorage.getItem("currentUserInfo"))//查看浏览器是否已存有数据
    // }
  },
  methods: {
    
    confirmLogin() {
      this.getPhoneLogin(this.form.phone, this.form.password);
    },
    getPhoneLogin(phone, pwad) {
      getPhoneLogin(phone, pwad).then((res) => {
        // console.log(res);
        //信息不符时
        if (res === undefined) {
          //登录框不消失
          this.dialogFormVisible = true;
          //弹出提示信息
          this.$toast.show("该手机号码不存在或未注册", 2000);
          return;
        }
        //其他错误时
        if (res.code !== 200) {
          this.dialogFormVisible = true;
          //提示对应的错误信息
          this.$toast.show(res.message, 2000);
          // console.log(res.message);
          return;
        }
        //保存cookie的信息
        // window.localStorage.setItem("musicCookie", res.cookie);
        //保存用户信息,退出时删除
        window.localStorage.setItem(
          "currentUserInfo",
          JSON.stringify(res.profile)
        );
        //放入用户的信息 图片 登录框禁止 提示
        this.currentUserInfo = res.profile;
        this.userImg = this.currentUserInfo.avatarUrl;
        this.dialogFormVisible = false;
        this.$toast.show(`欢迎你${this.currentUserInfo.nickname}`, 2000);
        this.getUserSonglist(this.currentUserInfo.userId);
      });
    },
    //获取用户的歌单 放到vuex上
    getUserSonglist(userId) {
      getUserSonglist(userId).then((res) => {
        // console.log(res.playlist);
        this.$store.commit(USER_SONGLIST, res.playlist);
      });
    },
    //退出接口登录 告诉接口已退出 并还原数据等操作
    getPhoneLoginOut() {
      getPhoneLoginOut().then((res) => {
        console.log(res);
        //当前用户信息设置为null
        this.currentUserInfo = null;
        //存储用户信息的localstorage设置为null
        window.localStorage.setItem("currentUserInfo", null);
        this.userImg = require("assets/img/common/logo.png");
        this.$store.commit(USER_SONGLIST, []);
      });
    },
    //退出登录
    logout() {
      console.log("退出登录");
      //跳转到主页面
      this.$router.push("/home/rtstyle");
      this.getPhoneLoginOut();
    },
  },
};
</script>

<style scoped>
.left {
  margin-left: 20px;
  margin-top: 10px;
}
.left a > img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.left a {
  font-size: 14px;
  color: white;
  text-decoration: none;
  vertical-align: middle;
  margin-right: 5px;
}
</style>