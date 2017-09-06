//导入工具包 require('node_modules里对应模块')
var del = require('del'),
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    //babel = require('gulp-babel'),
    cache = require('gulp-cache'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    htmlreplace = require('gulp-html-replace'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    less = require('gulp-less'),
    //notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    requirejsOptimize = require('gulp-requirejs-optimize'),
    revhash = require('gulp-rev-hash'),
    sequence = require('gulp-sequence'),
    uglify = require('gulp-uglify'),
    pump = require('pump');

// 清除发布目录
gulp.task('clean', function(cb){
    // 测试es6语法
    del(['dist']).then(()=>{ cb(); });
});

// 解析less文件
gulp.task('less', function(cb){
    gulp.src('src/style/main.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 3 versions', '>8%'],
            cascade: false,        // 美化属性，默认true
            add: true,             // 是否添加前缀，默认true
            remove: true,          // 删除过时前缀，默认true
            flexbox: true          // 为flexbox属性添加前缀，默认true
        }))
        .pipe(gulp.dest('./src/style'));
    cb();
});

// 合并压缩css文件
gulp.task('cleancss', function(cb){
    gulp.src([
        'src/style/*.css',
        'src/js/lib/swiper/*.css'
    ])
        .pipe(concat('main.css'))
        .pipe(cleanCSS())
        .pipe(rename(function(path){
            path.basename += '.min';
        }))
        .pipe(gulp.dest('dist/style'));
    //.pipe(notify('CSS合并压缩完成'));
    cb();
});

// 无损压缩图片
gulp.task('image', () =>
    gulp.src('src/asset/img/**/*')
        .pipe(cache(imagemin()))
        .pipe(gulp.dest('dist/asset/img'))
);

// 打开开发服务器
gulp.task('cdev', function() {
    // 开启监听
    gulp.start('watch');

    // 设置服务器
    connect.server({
        root: 'src',
        //livereload: true
    });
});

// 打开分发服务器
gulp.task('cdist', function() {
    connect.server({
        root: 'dist',
        //livereload: true
    });
});

// AMD解析打包
gulp.task('js:main', function () {
    gulp.src('src/js/app.js')
        .pipe(requirejsOptimize({
            mainConfigFile: 'src/js/requirejs/require.config.js'
        }))
        // .pipe(babel({  
        //     presets: ['es2015']  
        // }))
        // .pipe(uglify())
        .pipe(rename('main.min.js'))
        // .pipe(rename(function(path){
        //     path.basename += '.min';
        // }))
        .pipe(gulp.dest('dist/js'));
});


// requirejs合并
gulp.task('requirejs', function(cb) {

    pump([
        gulp.src(['src/js/requirejs/require.js', 'src/js/requirejs/require.config.js'])
            .pipe(concat('require.combine.js')),
        uglify(),
        gulp.dest('dist/js')
    ], cb);

});

// html替换压缩
gulp.task('htmlreplace', function(cb) {
    gulp.src('src/index.html')
        .pipe(htmlreplace({
            'js': ['js/require.combine.js', 'js/main.min.js'],
            'css': 'style/main.min.css'
        }))
        .pipe(revhash({assetsDir: 'dist'}))
        .pipe(htmlmin({
            removeComments: true,
            collapseWhitespace: false
        }))
        .pipe(gulp.dest('dist/'));

    cb();
});

// 监听less
gulp.task('watch', function(){
    gulp.watch('./src/style/**/*.less', ['less']);
});

// 组合操作
gulp.task('default', function(cb) {
    //gulp.start('js:main', 'requirejs', 'cleancss', 'image', 'htmlreplace');
    sequence('clean', ['js:main', 'requirejs', 'cleancss', 'image'], 'htmlreplace')(cb);
});