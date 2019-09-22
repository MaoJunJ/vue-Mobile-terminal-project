module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      // 设置默认的根节点为37.5
      rootValue: 37.5,
      propList: ['*']
    }
  }
}


