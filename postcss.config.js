export default {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 37.5, // 与 amfe-flexible 一致，1rem = 37.5px
            propList: ['*'],
            selectorBlackList: [],
            minPixelValue: 1,
            unitPrecision: 5,
            mediaQuery: false,
        },
    },
};
