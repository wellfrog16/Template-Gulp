// 剧本

define([
    'jquery',
    'block',
    'music',
    'loader',
    'video',
    'index',
    'utils/sword'],
($) => {
    return () => {
        const world = window.myWorld;
        const sword = world.sword;
        // 加载jquery插件
        sword.jqueryPlugins();
        // 自动修正rem
        sword.fixRem();

        // 如果是手机端，加载横屏提示
        if (!sword.isPC) { world.lakers.$block.mount(); }

        world.lakers.$music.mount(false);
        world.lakers.$loader.mount(() => {
            console.log('回调');
            // world.lakers.$video.mount($('body'));
            world.rivers.$index.mount();
        });
    };
});
