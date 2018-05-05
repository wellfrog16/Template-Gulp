// createjs loader加载

define([
    'jquery',
    'pixi',
    'utils/spriteplayer',
    'source',
    'text!../components/common/loader.html!strip',
    'jquery.browser',
    'helper/lakers',
    'utils/sword'],
($, PIXI, spriteplayer, source, htmlLoader) => {
    const world = myWorld;
    const laker = {};

    // let callback = null;
    // let movie = null;

    // 挂载
    laker.mount = function(cb) {
        // callback = cb;
        // 如果小于ie9，则取消loading（createjs不支持）;
        if ($.browser.msie && $.browser.version < 9) {
            return cb();
        }

        this.preload();
    };

    // loader自己内容的预加载
    laker.preload = function() {
        const loader = new PIXI.loaders.Loader('assets/img/');

        for (const item of source.preload) {
            loader.add(item.src);
        }

        loader.load(() => {
            console.log('加载完成，播放逐帧动画');
            world.root.append(htmlLoader);
            this.$root = world.root.find('.sys-loader');

            setTimeout(() => {
                spriteplayer();
            }, 0);
            this.mainload();
        });
    };

    // 项目资源的预加载
    laker.mainload = function() {
        const loader = new PIXI.loaders.Loader('assets/img/');

        for (const item of source.preload) {
            loader.add(item.src);
        }

        loader.load((loader, resources) => {
            console.log('加载完成');
        });

        loader.onProgress.add(loader => {
            laker.$root.find('span').text(parseInt(loader.progress + 0.5) + ' %');
            laker.$root.find('.progress div').css('width', parseInt(loader.progress + 0.5) + '%');
        });
    };

    // 销毁
    laker.destroy = function() {
        this.$root.remove();
        this.$root = null;
    };

    // function createjsLoader() {

    // }

    world.lakers.$loader = laker;
    return laker;
});
