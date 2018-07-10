define(['jquery'], ($) => {
    const self = {};

    self.jqueryPlugins = function() {
        $.fn.extend({
            // animateCss: function (animationName) {
            //     var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            //     this.addClass('animated ' + animationName).one(animationEnd, function() {
            //         //$(this).removeClass('animated ' + animationName);
            //     });
            //     return this;
            // },

            // 自动根据屏幕调整元素尺寸
            autofixStyle: function(options) {
                var args = {
                    baseWidth: $(window).width(), // 元素原先参照容器宽度
                    designWidth: $(window).width(), // 元素现在参照容器宽度
                    changeFontSize: false
                };

                $.extend(args, options);

                args.scaleNum = args.designWidth / args.baseWidth;
                this.each((index, item) => {
                    var o = $(item);
                    var fix = o.attr('data-fixStyle') || 'top,left,bottom,right,width,height'; // 需要调整的方向，默认top-left
                    var fixArray = fix.split(',');

                    $.each(fixArray, (index, item) => {
                        if (parseInt(o.css(item)) === 0) { return true; }
                        o.css(item, args.scaleNum * parseInt(o.css(item)));
                    });
                });

                return this;
            }
        });

        $.easing['jswing'] = $.easing['swing'];

        $.extend($.easing, {
            def: 'easeOutQuad',
            swing: function(x, t, b, c, d) {
                // alert(jQuery.easing.default);
                return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
            },
            easeInQuad: function(x, t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOutQuad: function(x, t, b, c, d) {
                return -c * (t /= d) * (t - 2) + b;
            },
            easeInOutQuad: function(x, t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t - 2) - 1) + b;
            },
            easeInCubic: function(x, t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOutCubic: function(x, t, b, c, d) {
                return c * ((t = t / d - 1) * t * t + 1) + b;
            },
            easeInOutCubic: function(x, t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t + 2) + b;
            },
            easeInQuart: function(x, t, b, c, d) {
                return c * (t /= d) * t * t * t + b;
            },
            easeOutQuart: function(x, t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            easeInOutQuart: function(x, t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
            },
            easeInQuint: function(x, t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOutQuint: function(x, t, b, c, d) {
                return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
            },
            easeInOutQuint: function(x, t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
            },
            easeInSine: function(x, t, b, c, d) {
                return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
            },
            easeOutSine: function(x, t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            },
            easeInOutSine: function(x, t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
            },
            easeInExpo: function(x, t, b, c, d) {
                return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
            },
            easeOutExpo: function(x, t, b, c, d) {
                return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
            },
            easeInOutExpo: function(x, t, b, c, d) {
                if (t === 0) return b;
                if (t === d) return b + c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            },
            easeInCirc: function(x, t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOutCirc: function(x, t, b, c, d) {
                return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
            },
            easeInOutCirc: function(x, t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            },
            easeInElastic: function(x, t, b, c, d) {
                var s = 1.70158;
                var p = 0;
                var a = c;
                if (t === 0) return b;
                if ((t /= d) === 1) return b + c;
                if (!p) p = d * 0.3;
                if (a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else s = p / (2 * Math.PI) * Math.asin(c / a);
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOutElastic: function(x, t, b, c, d) {
                var s = 1.70158;
                var p = 0;
                var a = c;
                if (t === 0) return b;
                if ((t /= d) === 1) return b + c;
                if (!p) p = d * 0.3;
                if (a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else s = p / (2 * Math.PI) * Math.asin(c / a);
                return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
            },
            easeInOutElastic: function(x, t, b, c, d) {
                var s = 1.70158;
                var p = 0;
                var a = c;
                if (t === 0) return b;
                if ((t /= d / 2) === 2) return b + c;
                if (!p) p = d * (0.3 * 1.5);
                if (a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else s = p / (2 * Math.PI) * Math.asin(c / a);
                if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
            },
            easeInBack: function(x, t, b, c, d, s) {
                if (s === undefined) s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOutBack: function(x, t, b, c, d, s) {
                if (s === undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOutBack: function(x, t, b, c, d, s) {
                if (s === undefined) s = 1.70158;
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            },
            easeInBounce: function(x, t, b, c, d) {
                return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
            },
            easeOutBounce: function(x, t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
                }
            },
            easeInOutBounce: function(x, t, b, c, d) {
                if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
                return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
            }
        });
    };

    // 获得url参数
    self.getUrlParam = function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'); // 构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); // 匹配目标参数
        if (r != null) return decodeURIComponent(r[2]); return null; // 返回参数值
    };

    // 移动设备简单判断
    self.device = (() => {
        return /android/.test(navigator.userAgent.toLowerCase()) ? 'android' : 'iphone';
    })();

    // 是否PC端简单判断23
    self.isPC = (() => {
        var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (navigator.userAgent.indexOf(Agents[v]) > 0) { flag = false; break; }
        }
        return flag;
    })();

    // 尝试执行函数
    self.tryFun = fun => {
        if (typeof fun === 'function') { return fun(); }
    };

    // 判断数字
    self.isNum = val => {
        // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
        if (val === '' || val === null) {
            return false;
        }
        return !isNaN(val);
    };

    // 自动修正rem基数
    self.fixRem = function(designWidth, radix) {
        var win = window;
        var docEl = win.document.documentElement;
        var tid;

        // 下面的640表示设计稿大小，50(px)是rem基数
        designWidth = designWidth || 640;
        radix = radix || 64;

        function refreshRem() {
            // 获取当前窗口的宽度
            var width = docEl.getBoundingClientRect().width;
            // 大于640px 按640算
            // if (width > 640) { width = 640; }

            var rem = width / designWidth * radix;  // cms 只要把这行改成  var rem = width /640 * 100
            docEl.style.fontSize = rem + 'px';

            // 误差、兼容性处理
            var actualSize = parseFloat(window.getComputedStyle(document.documentElement)['font-size']);
            if (actualSize !== rem && actualSize > 0 && Math.abs(actualSize - rem) > 1) {
                var remScaled = rem * rem / actualSize;
                docEl.style.fontSize = remScaled + 'px';
            }
        }

        // 函数节流，避免频繁更新
        function dbcRefresh() {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 100);
        }

        // 窗口更新动态改变font-size
        win.addEventListener('resize', function() { dbcRefresh(); }, false);

        // 页面显示的时候再计算一次   难道切换窗口之后再切换来窗口大小会变?....
        win.addEventListener('pageshow', function(e) {
            if (e.persisted) { dbcRefresh(); }
        }, false);
        refreshRem();
    };

    if (!window.myWorld) { window.myWorld = {}; }
    window.myWorld.sword = self;
});
