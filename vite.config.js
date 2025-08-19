import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/weatherApp/', // This matches your repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   base: '/Weather-App-using-ContextAPI/',   
//   server: {
//     port: 3000,
//     open: true
//   },
//   build: {
//     outDir: 'dist'
//   }
// })
// // This configuration sets up Vite for a React project with specific settings for the base path, server port, and build output directory.