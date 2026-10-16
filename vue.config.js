const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // 相对路径，便于部署到 Vercel / 任意静态目录
  publicPath: './',
  devServer: {
    port: 7000,
    open: true
  }
})
