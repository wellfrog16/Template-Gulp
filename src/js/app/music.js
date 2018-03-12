define([
    'jquery',
    'helper/helper',
    'createjs',
    'text!../components/music.html!strip',
    'jquery.hammer'],
($, helper, createjs, htmlMusic) => {
    return (autoplay) => {
        $('body').append(htmlMusic);

        // 记录目前是否正在播放，全局
        helper.variable.flagPlay = autoplay;

        const el = $('.sys-music .toggle');
        const audio = $('#h5-bg');

        // 根据是否自动播放设置样式
        if (autoplay) {
            el.removeClass('pause').addClass('play');
        } else {
            el.removeClass('play').addClass('pause');
        }

        el.hammer().on('tap', () => {
            if (helper.variable.flagPlay) {
                pause();
            } else { play(); }
        });

        function play() {
            helper.variable.flagPlay = true;
            el.removeClass('pause').addClass('play');
            audio[0].play();
        }

        function pause() {
            helper.variable.flagPlay = false;
            el.removeClass('play').addClass('pause');
            audio[0].pause();
        }

        return audio;
    };
});
