define(['jquery', 'pixi'], ($, PIXI) => {
    var self = () => {
        var app = new PIXI.Application($('.movie').width(), $('.movie').height(), { transparent: true });
        $('.movie')[0].appendChild(app.view);

        var frames = [];

        for (let i = 1; i <= 66; i++) {
            let zero = '';
            for (let j = 0; j < 2 - i.toString().length; j++) {
                zero += '0';
            }

            frames.push(PIXI.Texture.fromFrame(`./assets/img/common/loader/sprite/${zero + i}.jpg`));
        }

        var anim = new PIXI.extras.AnimatedSprite(frames);
        anim.width = $('.movie').width();
        anim.height = $('.movie').height();
        // anim.anchor.set(0.5);
        anim.animationSpeed = 0.15;
        app.stage.addChild(anim);
        anim.play();
    };

    return self;
});
