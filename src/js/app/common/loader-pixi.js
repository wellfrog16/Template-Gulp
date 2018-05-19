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

    let anim = null;

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

            let imgSource = [];

            for (let i = 1; i <= 66; i++) {
                let zero = '';
                for (let j = 0; j < 2 - i.toString().length; j++) {
                    zero += '0';
                }

                imgSource.push(`assets/img/common/loader/sprite/${zero + i}.jpg`);
            }

            anim = spriteplayer({
                target: $('.movie'),
                source: imgSource
            });

            // anim.loop = false;
            anim.cursor = 'pointer';
            // anim.scale = new PIXI.Point(0.1, 0.1);
            anim.animationSpeed = 0.12;
            anim.onLoop = function() {
                console.log('循环');
            };
            anim.onComplete = function() {
                console.log('finished');
            };
            anim.onFrameChange = function() {
                console.log(anim.currentFrame);
            };
            anim.play();
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
            anim.destroy();
            this.destroy();
            // anim.stop();
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

    world.lakers.$loader = laker;
    return laker;
});
