const resources = {};

resources.preload = [
    { 'src': 'common/block/landscape.png' }
];

// loading 用雪碧图
for (let i = 1; i <= 66; i++) {
    let zero = '';
    for (let j = 0; j < 2 - i.toString().length; j++) {
        zero += '0';
    }

    resources.preload.push({ 'src': `common/loader/sprite/${zero + i}.jpg` });
}

resources.mainload = [
    { 'src': 'common/loader/sprite.jpg' }
];

define(resources);
