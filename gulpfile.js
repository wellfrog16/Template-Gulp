//导入工具包 require('node_modules里对应模块')
var del = require('del'),
    gulp = require('gulp'),
    pump = require('pump'),
    $ = require('gulp-load-plugins')();

// 清除发布目录
gulp.task('clean', (cb) =>{
    // 测试es6语法
    del(['dist']).then(() =>{ cb(); });
});

// 解析less文件
gulp.task('less', (cb) =>{
    const lessFilter = $.filter(['**/*.less', '!*src/style/common.less']);

    gulp.src('src/style/*.less')
        .pipe(lessFilter)        
        // .pipe(cssUnit({
        //     type: 'px-to-vw',
        //     width: 750
        // }))
        .pipe($.cssUnit({
            type: 'px-to-rem',
            rootSize: 50,
            ignore: 1       // 非转换需要设置为，如10px 写成10*1px;
        }))
        .pipe($.less())
        .pipe($.autoprefixer({
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
gulp.task('cleancss', (cb) =>{
    gulp.src([
        'src/style/*.css',
    ])
        .pipe($.concat('main.css'))
        .pipe($.cleanCss())
        .pipe($.rename(function(path){
            path.basename += '.min';
        }))
        .pipe(gulp.dest('dist/style'));
    //.pipe($.notify('CSS合并压缩完成'));
    cb();
});

// 无损压缩图片
gulp.task('image', () =>
    gulp.src('src/assets/img/**/*')
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest('dist/assets/img'))
);

// copy 视音频
gulp.task('audio', () =>
    gulp.src(['src/assets/audio/**/*', 'src/assets/audio/**/*'])
        .pipe(gulp.dest('dist/asset'))
);

// AMD解析打包
gulp.task('js:main', () =>
    gulp.src('src/js/app.js')
        .pipe($.requirejsOptimize({
            mainConfigFile: 'src/js/requirejs/require.config.js'
        }))
        .pipe($.rename('main.min.js'))
        // .pipe(rename(function(path){
        //     path.basename += '.min';
        // }))
        .pipe(gulp.dest('dist/js'))
);


// requirejs合并
gulp.task('requirejs', (cb) =>{

    pump([
        gulp.src(['src/js/requirejs/require.js', 'src/js/requirejs/require.config.js'])
            .pipe($.concat('require.combine.js')),
        $.uglify(),
        gulp.dest('dist/js')
    ], cb);
});

// i18n
gulp.task('i18n', (cb) =>{
    gulp.src('src/js/nls/**/*.*')
        .pipe(gulp.dest('dist/js/nls'));
    cb();
});

// html替换压缩
gulp.task('htmlreplace', (cb) =>{
    gulp.src('src/index.html')
        .pipe($.htmlReplace({
            'js': ['js/require.combine.js', 'js/main.min.js'],
            'css': 'style/main.min.css'
        }))
        .pipe($.revHash({assetsDir: 'dist'}))
        .pipe($.htmlmin({
            removeComments: true,
            collapseWhitespace: false
        }))
        .pipe(gulp.dest('dist/'));

    cb();
});

// 生成es5，处理深度：0
gulp.task('es5:app', ()=>
    gulp.src('src/js/app/*.js')
        .pipe($.cache($.babel({
            presets: ['es2015']
        })))
        .pipe(gulp.dest('./src/js/app-es5'))
);

gulp.task('es5:helper', ()=>
    gulp.src('src/js/lib/helper/*.js')
        .pipe($.cache($.babel({
            presets: ['es2015']
        })))
        .pipe(gulp.dest('./src/js/lib/helper-es5'))
);


// 打开开发服务器
gulp.task('cdev', ['watch', 'es5:helper', 'es5:app', 'less'], () =>
    // 设置服务器
    $.connect.server({
        root: 'src',
        livereload: true,
        port: 8001
    })
);

// 打开分发服务器
gulp.task('cdist', () =>
    $.connect.server({
        root: 'dist'
    })
);

gulp.task('liveReload', ()=>
    gulp.src('./src/**/*.html')
        .pipe($.connect.reload())
);

// 监听less和es6
gulp.task('watch', () =>{
    // less
    gulp.watch('./src/style/**/*.less', ['less']);

    // es5
    gulp.watch('./src/js/app/*.js', ['es5:app']);
    gulp.watch('./src/js/lib/helper/*.js', ['es5:helper']);

    // 自动刷新
    gulp.watch(['./src/**/*.*', '!./src/**/helper/*.js', '!./src/**/app/*.js', '!./src/**/*.less'], ['liveReload']);
});

// 组合操作
gulp.task('default', (cb) =>{
    //gulp.start('js:main', 'requirejs', 'cleancss', 'image', 'htmlreplace');
    $.sequence('clean', ['less', 'es5:helper', 'es5:app'], ['js:main', 'requirejs', 'cleancss', 'image', 'audio'], 'htmlreplace')(cb);
    //$.sequence('clean', ['js:main', 'requirejs', 'cleancss', 'i18n', 'image'], 'htmlreplace')(cb);
});

// 转换为es5
gulp.task('es5', () =>
    gulp.start('es5:helper', 'es5:app')
);