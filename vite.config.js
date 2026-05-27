import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/blogpromptcreator/', // 유저명이 아니라 레포지토리 이름을 적어야 함
})