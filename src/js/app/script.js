// 剧本

define([
    'jquery',
    'utils/utils',
    'loader',
    'music',
    'text!../components/block.html!strip',
    'text!../components/index.html!strip'],
($, utils, loader, music, htmlBlock, htmlIndex) => {
    return () => {
        // 加载jquery插件
        utils.jqueryPlugins();
        utils.fixRem();

        // 如果是手机端，加载横屏提示
        if (!utils.isPC) { $('body').append(htmlBlock); }

        loader(() => {
            $('body').append(htmlIndex);
            console.log('123');

            const a = music(false);

            setInterval(() => {
                console.log(a.playing);
            }, 1000);
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
