import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // 사용하는 프레임워크에 따라 다름

export default defineConfig({
  plugins: [react()],
  base: '/Holly45vd/', // 예: 데이터 분석 툴이면 '/data-analyzer/'
})