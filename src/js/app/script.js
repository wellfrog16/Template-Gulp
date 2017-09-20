'use strict';

// 剧本

define(['jquery', 'helper', 'text!../template/block.html!strip'], function ($, helper, htmlBlock) {
    return function () {
        // 如果是手机端，加载横屏提示
        if (!helper.isPC) {
            $('body').append(htmlBlock);
        }
    };
});