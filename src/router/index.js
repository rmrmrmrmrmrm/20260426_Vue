/*GitHub Pages特有の注意点（404エラー対策）
GitHub Pagesは「Historyモード」と相性が少し悪いです。
ブラウザで直接 /20260426_Vue/hoge/body にアクセスしたり、リロード（更新）をすると、GitHubのサーバーが「bodyなんてファイルはない」と判断して404エラーを出してしまいます。
これを回避する最も簡単な「学習向け」の方法は、Hashモードに切り替えることです。*/
import { createRouter, createWebHashHistory } from 'vue-router' // HashHistoryに変更
import HomeView from '../views/HomeView.vue'
import DiagnosticBody from '../views/DiagnosticBody.vue'

const router = createRouter({
// URLに # がつくモード（例: .../hoge/#/body）
  // これなら特別な設定なしでリロードしてもエラーになりません
  history: createWebHashHistory('/20260426_Vue/hoge/'),
  routes: [
    { path: '/', component: () => import('../views/HomeView.vue') },//自動的に #/body へ飛ばしてくれる
    { path: '/body', component: () => import('../views/DiagnosticBody.vue') },
    { path: '/shoes', component: () => import('../views/DiagnosticShoes.vue') }, // 非同期読み込み
    { path: '/fortune', component: () => import('../views/DiagnosticFortune.vue') }
  ]
})

export default router