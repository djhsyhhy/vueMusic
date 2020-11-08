<template>
  <div class="left">
    <a href="#">
      <img src="~assets/img/common/logo.png" alt="404" />
    </a>
    <!-- <span >这个是登录之后显式的 这个将那个给覆盖</span> -->
    <el-button type="text" @click="dialogFormVisible = true" style="color: #fff"
      >登录</el-button
    >
    <!-- <el-button > 这个是登录上之后退出的按钮</el-button> -->
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
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
    };
  },
};
</script>

<style scoped>
.left {
   margin-left: 20px;
  margin-top: 10px;
}
.left a>img {
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