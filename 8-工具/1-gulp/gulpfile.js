const gulp = require('gulp'), // 必须先引入gulp插件
    runSequence = require('run-sequence'),
    del = require('del'), // 文件删除
    sass = require('gulp-sass'), // sass 编译
    cached = require('gulp-cached'), // 缓存当前任务中的文件，只让已修改的文件通过管道
    uglify = require('gulp-uglify'), // js 压缩
    rename = require('gulp-rename'), // 重命名
    notify = require('gulp-notify'), // 相当于 console.log()
    filter = require('gulp-filter'), // 过滤筛选指定文件
    cssnano = require('gulp-cssnano'), // CSS 压缩
    htmlmin = require('gulp-htmlmin'), //html压缩
    fileinclude = require('gulp-file-include'), // 可以 include html 文件
    imagemin = require('gulp-imagemin'), //图片压缩
    pngquant = require('imagemin-pngquant'),
    postcss = require('gulp-postcss'), //px转成rem
    px2rem = require('postcss-px2rem'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'), //自动补全浏览器前缀
    concat = require('gulp-concat'), //代码合并
    browserSync = require('browser-sync').create(); // 保存自动刷新
gulp.task('default', function() {
    return runSequence(['clean-dev'], ['build_dev'],['serve', 'watch']);
});
gulp.task('clean-dev', function(callback) {
    return del('./dev/', callback);
});
gulp.task('clean-dist', function(callback) {
    return del('./dist/', callback);
});
gulp.task('build_dist',['clean-dist'], function(callback) {
    return runSequence(['dist-staticFiles', 'css', 'script', 'minhtml'], callback);
});
gulp.task('build_dev', function(callback) {
    return runSequence(['compass', 'fileinclude', 'staticFiles'], callback);
});
gulp.task('dist-staticFiles', function() {
    return gulp.src([
            './src/**/*.{js,css}',
            './src/fonts*/**/*.*',
            './src/images*/**/*.*'
        ])
        .pipe(gulp.dest('./dist/'));
});
gulp.task('compass', function() {
    const f = filter(['**', '!*src/css/**/*.min.css']);
    return gulp.src('./src/**/*.{scss,sass}')
        .pipe(sass())
        .pipe(gulp.dest('dev/css'))
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
});
gulp.task('css', ['compass'], function() {
    const processors = [px2rem({ remUnit: 100 })]; //把px转化成rem
    const f = filter(['**', '!*src/css/**/*.min.css']);
    return gulp.src('src/css/**/*.css')
        .pipe(cached('css'))
        //.pipe(postcss(processors)) //把px转化成rem
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(f)
        .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        //.pipe(concat('all.css'))//css合并
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css')) // 把管道里的所有文件输出到 dist/css 目录
});
gulp.task('script', function() {
    const f = filter(['**', '!*src/script/**/*.min.js']);
    return gulp.src(['src/script/**/*.js'])
        .pipe(cached('script'))
        .pipe(f) // 筛选出管道中的非 *.min.js 文件
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify()) //压缩js
        .pipe(gulp.dest('dist/script'))
});
gulp.task('staticFiles', function() {
    return gulp.src([
            './src/**/*.{js,css}',
            './src/fonts*/**/*.*',
            './src/images*/**/*.*'
        ])
        .pipe(gulp.dest('./dev/'));
});
gulp.task('fileinclude', function() { //这个依赖静态文件先拷贝完才执行
    // 适配page中所有文件夹下的所有html，排除page下的include文件夹中html
    return gulp.src('src/**/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dev'));
});
gulp.task('minhtml', ['fileinclude'], function() { //压缩html文件
    // 适配page中所有文件夹下的所有html，排除page下的include文件夹中html
    return gulp.src('dev/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true })) //压缩html,减少文件大小
        .pipe(gulp.dest('dist'));
});
gulp.task('px2rem', function() {
    var processors = [px2rem({ remUnit: 100 })];
    return gulp.src('dist/**/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist'));
});
//压缩图片
gulp.task('imagemin', function() {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            multipass: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});
// styleReload （结合 watch 任务，无刷新CSS注入）
gulp.task('styleReload', function() {
    return gulp.src(['dev/css/**/*.css'])
        .pipe(cached('style'))
        .pipe(browserSync.reload({ stream: true })); // 使用无刷新 browserSync 注入 CSS
});
gulp.task('serve', function() {
    browserSync.init({
        server: './dev',
        port: 88,
        "available": true, //开启自动刷新
    });
});
gulp.task('reload', function() {
    return browserSync.reload();
});
gulp.task('watch', function() {
    gulp.watch([
        './src/**/*.js',
        './src/images/**/*',
        './src/fonts/**/*'
    ], function() {
        return runSequence(['staticFiles'], ['reload']);
    });
    gulp.watch([
        './src/**/*.html'
    ], function() {
        return runSequence(['fileinclude'], ['reload']);
    });
     gulp.watch([
        './src/**/*.css'
    ], function() {
        return runSequence(['staticFiles'],['reload']);
    });
    // gulp.watch([
    //     './src/**/*.scss'
    // ], function() {
    //     return runSequence(['compass'], ['styleReload']);
    // });
});
