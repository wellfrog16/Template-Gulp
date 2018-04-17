define([
    'jquery',
    'helper/helper',
    'createjs',
    'text!../components/music.html!strip',
    'jquery.hammer'],
($, helper, createjs, htmlMusic) => {
    return (autoplay) => {
        $('body').append(htmlMusic);

        const el = $('.sys-music .toggle i');
        const audio = $('#h5-bg');

        const handle = {
            playing: autoplay,
            play() {
                handle.playing = true;
                el.removeClass('pause').addClass('play');
                audio[0].play();
            },
            pause() {
                handle.playing = false;
                el.removeClass('play').addClass('pause');
                audio[0].pause();
            }
        };

        // 根据是否自动播放设置样式
        if (handle.playing) {
            el.removeClass('pause').addClass('play');
        } else {
            el.removeClass('play').addClass('pause');
        }

        el.hammer().on('tap', () => {
            if (handle.playing) {
                handle.pause();
            } else { handle.play(); }
        });

        return handle;
    };
});
