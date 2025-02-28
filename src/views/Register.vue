<script setup lang="ts">
import { useRegister } from '@/composable/api/useRegister';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const name = ref('');
const password = ref('');
const verifyPassword = ref('');

const alertError = (err: string) => {
  ElMessage.error(err);
}
function register(name: string, password: string) {
  if (password !== verifyPassword.value) {
    alertError('两次输入的密码不一样')
    return;
  }
  if (!name || !password) {
    alertError('用户名或者密码为空')
  }
  else {
    useRegister(name, password).then((res) => {
      if (res) {
        console.log('注册成功');
        router.push('/home');
      }
      else {
        console.log('注册失败');
      }
    }).catch((err) => {
      console.log(err);
    })
  }
}

</script>

<template>
  <div class="card">
    <img src="../../images/全长logo.jpg" height="120px" class="logo-img">
    <div class="name-input-container">
      <input type="text" placeholder="请输入用户名" class="name-input" v-model="name">
    </div>
    <div class="password-input-container">
      <input type="password" placeholder="请输入密码" class="password-input" v-model="password">
    </div>
    <div class="password-input-container">
      <input type="password" placeholder="请再次输入密码" class="password-input" v-model="verifyPassword">
    </div>
    <div class="login-button" @click="register(name, password)">注册并登录</div>
  </div>
</template>

<style scoped>
.card {
  width: 400px;
  height: 580px;
  /* border: 2px solid #00b96b; */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  text-align: center;
  box-shadow: 0px 0px 15px 5px #e7e9e8;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.logo-img {
  margin: 30px auto;
}

input {
  outline: none;
  border: none;
}

.name-input-container {
  width: 318px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e7e9e8;
  border-radius: 5px;
  transition: all .25s;
  margin: 10px 0;
}

.name-input-container:hover {
  border: 1px solid #00b96b;
}

.name-input {
  width: 286px;
  height: 30px;
  margin: 0 auto;
}

.password-input-container {
  width: 318px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #e7e9e8;
  border-radius: 5px;
  transition: all .25s;
  margin: 10px 0;
}

.password-input-container:hover {
  border: 1px solid #00b96b;
}

.password-input {
  width: 286px;
  height: 30px;
  margin: 0 auto;
}

.login-button {
  width: 318px;
  height: 40px;
  line-height: 40px;
  margin: 10px auto;
  cursor: pointer;
  border: 1px solid #00b96b;
  border-radius: 5px;
  background-color: white;
  transition: all .25s;
}

.login-button:hover {
  color: white;
  background-color: #00b96b;
}

.forget-password {
  color: #8b8f8d;
  font-size: 0.9rem;
  margin: 10px 0;
}

@media(max-width:450px) {
  .card {
    width: 340px;
  }
}
</style>