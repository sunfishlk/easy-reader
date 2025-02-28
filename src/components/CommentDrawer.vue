<template>
  <img src="../../public/images/查看.png" style="margin: 0px 5px;cursor: pointer;" alt="查看评论" height="28px"
    @click="drawer = true, getArticleContent(props.id)">

  <el-drawer v-model="drawer" title="Comments" :with-header="true">
    <!-- <span>第{{ props.paragraph }}段</span> -->
    <div v-for="(comment, index) in comments">
      <div v-if="comment.paragraph == paragraph" class="comment-card"><br>
        <div class="commenter">
          <div class="user">
            <img src="../../public/images/用户.png" alt="用户" height="20px">
            {{ comment.user.name }}
          </div>
          <div v-if="checkCommenter(comment.user.name)">
            <el-button type="primary" :icon="Edit" circle
              @click="alertChangeCommentBox(comment.id, comment.marked, index)" />
            <el-button type="danger" :icon="Delete" circle @click="deleteComment(comment.id, index)" />
          </div>
        </div>
        <el-divider border-style="dashed" />
        <div class="created-time">创建于{{ comment.createdAt }}</div>
        <div class="updated-time">更新于{{ comment.updatedAt }}</div>
        <el-divider border-style="dashed" />
        <div>
          <div class="comment-for">{{ comment.marked }}</div>
        </div>
        <el-divider border-style="dashed" />
        <div>
          <div class="comment-content">
            {{ comment.comment }}
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { defineProps } from 'vue';
import { useGetArticleContent } from '@/composable/api/useGetArticleContent';
import { useChangeComment } from '@/composable/api/useChangeComment';
import { useDeleteComment } from '@/composable/api/useDeleteComment';
import { useState } from '@/composable/api/useState';
import { format } from 'date-fns-tz';
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Delete,
  Edit,
} from '@element-plus/icons-vue'

const drawer = ref(false)
const props = defineProps(['paragraph', 'id']);



//解决评论全英字符串显示不换行问题
function insertSpaceAtPosition(originalString: string, position: number) {
  if (position > 0 && position < originalString.length) {
    // 使用 substring 方法将字符串拆分为两部分，然后在指定位置插入空格
    var firstPart = originalString.substring(0, position);
    var secondPart = originalString.substring(position);
    return firstPart + ' ' + secondPart;
  } else {
    // 如果位置不在字符串范围内，返回原始字符串
    return originalString;
  }
}
//获取文章文本内容
function getArticleContent(id: number) {
  useGetArticleContent(id).then((res) => {
    comments.value.length = 0;
    for (let i = 0; i < res.comments.length; i++) {
      comments.value.push(res.comments[i]);
      //转换UTC时间为北京时间显示
      comments.value[i].createdAt = convertUtcToBeijingTime(comments.value[i].createdAt);
      comments.value[i].updatedAt = convertUtcToBeijingTime(comments.value[i].updatedAt);
      if (comments.value[i].comment.length >= 42) {
        let count = Math.floor(comments.value[i].comment.length / 42);
        comments.value[i].comment = insertSpaceAtPosition(comments.value[i].comment, 42);
        for (let index = 1; index < count; index++) {
          comments.value[i].comment = insertSpaceAtPosition(comments.value[i].comment, 45 * (index + 1));
        }
      }
    }
  }).catch((err) => {
    console.log(err)
  })
}
const comments = ref<Array<{
  comment: string,
  createdAt: string,
  id: number,
  marked: string,
  paragraph: number,
  updatedAt: string,
  user: {
    name: string
  }
}>>([])
const newComment = ref('');
//修改评论
function changeComment(id: number, comment: string, index: number, value: string) {
  useChangeComment(id, comment).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  //把显示的comments改了，用vue的追踪机制实现响应式更新，不用reload()刷新界面，实现即时显示修改后的评论
  comments.value[index].comment = value;
}
//删除评论
function deleteComment(id: number, index: number) {
  useDeleteComment(id).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  //修改comments，利用vue响应式追踪实现评论的实时变化，而不用reload()
  comments.value.splice(index, 1);
  alertSuccess();
}
//检测用户名，借此判断能否修改评论
const commenter = ref('');
useState().then((res) => {
  commenter.value = res.name;
}).catch((err) => {
  console.log(err);
})
function checkCommenter(str: string): boolean {
  return commenter.value === str;
}
//转换UTC时间为北京时间
function convertUtcToBeijingTime(utcDateString: string): string {
  const utcDate = new Date(utcDateString);
  // 使用 date-fns-tz 进行时区转换
  const beijingTimeString = format(utcDate, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'Asia/Shanghai' });
  return beijingTimeString;
}

//弹出修改评论的窗口
const alertChangeCommentBox = (commentId: number, marked: string, index: number) => {
  ElMessageBox.prompt(`${marked}`, '修改评论', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputPattern: /.+/,
    inputErrorMessage: '评论不能为空',
  })
    .then(({ value }) => {
      if (value) {
        ElMessage({
          type: 'success',
          message: `修改后的评论是：${value}`,
        })
        newComment.value = value;
        changeComment(commentId, newComment.value, index, value);
      }
      else {
        ElMessage({
          type: 'error',
          message: '评论不能为空'
        })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消修改',
      })
    })
}

const alertSuccess = () => {
  ElMessage({
    message: '删除评论成功',
    type: 'success',
  })
}
</script>

<style scoped>
.comment-card {
  background-color: white;
  margin: 20px 0;
  padding: 10px;
  border: 2px solid #419eff;
  border-radius: 5px;
}

.comment-for {
  padding: 10px 0px;
  font-family: 'Times New Roman', Times, serif;
  font-size: 16px;
  font-style: italic;
}

.comment-content {
  font-family: '华文楷体';
  padding: 10px 0px;
}

.created-time,
.updated-time {
  color: #8a8a8a;
  font-size: 14px;
  margin: 5px 0;
  font-style: italic;
}

.commenter {
  position: relative;
  top: -10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>