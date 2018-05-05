// 进场音乐，单例

define([
    'text!../components/common/music.html!strip',
    'jquery.hammer',
    'helper/lakers'],
(htmlMusic) => {
    const world = myWorld;
    const laker = {};

    let audio = null;
    let switc = null;

    laker.mount = function(isPlaying) {
        if (!this.$root) {
            world.root.append(htmlMusic);
            this.$root = world.root.find('.sys-music');
            audio = this.$root.find('audio');
            switc = this.$root.find('.icon-music');

            // 设置初始状态样式
            isPlaying ? this.play() : this.pause();

            // 绑定事件
            handle();
        }
    };

    laker.playing = false;

    laker.show = () => {
        laker.$root.show();
    };

    laker.hide = () => {
        laker.$root.hide();
    };

    laker.play = () => {
        switc.removeClass('pause').addClass('play');
        audio[0].play();
        laker.playing = true;
    };

    laker.pause = () => {
        switc.removeClass('play').addClass('pause');
        audio[0].pause();
        laker.playing = false;
    };

    // 销毁
    laker.destroy = function() {
        this.$root.remove();
        this.$root = null;
    };

    // 绑定事件
    function handle() {
        switc.hammer().on('tap', () => {
            if (laker.playing) {
                laker.pause();
            } else { laker.play(); }
        });
    }

    world.lakers.$music = laker;
    return laker;
});
