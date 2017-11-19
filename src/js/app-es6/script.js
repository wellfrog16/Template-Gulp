// 剧本

define(['jquery', 'helper', 'loader', 'text!../template/block.html!strip', 'swiper'], function ($, helper, loader, htmlBlock) {
    return () => {
        // 加载jquery插件
        helper.jqueryPlugins();

        // 如果是手机端，加载横屏提示
        if (!helper.isPC) { $('body').append(htmlBlock); }

        loader(()=>{
            console.log('123');
        })
    };
});

















