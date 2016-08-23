const gulp = require('gulp'), // 必须先引入gulp插件
    runSequence = require('run-sequence'),
    del = require('del'), // 文件删除
    //sass = require('gulp-sass'), // sass 编译
    compass = require('gulp-compass'),
    cached = require('gulp-cached'), // 缓存当前任务中的文件，只让已修改的文件通过管道
    uglify = require('gulp-uglify'), // js 压缩
    rename = require('gulp-rename'), // 重命名
    notify = require('gulp-notify'), // 相当于 console.log()
    filter = require('gulp-filter'), // 过滤筛选指定文件
    cssnano = require('gulp-cssnano'), // CSS 压缩
    browserSync = require('browser-sync').create() // 保存自动刷新
gulp.task('default', function() {
    return runSequence(['clean'], ['build'], ['serve', 'watch']);
});

gulp.task('clean', function(callback) {
    return del('./dist/', callback);
});

gulp.task('build', function(callback) {
    return runSequence(['compass', 'script', 'staticFiles'], callback);
});

gulp.task('compass', function() {
    return gulp.src('./src/**/*.{scss,sass}')
        .pipe(compass({
            config_file: './config.rb',
            css: 'src/css',
            sass: 'src/sass'
        }))
        .pipe(gulp.dest('dist/css')) // 输出到 dist/css 目录下（不影响此时管道里的文件流）
        .pipe(rename({ suffix: '.min' })) // 对管道里的文件流添加 .min 的重命名
        .pipe(cssnano()) // 压缩 CSS
        .pipe(gulp.dest('dist/css')) // 输出到 dist/css 目录下，此时每个文件都有压缩（*.min.css）和未压缩(*.css)两个版本
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
});

gulp.task('script', function() {
    const f = filter(['*', '!*.min.css']);
    return gulp.src(['src/script/**/*.js'])
        .pipe(cached('script'))
        .pipe(gulp.dest('dist/script'))
        //.pipe(f) // 筛选出管道中的非 *.min.js 文件
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify()) //压缩js
        .pipe(gulp.dest('dist/script'))
});

gulp.task('staticFiles', function() {
    return gulp.src([
            './src/**/*.html',
            './src/fonts*/**/*.*',
            './src/images*/**/*.*'
        ])
        .pipe(gulp.dest('./dist/'));
})

gulp.task('serve', function() {
    browserSync.init({
        server: './dist',
        port: 8
    });
});

gulp.task('reload', function() {
    return browserSync.reload();
});

gulp.task('watch', function() {
    return gulp.watch([
        './src/**/*.html',
        './src/**/*.js',
        './src/**/*.scss'
    ], function() {
        return runSequence(['build'], ['reload']);
    })
});
