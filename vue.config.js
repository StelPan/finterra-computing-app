const { defineConfig } = require('@vue/cli-service')
const dotenvWebpack = require("dotenv-webpack")

module.exports = defineConfig({
  outputDir: "./http/static/",
  transpileDependencies: [
    'vuetify'
  ],
  configureWebpack: {
    plugins: [
        new dotenvWebpack()
    ]
  }
})
