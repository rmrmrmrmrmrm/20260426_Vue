<template>
  <nav>
    <!-- 全ページ共通のナビがあればここに書く -->
    <router-link to="/hoge/">ホーム（診断一覧）</router-link>
  </nav>

  <!-- HomeView.vueで管理 -->
  <router-view />
</template>