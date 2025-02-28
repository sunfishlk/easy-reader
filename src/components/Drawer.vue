<template>
  <!-- v-if保证有评论才渲染，保证初始定义的comment的props内容不会显示出来 -->
  <el-button type="primary" style="margin-left: 16px;margin-top: 16px;" @click="drawer = true" v-if="props.comment">
    第{{ props.paragraph }}段
  </el-button>

  <el-drawer v-model="drawer" title="评论" :with-header="false">
    <p class="paragraph">评论id：{{ props.id }}</p>
    <p class="paragraph">评论创建时间：{{ props.createdAt }}</p>
    <p class="paragraph">评论更新时间：{{ props.updatedAt }}</p>
    <p class="paragraph">评论的段落：{{ props.paragraph }}</p>
    <p class="paragraph">针对以下语句评论：{{ props.marked }}</p>
    <p class="paragraph">评论内容：{{ props.comment }}</p>
    <p class="paragraph">评论者：{{ props.user.name }}</p>
    <span>如需要修改评论，请输入：</span>
    <el-input type="text" class="input" style="width: 200px;margin: 10px 0;" v-model="newComment" />
    <el-button type="primary" plain @click="changeComment(Number(props.id), newComment)">修改评论</el-button>
    <el-button type="primary" color="#EC7696" plain @click="deleteComment(Number(props.id))">删除评论</el-button>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useChangeComment } from '@/composable/api/useChangeComment';
import { useDeleteComment } from '@/composable/api/useDeleteComment';
const drawer = ref(false)
import { defineProps } from 'vue';
const props = defineProps({
  id: Number,
  comment: String,
  paragraph: Number,
  createdAt: String,
  updatedAt: String,
  marked: String,
  user: {
    type: Object,
    name: String,
    required: true,
  },
});
function changeComment(id: number, comment: string) {
  useChangeComment(id, comment).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  window.location.reload();
}
function deleteComment(id: number) {
  useDeleteComment(id).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
  window.location.reload();
}
const newComment = ref('');
</script>

<style scoped>
.paragraph {
  margin: 10px 0;
}
</style>