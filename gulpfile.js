//导入工具包 require('node_modules里对应模块')
const gulp = require('gulp');
const del = require('del');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const distDev = './dist/dev';
const distBuild = './dist/build';

const jsFolders = ['utils', 'helper', 'js', 'modules'];

// 参考vue，es6解析设置
const presets = [
    ['env', {
        'modules': false
    }],
    'stage-2'
];

const path = {
    js : ['./src/js/**/*.js', './src/js/helper/**/*.js', './src/js/utils/**/*.js'],
    module: ['./src/modules/**/*.js'],
    html: ['./src/*.html']
}

// dev服务器
gulp.task('server', ['watch'], () => {
    browserSync.init({
        server: {
            baseDir: "./dist/dev"
        }
    });
});


// 监听
gulp.task('watch', () => {

    // gulp.watch(path.html).on('change', reload);

    // 监听html变化
    gulp.watch('./src/**/*.html', ['move-html']);

    // 监听js模块变化
    for (const key of jsFolders) {
        gulp.watch(`./src/${key}/**/*.*`, [`move-${key}`]);
    }
});

gulp.task('dev', (cb) => {
    // $.sequence('clean-dev', ['move-html', 'move-modules', 'move-utils', 'move-helper', 'move-js'], 'server')(cb);
    $.sequence('clean-dev', ['move-html', 'move-modules', 'move-utils', 'move-helper', 'move-js'], 'server')(cb);
});

// 移动html
gulp.task('move-html', () => {
    gulp.src('./src/**/*.html')
        .pipe($.changed(distDev))
        .pipe(gulp.dest(distDev))
        .pipe(reload({stream: true}));
});

// 移动modules
gulp.task('move-modules', () => {
    gulp.src('./src/modules/**/*.*')
        .pipe($.changed(`${distDev}/modules`))
        .pipe(gulp.dest(`${distDev}/modules`))
        .pipe(reload({stream: true}));
});

// 移动和eslint：utils, helper, js
for (const key of jsFolders.slice(0, 3)) {
    // 移动
    gulp.task(`move-${key}`, [`eslint-${key}`], () => {
        gulp.src(`./src/${key}/**/*.*`)
            .pipe($.cache($.babel({ presets })))
            .pipe($.changed(`${distDev}/${key}`))
            .pipe(gulp.dest(`${distDev}/${key}`))
            .pipe(reload({stream: true}));
    });

    // eslint检查
    gulp.task(`eslint-${key}`, () => {
        return gulp.src(`./src/${key}/**/*.*`)
            .pipe($.eslint())
            .pipe($.eslint.formatEach())
            .pipe($.eslint.failAfterError())
    });
}

// 清空文件夹
gulp.task('clean-dev', (cb) => del([distDev], cb));
gulp.task('clean-build', (cb) => del([distBuild], cb));