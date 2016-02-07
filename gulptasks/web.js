! function(module) {
    'use strict';

    function RegisterTasks(gulp, config, tasks) {


        gulp.task('build-web', function(done) {
            return tasks.runSequence('clean', ['private:build-app-css', 'private:build-vendor-css', 'private:build-vendor-fonts', 'private:build-app-js', 'private:build-vendor-js', 'private:copy-app-templates'], 'private:copy-images', 'private:build-index-html', done);
        });

        gulp.task('watch-web', function(done){
            gulp.watch(config.files.allFrontendSources, ['build-web']);
        });

        gulp.task('private:build-vendor-css', function(done) {
            return gulp.src(config.files.sources.vendorCssFiles)
                .pipe(tasks.concat(config.fileNames.vendorCss))
                .pipe(tasks.cssmin())
                .pipe(gulp.dest(config.folders.dist.styles));
        });

        gulp.task('private:build-vendor-js', function(done) {
            return gulp.src(config.files.sources.vendorJsFiles)
                //.pipe(tasks.uglify())
                .pipe(gulp.dest(config.folders.dist.scripts));
        });

        gulp.task('private:build-index-html', function(done) {
            var injectables = gulp.src(config.files.injectables);
            return gulp.src(config.files.sources.htmlFiles)
                .pipe(tasks.inject(injectables, {
                    ignorePath: 'dist/frontend',
                    addRootSlash: false
                }))
                .pipe(tasks.htmlmin({
                    collapseWhitespace: true
                }))
                .pipe(gulp.dest(config.folders.dist.root));
        });

        gulp.task('private:copy-images', function(done) {
            return gulp.src(config.files.sources.imageFiles)
                .pipe(gulp.dest(config.folders.dist.images));

        });
        gulp.task('private:build-vendor-fonts', function(done) {
            return gulp.src(config.files.sources.vendorFontFiles)
                .pipe(gulp.dest(config.folders.dist.fonts));

        });

        gulp.task('private:build-app-css', function(done) {
            return gulp.src(config.files.sources.appCssFiles)
                .pipe(tasks.concat(config.fileNames.appCss))
                .pipe(tasks.cssmin())
                .pipe(gulp.dest(config.folders.dist.styles));
        });

        gulp.task('private:copy-app-templates', function(done) {
            return gulp.src(config.files.sources.appTemplateFiles)

            .pipe(gulp.dest(config.folders.dist.app));
        });
        gulp.task('private:build-app-js', function(done) {
            var project = tasks.typescript.createProject(config.files.sources.typescriptProjectFile);
            var tsResult = project.src()
                .pipe(tasks.sourceMaps.init())
                .pipe(tasks.typescript(project));

            return tsResult.js.pipe(tasks.sourceMaps.write('.'))
                .pipe(gulp.dest(config.folders.dist.app));

        });
    }

    module.exports = {
        init: RegisterTasks,
        docs: []
    };

}(module);
