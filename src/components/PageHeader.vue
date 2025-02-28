<template>
  <el-page-header @back="goBack" title="文章列表">
    <template #content>
      <span class="text-large font-600 mr-3 title">{{ props.title }}</span>
    </template>
  </el-page-header>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
const router = useRouter();
const goBack = () => {
  router.push('/home')
}
const props = defineProps(['title'])
</script>
<style scoped>
</style>