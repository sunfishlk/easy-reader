<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="全部文章" name="">
      <div v-for="passage in passages">{{ passage.title }}</div>
    </el-tab-pane>
    <el-tab-pane label="中文文章" name="ch"></el-tab-pane>
    <el-tab-pane label="英文文章" name="en"></el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useGetArticleList } from '@/composable/api/useGetArticleList';

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.props.label)
  let str=String(tab.props.name);
  getArticleList(1,10,str);
}
const passages = ref<[{
  id: number,
  title: string
}]>([{
  id: 0,
  title: ''
}])
function getArticleList(page: number, limit: number, type: string) {
  useGetArticleList(page, limit, type).then((res) => {
    console.log(res);
    passages.value[0].id=res.passages[0].id;
    passages.value[0].title=res.passages[0].title;
    for (let i = 1; i < res.passages.length; i++) {
      console.log(res.passages[i].id);
      console.log(res.passages[i].title);
      passages.value.push({
        id: res.passages[i].id,
        title: res.passages[i].title
      })
    }
    for(let i=0;i<passages.value.length;i++){
      console.log(passages.value[i].id,passages.value[i].title);
    }
  }).catch((err)=>{
    console.log(err);
  })
}
</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
