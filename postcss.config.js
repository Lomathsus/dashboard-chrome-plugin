export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 16, // 1rem = 16px
      propList: ['*'], // 可以配置希望转换的属性
    },
  },
}
