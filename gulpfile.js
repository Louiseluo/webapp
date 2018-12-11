var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
    srcPath:'src/',
    devPath:'build/',
    proPath:'dist/'
};

gulp.task('lib',function () {//定义任务
    gulp.src('bower_components/**/*.js')//读取文件
        .pipe(gulp.dest(app.devPath + "vendor"))//写文件dest
        .pipe(gulp.dest(app.proPath + "vendor"))//写文件dest
        .pipe($.connect.reload())
});

gulp.task('html',function () {
    gulp.src(app.srcPath + '**/*.html')
        .pipe(gulp.dest(app.devPath ))
        .pipe(gulp.dest(app.proPath ))
        .pipe($.connect.reload())
});

gulp.task('json',function () {
    gulp.src(app.srcPath + 'data/**/*.json')
        .pipe(gulp.dest(app.devPath +'data'))
        .pipe(gulp.dest(app.proPath +'data'))
        .pipe($.connect.reload())
});

gulp.task('less',function () {
    gulp.src(app.srcPath + 'style/index.less')
        .pipe($.less())
        .pipe(gulp.dest(app.devPath +'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.proPath +'css'))
        .pipe($.connect.reload())
});

gulp.task('js', function() {
    gulp.src(app.srcPath + 'script/**/*.js')
        .pipe($.plumber())
        .pipe($.concat('index.js'))
        .pipe(gulp.dest(app.devPath + 'js'))
        .pipe($.uglify())
        .pipe(gulp.dest(app.proPath + 'js'))
        .pipe($.connect.reload());
});

gulp.task('image',function () {
    gulp.src(app.srcPath + 'image/**/*')
        .pipe(gulp.dest(app.devPath +'image'))
        .pipe($.imagemin())
        .pipe(gulp.dest(app.proPath +'image'))
        .pipe($.connect.reload())
});

gulp.task('build',['image','js','less','lib','html','json']);
gulp.task('clean',function () {
    gulp.src([app.devPath,app.proPath])
        .pipe($.clean())
});

gulp.task('server',['build'],function () {
    $.connect.server({
        root:[app.devPath],
        livereload:true,
        port:1234
    });

    open('http://localhost:1234');

    gulp.watch('bower_components/**/*', ['lib']);
    gulp.watch(app.srcPath + '**/*.html', ['html']);
    gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
    gulp.watch(app.srcPath + 'style/**/*.less', ['less']);
    gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
    gulp.watch(app.srcPath + 'image/**/*', ['image']);
});
gulp.task('default',['server'])
