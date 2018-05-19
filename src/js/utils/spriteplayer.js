define(['jquery', 'pixi'], ($, PIXI) => {
    var self = options => {
        var args = {
            target: null,                  // 对象
            source: null                   // 图片资源地址数组
        };

        $.extend(args, options);

        const width = args.target.width();
        const height = args.target.height();

        var app = new PIXI.Application(width, height, { transparent: true });
        args.target.append(app.view);

        var frames = [];

        for (const img of args.source) {
            frames.push(PIXI.Texture.fromImage(img));
        }

        var anim = new PIXI.extras.AnimatedSprite(frames);
        anim.width = width;
        anim.height = height;
        anim.anchor.set(0);
        app.stage.addChild(anim);
        // anim.gotoAndStop(30);
        // anim.play();

        return anim;
    };

    return self;
});
