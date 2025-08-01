<template>
  <div class="login">
    <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
      <h3 class="title">{{ title }}</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          size="large"
          auto-complete="off"
          placeholder="账号"
        >
          <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          size="large"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input
          v-model="loginForm.code"
          size="large"
          auto-complete="off"
          placeholder="验证码"
          style="width: 63%"
          @keyup.enter="handleLogin"
        >
          <template #prefix><svg-icon icon-class="validCode" class="el-input__icon input-icon" /></template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" class="login-code-img"/>
        </div>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          :loading="loading"
          size="large"
          type="primary"
          style="width:100%;"
          @click.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <div style="float: right;" v-if="register">
          <router-link class="link-type" :to="'/register'">立即注册</router-link>
        </div>
      </el-form-item>
    </el-form>
    <div class="el-login-footer">
      <span>Copyright © 2018-2025  All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue"
import { getCurrentInstance } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getCodeImg } from "@/api/login"
import Cookies from "js-cookie"
import { encrypt, decrypt } from "@/utils/jsencrypt"
import useUserStore from '@/store/modules/user'

const title = import.meta.env.VITE_APP_TITLE
const userStore = useUserStore()
const route = useRoute()
const router = useRouter()
const { proxy } = getCurrentInstance()
const codetext = ref("")

const loginForm = ref({
  username: "admin",
  password: "admin123",
  rememberMe: false,
  code: "",
  uuid: ""
})

// 验证码自定义校验器
const validateCaptcha = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入验证码'))
  } else if (value.trim().toUpperCase() !== codetext.value.toUpperCase()) {
 
    callback(new Error('验证码错误'))
  
  } else {
    callback()
  }
}

const loginRules = {
  username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
  code: [
    { required: true, trigger: "change", message: "请输入验证码" },
    { validator: validateCaptcha, trigger: "change" }
  ]
}

const codeUrl = ref("")
const loading = ref(false)
// 验证码开关
const captchaEnabled = ref(true)
// 注册开关
const register = ref(false)
const redirect = ref(undefined)

watch(route, (newRoute) => {
    redirect.value = newRoute.query && newRoute.query.redirect
}, { immediate: true })

function handleLogin() {
  proxy.$refs.loginRef.validate(valid => {
    if (valid) {
      loading.value = true
      // 记住密码
      if (loginForm.value.rememberMe) {
        Cookies.set("username", loginForm.value.username, { expires: 30 })
        Cookies.set("password", encrypt(loginForm.value.password), { expires: 30 })
        Cookies.set("rememberMe", loginForm.value.rememberMe, { expires: 30 })
      } else {
        Cookies.remove("username")
        Cookies.remove("password")
        Cookies.remove("rememberMe")
      }
      // 登录
      console.log("登录信息:", loginForm.value)
      userStore.login(loginForm.value).then(() => {
        const query = route.query
        const otherQueryParams = Object.keys(query).reduce((acc, cur) => {
          if (cur !== "redirect") {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
        router.push({ path: redirect.value || "/", query: otherQueryParams })
      }).catch(() => {
        loading.value = false
        if (captchaEnabled.value) {
            getCode()
          // 刷新验证码后清除输入框的错误提示
          proxy.$refs.loginRef.clearValidate(['code'])
        }
      })
    }
  })
}

// 生成 base64 验证码图片
function drawCaptchaBase64(code) {
  const canvas = document.createElement('canvas')
  canvas.width = 100
  canvas.height = 40
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#f0f6fc'
  ctx.fillRect(0, 0, 100, 40)
  for (let i = 0; i < 3; i++) {
    ctx.strokeStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.8)`
    ctx.beginPath()
    ctx.moveTo(Math.random()*100, Math.random()*40)
    ctx.lineTo(Math.random()*100, Math.random()*40)
    ctx.stroke()
  }
  for (let i = 0; i < code.length; i++) {
    ctx.font = `${22 + Math.random()*8}px bold`
    ctx.fillStyle = `rgb(${50+Math.random()*100},${50+Math.random()*100},${50+Math.random()*100})`
    const x = 10 + i*22 + Math.random()*3
    const y = 30 + Math.random()*6
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate((Math.random()-0.5) * 0.4)
    ctx.fillText(code[i], 0, 0)
    ctx.restore()
  }
  for(let i = 0; i < 20; i++){
    ctx.fillStyle = `rgba(${Math.random()*255},${Math.random()*255},${Math.random()*255},0.5)`
    ctx.beginPath()
    ctx.arc(Math.random()*100, Math.random()*40, 1+Math.random()*1.5, 0, 2*Math.PI)
    ctx.fill()
  }
  return canvas.toDataURL()
}

// 获取验证码
function getCode() {
  getCodeImg().then(res => {
    captchaEnabled.value = res.captchaEnabled === undefined ? true : res.captchaEnabled
    if (captchaEnabled.value) {
      codeUrl.value = drawCaptchaBase64(res.text)
      codetext.value = res.text
      loginForm.value.uuid = res.uuid
      // loginForm.value.code = "" // 清空输入
      // // 清除验证码输入框的校验提示
      // proxy.$refs.loginRef.clearValidate(['code'])
    }
  })
}

function getCookie() {
  const username = Cookies.get("username")
  const password = Cookies.get("password")
  const rememberMe = Cookies.get("rememberMe")
  loginForm.value = {
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : decrypt(password),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
    code: "",
    uuid: ""
  }
}

// 初始化
getCode()
getCookie()
</script>

<style lang='scss' scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.png");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  z-index: 1;
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>
