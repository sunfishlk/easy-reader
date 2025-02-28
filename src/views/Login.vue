<script setup lang="ts">
import { ref } from 'vue';
import { useLogin } from '@/composable/api/useLogin';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useState } from '@/composable/api/useState';
const router = useRouter();
const name = ref('');
const password = ref('');

const alertError = (err: string) => {
  ElMessage.error(err);
}
// function login(name: string, password: string) {
//   if (!name || !password) {
//     alertError('用户名或者密码为空')
//   }
//   else {
//     useLogin(name, password).then((res) => {
//       // console.log(res);
//       if (res) {
//         router.push('/home');
//         ElMessage({
//           type: 'success',
//           message: '登陆成功'
//         })
//       }
//       else {
//         //检测是否已登录
//         useState().then((res) => {
//           console.log(res);
//           if (res) {
//             //如果已登录，再判断密码和用户名对不对
//             useLogin(name, password).then((res) => {
//               if (!res) {//登陆了但是密码和用户名不对
//                 ElMessage({
//                   type: 'error',
//                   message: '用户名或密码错误'
//                 })
//               }
//               else {//登陆了且用户名和密码对了//现在这里不可能，bug问题在这
//                 router.push('/home');
//                 ElMessage({
//                   type: 'success',
//                   message: '登陆成功'
//                 })
//               }
//             }).catch((err) => {
//               console.log(err);
//             })
//           }
//           else {
//             ElMessage({
//               type: 'error',
//               message: '用户名或密码错误'
//             })
//           }
//         }).catch((err) => {
//           console.log(err);
//         })

//         // console.log('登录失败');
//         // alertError('用户名或密码错误')
//       }
//     }).catch((err) => {
//       console.log(err);
//     })
//   }
// }

function login(name: string, password: string) {
  if (!name || !password) {
    alertError('用户名或者密码为空')
  }
  else {
    useLogin(name, password).then((res) => {
      console.log(res);
      if (res) {
        console.log('登陆成功');
        router.push('/home');
        ElMessage({
          type: 'success',
          message: '登陆成功'
        })
      }
    }).catch((err) => {
      // if(err==='用户名或密码错误'){
      //   alertError(err);
      // }
      // if(err==='当前已有账号登录'){
      //   alertError(err);
      // }
      alertError(err);
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
    <div class="login-button" @click="login(name, password)">登录</div>
    <p class="forget-password">
      <RouterLink to="/register">没有账户？去注册</RouterLink>
    </p>
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