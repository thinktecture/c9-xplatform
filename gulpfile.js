var gulp = require('gulp'),
    config = require('./gulp.config');

var tasks = {
    del: require('del'),
    runSequence: require('run-sequence'),
    concat: require('gulp-concat'),
    cssmin: require('gulp-cssmin'),
    inject: require('gulp-inject'),
    htmlmin: require('gulp-htmlmin'),
    uglify: require('gulp-uglify'),
    typescript: require('gulp-typescript'),
    filelog: require('gulp-filelog'),
    electron: require('gulp-awesome-electron'),
    asar: require('gulp-asar'),
    package: require('./package'),
    install: require('gulp-install'),
    symdest: require('gulp-symdest'),
    sourceMaps: require('gulp-sourcemaps')
};


var gulpTasks = require('require-dir')(config.folders.gulptasks);

for (var gulpTask in gulpTasks) {
    gulpTasks[gulpTask].init(gulp, config, tasks);
}

gulp.task('build', function(done){
    tasks.runSequence('build-web', 'build-desktop', done);
});

gulp.task('default', function(done) {
    console.log('');
    console.log('execute one of the public tasks');
    console.log('');
    console.log(' - build: builds all platforms');
    for(var gulpTask in gulpTasks){
        var documentations = gulpTasks[gulpTask].docs;
        for (var i = 0; i < documentations.length; i++) {
            console.log(' - ' + documentations[i].name + ': ' + documentations[i].description);
        }

    }
});
