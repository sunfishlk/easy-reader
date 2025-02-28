<template>
  <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize2" :page-sizes="[2, 4, 6, 8]"
    :small="small" :disabled="disabled" :background="true" layout="total, sizes, prev, pager, next, jumper" :total=total
    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { defineEmits } from 'vue';
import { defineProps } from 'vue';
const currentPage1 = ref(5)
const currentPage2 = ref(5)
const currentPage3 = ref(5)
const currentPage4 = ref(4)
const pageSize2 = ref(2)
const pageSize3 = ref(4)
const pageSize4 = ref(10)
const small = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  emits('pageSize',val)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
  emits('currentPage',val)
}
//props
const total = defineProps([''])
//emits
const emits =defineEmits(['pageSize','currentPage','foo'])
</script>

<style scoped>
.demo-pagination-block+.demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
