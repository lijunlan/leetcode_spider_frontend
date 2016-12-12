/**
 * Created by junlanli on 12/12/16.
 */
var gulp = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    watch = require('gulp-watch'),
    less = require('gulp-less');

//js语法检查
gulp.task('jshint', function () {
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 定义一个编译less文件的任务
gulp.task('lessCompile', function () {
    gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('app/css/'));
});

//压缩css
gulp.task('cleanCss', function () {
    return gulp.src('app/css/*.css')    //需要操作的文件
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(cleanCss())   //执行压缩
        .pipe(gulp.dest('app/clean-css'));   //输出文件夹
});
//压缩,合并 js
gulp.task('minifyJs', function () {
    return gulp.src('app/js/*.js')      //需要操作的文件
        .pipe(concat('app.js'))    //合并所有js到main.js
        .pipe(gulp.dest('app/clean-js'))       //输出到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('app/clean-js'));  //输出
});

//监测css/js文件变化
gulp.task('watchCss', function () {
    gulp.watch('app/css/*.css', ['cleanCss']);
});
gulp.task('watchJs', function () {
    gulp.watch('app/js/*.js', ['minifyJs']);
});

// 定义一个监控less文件变化的任务
gulp.task('watchLess', function () {
    gulp.watch('app/less/*.less', ['lessCompile']);
});

//默认命令,在cmd中输入gulp后,执行的就是这个任务(压缩js需要在检查js之后操作)
gulp.task('default', ['jshint', 'lessCompile', 'watchCss', 'watchJs', 'watchLess'], function () {
    gulp.start('cleanCss', 'minifyJs');
});