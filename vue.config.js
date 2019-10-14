const path = require('path')

module.exports = {
  pages: {
    index: {
      entry: 'example/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', path.join(__dirname, 'packages'))
    config.optimization.minimize(true)
    // config.optimization.splitChunks({
    //   chunks: 'all'
    // })
    // config.externals({
    //   Vue: 'vue',
    //   'iView': "'iview'"
    // })
  },
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        data: `@import "~@/style/_variables.sass"`
      },
      scss: {
        data: `@import "~@/style/_variables.scss";`
      },
    },
  }
}
