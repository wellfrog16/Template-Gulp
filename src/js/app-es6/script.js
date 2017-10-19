// 剧本

define(['jquery', 'helper', 'text!../template/block.html!strip', 'swiper'], function ($, helper, htmlBlock) {
    return () => {
        // 如果是手机端，加载横屏提示
        if (!helper.isPC) {
            $('body').append(htmlBlock);
        }
    };
});

















