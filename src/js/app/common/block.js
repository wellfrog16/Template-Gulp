// 剧本

define([
    'text!../components/common/block.html!strip',
    'helper/lakers',
    'utils/sword'],
(htmlBlock) => {
    const world = myWorld;
    const laker = {};

    // 挂载
    laker.mount = function() {
        if (!this.$root) {
            world.root.append(htmlBlock);
            this.$root = world.root.find('.sys-block');
        }
    };

    laker.show = () => {
        laker.$root.show();
    };

    laker.hide = () => {
        laker.$root.hide();
    };

    laker.index = index => {
        if (world.sword.isNum(index)) {
            laker.$root.css('z-index', index);
        } else {
            laker.$root.removeAttr('z-index');
        }
    };

    // 销毁
    laker.destroy = function() {
        this.$root.remove();
        this.$root = null;
    };

    world.lakers.$block = laker;
    return laker;
});
