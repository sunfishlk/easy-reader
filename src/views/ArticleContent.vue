<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useGetArticleContent } from '@/composable/api/useGetArticleContent';
import { useRouter } from 'vue-router';
import { useLogout } from '@/composable/api/useLogout';
import { useState } from '@/composable/api/useState';
import { useChangeUserMsg } from '@/composable/api/useChangeUserMsg';
import { computed, ref } from 'vue';
import Drawer from '../components/Drawer.vue';
import PageHeader from '@/components/PageHeader.vue';
import { usePostComment } from '@/composable/api/usePostComment';
import { ElMessage, ElMessageBox } from 'element-plus'
import CommentDrawer from '@/components/CommentDrawer.vue';

const route = useRoute();
console.log(route.params.id);
const id = route.params.id;
const title = ref('');
const comments = ref<[{
  comment: string,
  createdAt: string,
  id: number,
  marked: string,
  paragraph: number,
  updatedAt: string,
  user: {
    name: string
  }
}]>([{
  comment: '',
  createdAt: '',
  id: 0,
  marked: '',
  paragraph: 0,
  updatedAt: '',
  user: {
    name: ''
  }
}]);
const content = ref<['']>(['']);
function getArticleContent(id: number) {
  useGetArticleContent(id).then((res) => {
    title.value = res.title;
    for (let i = 0; i < res.comments.length; i++) {
      comments.value.push(res.comments[i])
    }
    for (let i = 0; i < res.content.length; i++) {
      content.value.push(res.content[i])
    }
  }).catch((err) => {
    console.log(err);
  })
}
getArticleContent(Number(route.params.id));

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

const commentFor = ref('');
const commentContent = ref('');

function postComment(paragraph: number, marked: string, comment: string) {
  usePostComment(Number(route.params.id), paragraph, marked, comment).then((res) => {
    console.log(res);
  }).catch((err) => {
    console.log(err);
  })
}
const alertPostCommentCard = (index: number) => {
  //绑定鼠标选中的文字为要评论的文字
  let strObj = window.getSelection();
  let str = strObj?.toString();
  if (str) {
    commentFor.value = str;
  }
  ElMessageBox.prompt(`${commentFor.value}`, '请输入你的评论', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: /.+/,
    inputErrorMessage: '评论不能为空',
  })
    .then(({ value }) => {//成功评论
      //绑定评论内容
      commentContent.value = value;
      if (!commentFor.value) {
        ElMessage({
          type: 'error',
          message: '请鼠标选中要评论的文本后再进行评论'
        })
        return;
      }
      if (value) {
        ElMessage({
          type: 'success',
          message: `你的评论是:${value}`,
        })
      }
      else {
        ElMessage({
          type: 'error',
          message: '评论不能为空'
        })
      }
      postComment(index, commentFor.value, commentContent.value);
      //发布评论后清空marked，防止下一个评论被影响
      commentFor.value = '';
    })
    .catch(() => {//取消评论
      ElMessage({
        type: 'info',
        message: '取消评论',
      })
      //取消评论后也要清空marked
      commentFor.value = '';
    })
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
  <PageHeader :title="title" style="margin-left: 20px;margin-top: 10px;" />
  <div v-for="(paragraph, index) in content" class="paragraph">
    <div v-if="paragraph !== ''">
      {{ paragraph }}
      <div class="comment-icon">
        <div class="comment-icon-container">
          <img src="../../public/images/消息.png" style="cursor: pointer;" alt="发表评论" height="24px"
            @click="alertPostCommentCard(index)">
          <!-- <el-badge :value="commentNum" style="text-indent: 0;"> -->
          <CommentDrawer :paragraph="index" :id="id" />
          <!-- </el-badge> -->
        </div>
      </div>
    </div>
  </div>
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

.paragraph {
  margin: 30px 20px;
  font-size: 18px;
  text-indent: 2em;
}

.paragraph:hover .comment-icon {
  visibility: visible;
}

.comment-icon {
  visibility: hidden;
  /* transition: all .05s ease-in; */
}

.comment-icon-container {
  width: 135px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 5px;
}

.post-comment-control {
  margin-left: 20px;
}

.post-comment {
  margin: 10px 0;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>