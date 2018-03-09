// 剧本

define([
    'jquery',
    'utils/utils',
    '@/loader',
    'text!../../views/block.html!strip',
    'text!../../views/index.html!strip'],
($, utils, loader, htmlBlock, htmlIndex) => {
    return () => {
        // 加载jquery插件
        utils.jqueryPlugins();
        utils.fixRem();
        // 如果是手机端，加载横屏提示
        if (!utils.isPC) { $('body').append(htmlBlock); }

        loader(() => {
            $('body').append(htmlIndex);
            console.log('123');
        });
    };
});

// const modules = ['jquery', 'utils/utils'];

// define(modules,
//     ($, utils) => {
//         return () => {
//             console.log(1123);
//         };
//     }
// );
