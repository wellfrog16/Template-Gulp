define(['jquery'], function ($) {

    //
    var self = {};

    self.jqueryPlugins = function(){

        $.fn.extend({
            // animateCss: function (animationName) {
            //     var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            //     this.addClass('animated ' + animationName).one(animationEnd, function() {
            //         //$(this).removeClass('animated ' + animationName);
            //     });
            //     return this;
            // },

            // 自动根据屏幕调整元素尺寸
            autofixStyle: function (options) {

                var args = {
                    baseWidth : $(window).width(),        // 元素原先参照容器宽度
                    designWidth : $(window).width(),      // 元素现在参照容器宽度
                    changeFontSize : false
                }

                $.extend(args, options);

                args.scaleNum = args.designWidth / args.baseWidth;
        
                this.each((index, item)=>{
                    var o = $(item),
                        fix = o.attr('data-fixStyle') || 'top,left,bottom,right,width,height';     // 需要调整的方向，默认top-left

                    var fixArray = fix.split(',');
        
                    $.each(fixArray, (index, item) => {
                        if (parseInt(o.css(item)) == 0) { return true; }
                        o.css(item, args.scaleNum * parseInt(o.css(item)));
                    });
                });

                return this;
            }
        });
    }

    // 全局变量存储用
    self.variable = {};

    // 获得url参数
    self.getUrlParam = function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return decodeURIComponent(r[2]); return null; //返回参数值
    };

    // 移动设备简单判断
    self.device = (function () {
        return /android/.test(navigator.userAgent.toLowerCase()) ? 'android' : 'iphone';
    })();

    // 是否PC端简单判断23
    self.isPC = (function () {
        var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (navigator.userAgent.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    })();

    // 尝试执行函数
    self.tryFun = function(fun){
        if (typeof fun === 'function') { return fun(); }
    };

    return self;

});