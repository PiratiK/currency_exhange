'use_strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/'
    },
    src: { 
        html: 'src/*.html', 
        js: 'src/js/script.js',
        style: 'src/css/style.scss',
        img: 'src/img/**/*.*' 
    },
    watch: { 
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/css/**/*.scss',
        img: 'src/img/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "piratik"
};

gulp.task('html:build', function (callback) {
    gulp.src(path.src.html)
    	.pipe(rigger()) 
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
    callback();
});

gulp.task('js:build', function (callback) {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init()) 
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
    callback();
});

gulp.task('style:build', function (callback) {
    gulp.src(path.src.style) 
        .pipe(sourcemaps.init())
        .pipe(sass()) 
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
    callback();
});

gulp.task('image:build', function (callback) {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
    callback();
});

gulp.task('watch', function(callback){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    callback();
});

gulp.task('webserver', function (callback) {
    browserSync(config);
    callback();
});
