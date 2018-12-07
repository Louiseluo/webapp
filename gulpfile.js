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
        .pipe(gulp.dest(app.proPath + "vendor"));//写文件dest
});

gulp.task('html',function () {
    gulp.src(app.srcPath + '**/*.html')
        .pipe(gulp.dest(app.devPath ))
        .pipe(gulp.dest(app.proPath ))
});

gulp.task('json',function () {
    gulp.src(app.srcPath + 'data/**/*.json')
        .pipe(gulp.dest(app.devPath +'data'))
        .pipe(gulp.dest(app.proPath +'data'))
});

gulp.task('less',function () {
    gulp.src(app.srcPath + 'style/index.less')
        .pipe($.less())
        .pipe(gulp.dest(app.devPath +'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.proPath +'css'))
});

gulp.task('js',function () {
    gulp.src(app.srcPath + 'script/**/*.js')
        .pipe($.con)
        .pipe(gulp.dest(app.devPath +'data'))
        .pipe(gulp.dest(app.proPath +'data'))
});
