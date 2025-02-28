<script setup lang="ts">
import { useGetArticleList } from '@/composable/api/useGetArticleList';
import { useChangeUserMsg } from '@/composable/api/useChangeUserMsg';
import { useLogout } from '@/composable/api/useLogout';
import Pagination from '../components/Pagination.vue';
import { useState } from '@/composable/api/useState';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
const router = useRouter();
function logout() {
  useLogout();
  router.push('/')
}

const username = ref('');
const userId = ref('');
function getState() {
  useState().then((res) => {
    console.log(res)
    username.value = res.name;
    userId.value = res.id;
  }).catch((err) => {
    console.log(err)
  })
}
getState();

const totalArticles = ref(0);

const limit = ref(2);
const page = ref(1);
const type = ref('');
const passages = ref<Array<{ id: number, title: string }>>([])
function getArticleList(page: number, limit: number, type: string) {
  passages.value.length = 0;//清空原数组进行重新赋值
  useGetArticleList(page, limit, type).then((res) => {
    totalArticles.value = res.total;
    for (let i = 0; i < res.passages.length; i++) {
      // console.log(res.passages[i].id);
      // console.log(res.passages[i].title);
      passages.value.push({
        id: res.passages[i].id,
        title: res.passages[i].title
      })
    }
  }).catch((err) => {
    console.log(err);
  })
}
getArticleList(page.value, limit.value, '');

const changeUserMsg = () => {
  let changedUsername = '';
  let changedPassword = '';
  //修改密码
  ElMessageBox.prompt('请输入修改后的密码', '密码', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    //正则匹配至少一个字符，密码不能为空
    inputPattern: /.+/,
    inputErrorMessage: '密码不能为空',
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `修改后的密码是:${value}`,
      })
      changedPassword = value;
      console.log(changedPassword);
      //用户名和密码都改好后发api改实际数据
      useChangeUserMsg(changedUsername, changedPassword).then((res) => {
        console.log(res);
        console.log(changedUsername, changedPassword)
      }).catch((err) => {
        console.log(err);
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消修改密码',
      })
    })
  //修改用户名
  ElMessageBox.prompt('请输入修改后的用户名', '用户名', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    //正则匹配至少一个字符，用户名不能为空
    inputPattern: /.+/,
    inputErrorMessage: '用户名不能为空'
  })
    .then(({ value }) => {
      if (value) {
        ElMessage({
          type: 'success',
          message: `修改后的用户名是:${value}`,
        })
        //改显示的用户名
        username.value = value;
        changedUsername = value;
        console.log(changedUsername)
      }
      else {
        ElMessage({
          type: 'error',
          message: '用户名不能为空'
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消修改用户名',
      })
    })
}
//改变每页显示的最大文章数量
function changePageSize(pageSize: number) {
  limit.value=pageSize
  getArticleList(page.value,limit.value,type.value);
}
//改变当前页号
function changeCurrentPage(currentPage: number) {
  page.value=currentPage
  getArticleList(page.value,limit.value,type.value);
}
</script>

<template>
  <header>
    <div class="header-left">
      <div class="logo">
        <img src="../../images/logo.png" height="50px">
      </div>
      <div class="slogan">阅读，智享生活</div>
    </div>
    <div class="header-right">
      <div class="username">Hello, {{ username }}</div>
      <div class="change-button" @click="changeUserMsg">修改信息</div>
      <div class="logout-button" @click="logout">登出</div>
    </div>
  </header>
  <div class="buttons">
    <el-button type="primary" @click="type = ''; getArticleList(page, limit, type)">所有文章</el-button>
    <el-button type="primary" @click="type = 'ch'; getArticleList(page, limit, type)">中文文章</el-button>
    <el-button type="primary" @click="type = 'en'; getArticleList(page, limit, type)">英文文章</el-button>
  </div>
  <div class="article-list">
    <span class="article-title" @click="router.push(`/home/${passage.id}`)" v-for="passage in passages">《{{ passage.title
    }}》<br></span>
  </div>
  <Pagination class="pagination" :total="totalArticles" :type="type" @page-size="changePageSize"
    @current-page="changeCurrentPage"/>
</template>

<style scoped>
header {
  width: 100vw;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #dcecfd;
  text-align: center;
}

.header-left {
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  margin: 0 20px;
}

.slogan {
  width: 200px;
  font-size: 1.2rem;
  color: #419eff;
}

.header-right {
  width: 500px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.username {
  color: #419eff;
  margin: 0 10px;
}

.change-button {
  width: 80px;
  height: 20px;
  line-height: 20px;
  background-color: #419eff;
  border-radius: 3px;
  color: white;
  padding: 5px 10px;
  margin: 0 10px;
  cursor: pointer;
  /* line-height: 30px; */
}

.logout-button {
  width: 60px;
  height: 20px;
  line-height: 20px;
  background-color: #f36d6a;
  border-radius: 3px;
  color: white;
  padding: 5px 10px;
  margin: 0 10px;
  cursor: pointer;
}

.tabs {
  margin: 10px 10px;
}

.buttons {
  margin: 10px;
}

.article-list {
  margin: 30px 10px;
}

.article-title {
  cursor: pointer;
  transition: all .2s;
  font-size: 20px;
}

.article-title:hover {
  color: #419eff;
}

.control {
  margin-left: 10px;
}

.input {
  margin: 10px;
}

.pagination {
  margin: 10px;
}
</style>