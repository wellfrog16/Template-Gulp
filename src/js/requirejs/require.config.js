require.config({
    //optimize: 'none',
    baseUrl: 'js',

    buildCSS: false,
    inlineText : true,

    map: {
        '*': {
            'css': 'requirejs/css.min'
        }
    },

    //text: {
    //    onXhr: function (xhr, url) {
    //        xhr.setRequestHeader('X-Requested-Width', 'XMLHttpRequest');
    //        //Called after the XHR has been created and after the
    //        //xhr.open() call, but before the xhr.send() call.
    //        //Useful time to set headers.
    //        //xhr: the xhr object
    //        //url: the url that is being used with the xhr object.
    //    },
    //},
    //map: {

    //    // 不同模块加载不同版本加载
    //    'api1' : {
    //        'jquery' : '版本1'
    //    },

    //    'api2': {
    //        'jquery': '版本2'
    //    }
    //},

    paths: {
        // lib
        'jquery': 'lib/jquery/jquery-3.1.0.min',
        'jquery.cookie': 'lib/jquery/jquery.cookie',
        'jquery.hammer': 'lib/jquery/jquery.hammer',
        'hammer': 'lib/jquery/hammer.min',

        'swiper': 'lib/swiper/swiper-3.4.2.jquery.min',

        'text' : 'requirejs/text',
        //'css' : 'requirejs/css.min',
        'bootstrap': 'lib/bootstrap/bootstrap-3.3.7.min',

        // app
        'script' : 'app/script'
    },

    shim: {
        //'bootstrap' : ['css!./lib/bootstrap/bootstrap-3.3.7.min.css'],
        //'swiper': ['css!./lib/swiper/swiper-3.4.2.min.css'],
        'jquery.cookie' : ['jquery']
    },

    //shim : {
    //    'moduleName' : {
    //        deps: ['jquery'],
    //        exports : '模块的全局变量',
    //        init: function(QQ) {
    //            return QQ;
    //        }
    //    },

    //    'bootstrap': ['jquery'],

    //    'modernizr': {
    //        exports: 'Modernizr'
    //    }
    //},

    waitSeconds: 30,
    urlArgs : '_=' + new Date().getTime()
});