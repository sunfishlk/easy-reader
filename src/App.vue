<script setup lang="ts">
import { useLogin } from './composable/api/useLogin';
import { useLogout } from './composable/api/useLogout';
import { useRegister } from './composable/api/useRegister';
import { useState } from './composable/api/useState';
import { useGetArticleList } from './composable/api/useGetArticleList';
import { useGetArticleContent } from './composable/api/useGetArticleContent';
import { usePostComment } from './composable/api/usePostComment';
import { useChangeComment } from './composable/api/useChangeComment';
import { useDeleteComment } from './composable/api/useDeleteComment';
import { RouterView } from 'vue-router';
//API测试
const name = "sunfishlk";
const password = "020905lk";
function login(name: string, password: string) {
  useLogin(name, password);
}
function logout() {
  useLogout();
}
function register(name: string, password: string) {
  useRegister(name, password);
}
function getState() {
  useState();
}
function getArticleList(page: number, limit: number, type: string) {
  useGetArticleList(page, limit, type);
}
function getArticleContent(id: number) {
  useGetArticleContent(id);
}
function postComment(passageId: number, paragraph: number, marked: string, comment: string) {
  usePostComment(passageId, paragraph, marked, comment);
}
function changeComment(id: number, comment: string) {
  useChangeComment(id, comment);
}
function deleteComment(id: number) {
  useDeleteComment(id);
}

</script>

<template>  
  <RouterView />
</template>

<style scoped></style>