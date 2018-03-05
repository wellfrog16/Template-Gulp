//导入工具包 require('node_modules里对应模块')
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const path = {
    js : ['./src/js/**/*.js', './src/js/helper/**/*.js', './src/js/utils/**/*.js'],
    module: ['./src/modules/**/*.js']
}

// 打开开发服务器
gulp.task('dev', ['eslint', 'watch'], () =>
    // 设置服务器
    $.connect.server({
        root: 'src',
        livereload: true,
        port: 8001
    })
);

// 监听
gulp.task('watch', () => {

    // 自动刷新
    gulp.watch(['./src/**/*.*'], ['liveReload']);

    // 规范检查
    gulp.watch(path.js, ['eslint']);
});

// 刷新
gulp.task('liveReload', () =>
    gulp.src('./src/**/*.html')
        .pipe($.connect.reload())
);

// js规范检查
gulp.task('eslint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(path.js)
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe($.eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe($.eslint.formatEach())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe($.eslint.failAfterError());
});