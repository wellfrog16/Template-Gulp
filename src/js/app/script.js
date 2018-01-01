// 剧本

define([
    'jquery',
    'helper',
    'loader',
    'text!../views/block.html!strip',
    'text!../views/index.html!strip'],
function ($, helper, loader, htmlBlock, htmlIndex) {
    return () => {
        // 加载jquery插件
        helper.jqueryPlugins();
        helper.fixRem();



        // 如果是手机端，加载横屏提示
        if (!helper.isPC) { $('body').append(htmlBlock); }        

        loader(()=>{
            $('body').append(htmlIndex);
            console.log('123');
        });
    };
});

















