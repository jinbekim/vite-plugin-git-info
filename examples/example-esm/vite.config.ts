import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteGitInfoPlugin from 'vite-plugin-git-info-env'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteGitInfoPlugin()],
})
