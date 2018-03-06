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

    // 监听less变化
    gulp.watch('./src/style/**/*.less', ['move-css']);

    // 监听i18n变化
    gulp.watch('./src/nls/**/*.js', ['move-i18n']);

    // 监听image变化
    gulp.watch('./src/assets/img/**/*.*', ['move-image']);

    // 监听audio变化
    gulp.watch('./src/assets/audio/**/*.*', ['move-audio']);

    // 监听video变化
    gulp.watch('./src/assets/video/**/*.*', ['move-video']);

    // 监听js模块变化
    for (const key of jsFolders) {
        gulp.watch(`./src/${key}/**/*.*`, [`move-${key}`]);
    }
});

gulp.task('dev', (cb) => {
    // $.sequence('clean-dev', ['move-html', 'move-modules', 'move-utils', 'move-helper', 'move-js'], 'server')(cb);
    $.sequence('clean-dev', ['move-html', 'move-modules', 'move-utils', 'move-helper', 'move-js', 'move-i18n', 'move-css', 'move-image', 'move-audio', 'move-video'], 'server')(cb);
});

// 移动html
gulp.task('move-html', () => 
    gulp.src('./src/**/*.html')
        .pipe($.changed(distDev))
        .pipe(gulp.dest(distDev))
        .pipe(reload({stream: true}))
);

// 移动css
gulp.task('move-css', ['stylelint'], () => 
    gulp.src('./src/style/main.less')
        .pipe($.cssUnit({
            type: 'px-to-rem',
            rootSize: 50,
            ignore: 1       // 非转换需要设置为，如10px 写成10*1px;
        }))
        .pipe($.less())
        .pipe($.autoprefixer({
            browsers: ['last 3 versions', '>8%'],
            cascade: false,        // 美化属性，默认true
        }))
        .pipe($.changed(`${distDev}/style`))
        .pipe(gulp.dest(`${distDev}/style`))
        .pipe(reload({stream: true}))
);

// stylelint检查
gulp.task(`stylelint`, () => 
    gulp.src(`./src/style/**/*.@(less|css)`)
        .pipe($.stylelint({
            failAfterError: true,
            reporters: [
                {formatter: 'string', console: true}
            ]
        }))
);

// 移动非es6常规数据
gulp.task('move-normal', () => 
    gulp.src('./src/js/@(lib|nls)/**/*.*')
        .pipe($.changed(`${distDev}/js`))
        .pipe(gulp.dest(`${distDev}/js`))
        .pipe(reload({stream: true}))
);

// 移动modules
gulp.task('move-modules', () => 
    gulp.src('./src/modules/**/*.*')
        .pipe($.changed(`${distDev}/modules`))
        .pipe(gulp.dest(`${distDev}/modules`))
        .pipe(reload({stream: true}))
);

// 移动和eslint：utils, helper, js
for (const key of jsFolders.slice(0, 3)) {
    // 移动
    gulp.task(`move-${key}`, [`eslint-${key}`], () => 
        gulp.src(`./src/${key}/**/*.*`)
            .pipe($.cache($.babel({ presets })))
            .pipe($.changed(`${distDev}/${key}`))
            .pipe(gulp.dest(`${distDev}/${key}`))
            .pipe(reload({stream: true}))
    );

    // eslint检查
    gulp.task(`eslint-${key}`, () => 
        gulp.src(`./src/${key}/**/*.*`)
            .pipe($.eslint())
            .pipe($.eslint.formatEach())
            .pipe($.eslint.failAfterError())
    );
}

// i18n
gulp.task('move-i18n', () =>{
    gulp.src('./src/nls/**/*.*')
        .pipe($.changed(`${distDev}/nls`))
        .pipe(gulp.dest(`${distDev}/nls`))
        .pipe(reload({stream: true}))
});

// 移动并无损压缩图片
gulp.task('move-image', () =>
    gulp.src('./src/assets/img/**/*.@(jpg|jpeg|png|git)')
        .pipe($.cache($.imagemin()))
        .pipe($.changed(`${distDev}/assets/img`))
        .pipe(gulp.dest(`${distDev}/assets/img`))
        .pipe(reload({stream: true}))
);

// 视频音频，发布最好改成外链，而不是直接使用本地资源
// 移动音频，如果在本地的话。注意.gitignore
gulp.task('move-audio', () =>
    gulp.src(['src/assets/audio/**/*'])
        .pipe($.changed(`${distDev}/assets/audio`))
        .pipe(gulp.dest(`${distDev}/assets/audio`))
        .pipe(reload({stream: true}))
);

// 移动视频
gulp.task('move-video', () =>
    gulp.src(['src/assets/video/**/*'])
        .pipe($.changed(`${distDev}/assets/video`))
        .pipe(gulp.dest(`${distDev}/assets/video`))
        .pipe(reload({stream: true}))
);

// 清空文件夹
gulp.task('clean-dev', (cb) => del([distDev], cb));
gulp.task('clean-build', (cb) => del([distBuild], cb));


// -----------------------------------------------------------------
// build
// -----------------------------------------------------------------

// AMD解析打包
gulp.task('abc', () =>
    gulp.src('./dev/**/*.js')
        .pipe($.requirejsOptimize({
            mainConfigFile: './dev/modules/requirejs/require.config.js'
        }))
        // .pipe($.rename('main.min.js'))
        // .pipe(rename(function(path){
        //     path.basename += '.min';
        // }))
        .pipe(gulp.dest('./dist/build'))
);