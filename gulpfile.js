'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    newer = require('gulp-newer'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    postcssPartialImport = require('postcss-partial-import'),
    cssbeautify = require('gulp-cssbeautify'),
    concat = require('gulp-concat'),
    uncss = require('gulp-uncss'),
    csscomb = require('gulp-csscomb'),
    unusedImages = require('gulp-unused-images'),
    jade = require('gulp-jade'),
    cleanCSS = require('gulp-clean-css');



var processors = [
    postcssPartialImport

];




var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        jade: 'src/*.jade',
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        plugin: 'src/style/plugins.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        jade: 'src/**/*.jade',
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('jade:build', function(){
    gulp.src(path.src.jade)
        .pipe(plumber())
        .pipe(jade({
            pretty: '\t'
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}))
        .pipe(browserSync.stream());
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest(path.build.js));

    gulp.src(path.src.js)
        .pipe(rigger())

        /*  .pipe(uglify())*/

        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
 /*   gulp.src(path.src.plugin)
        .pipe(plumber())
        .pipe(postcss(processors))
        /!*.pipe(rigger())*!/
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}))
        .pipe(browserSync.stream());*/


    gulp.src(path.src.style)
        /*.pipe(rigger())*/
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sass({
            includePaths: ['src/style/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(uncss({
        html: [path.build.html+'*.html','http://localhost:9000'],
            outtime:2000,
            ignore: ['.overflow-hidden', /(#|\.)fancybox(\-[a-zA-Z]+)?/]
        }))
        .pipe(cleanCSS({keepBreaks:true,compatibility: 'ie9'}))
        .pipe(prefixer({browsers: ['last 5 version']}))
       /* .pipe(csscomb())*/

        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}))
        .pipe(browserSync.stream());

    /*gulp.src([path.build.css+'/plugins.css',path.build.css+'/main.css'])

        .pipe(concat('style.css'))
        .pipe(gulp.dest(path.build.css))
        /!*  .pipe(uncss({
         html: [path.build.html+'*.html']
         }))*!/
        /!*     .pipe(postcss(processors))*!/
        .pipe(cleanCSS({keepBreaks:true,compatibility: 'ie8'}))
        .pipe(prefixer({browsers: ['last 30 version']}))
        .pipe(csscomb())
        /!*  .pipe(cssbeautify({
         indent: '   ',
         /!*openbrace: 'separate-line',*!/
         autosemicolon: true
         }))*!/
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));*/
});




gulp.task('image:build', function () {
     gulp.src(path.src.img)
        .pipe(newer(path.build.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));


});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'jade:build',
   /* 'html:build',*/
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('image:filter', function () {
    return gulp.src([path.build.img+'**/*', path.build.css+'*.css', path.build.html+'*.html'])
        .pipe(plumber())
        .pipe(unusedImages({}))
        .pipe(plumber.stop());


});




gulp.task('watch', function(){
    watch([path.watch.jade], function(event, cb) {
        gulp.start('jade:build');
    });
   /* watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });*/
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });

});


gulp.task('default', ['build', 'webserver', 'watch']);

