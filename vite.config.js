import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pagesやレンタルサーバーの公開ディレクトリ名に合わせてください
  base: '/20260426_Vue/hoge/',
  build: {
    outDir: 'docs/hoge', // ビルドしたデータの出力先
  }
})
