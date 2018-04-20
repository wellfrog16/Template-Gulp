// 剧本

define([
    'jquery',
    'helper/lakers.js',
    'text!../components/block.html!strip'],
($, lakers, htmlBlock) => {
    const laker = {};

    // 挂载
    laker.mount = function() {
        if (!this.$root) {
            lakers.$root.append(htmlBlock);
            this.$root = lakers.$root.find('.sys-block');
        }
    };

    laker.show = () => {
        laker.$root.show();
    };

    laker.hide = () => {
        laker.$root.hide();
    };

    // 销毁
    laker.destroy = function() {
        this.$root.remove();
        this.$root = null;
    };

    lakers.$root = laker;
    return laker;
});
