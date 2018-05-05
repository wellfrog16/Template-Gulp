require(['jquery', 'script', 'helper/lakers'], ($, script) => {
    const world = window.myWorld;

    // 设置根节点
    world.root = $('body');
    script(1);

    // 路由
    // var a = function(){
    //     console.log('aaaaaaa');
    // }

    // var b = function(x){
    //     console.log(x);
    // }

    // var routes = {
    //     '/': script,
    //     '/a': [a, function() {
    //         console.log("An inline route handler.");
    //     }],
    //     '/b/:bookId': b
    // };

    // var router = Router(routes);

    // router.init();
});
