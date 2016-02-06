!function (module) {
    'use strict';

    function RegisterTasks(gulp, config, tasks) {
        gulp.task('private:clear-electron', function (done) {
            tasks.del.sync(config.files.electronDistFiles, {force: true});
            done();
        });

        gulp.task('private:package-app', function (done) {
            return gulp.src(config.files.sources.asarFiles)
                .pipe(tasks.asar(config.fileNames.asarPackage))
                .pipe(gulp.dest(config.folders.temp.electron));
        });

        gulp.task('private:collect-app-sources', function (done) {

            gulp.src(config.files.sources.electronSourceFiles)
                .pipe(gulp.dest(config.folders.temp.electron));

            return gulp.src(config.files.sources.prebuildAppFiles)
                .pipe(gulp.dest(config.folders.temp.electron));
        });

        gulp.task('private:install-app-dependencies', function (done) {
            return gulp.src(config.files.tempElectronManifest)
                .pipe(tasks.install());
        });

        gulp.task('private:build-windows-app', function (done) {
            return gulp.src(config.files.sources.electronSources)
                .pipe(tasks.electron({
                    version: '0.36.4',
                    platform: 'win32',
                    companyName: tasks.package.companyName,
                    copyright: tasks.package.copyright
                }))
                .pipe(tasks.symdest(config.folders.dist.electron.win));
        });

        gulp.task('private:build-linux-app', function (done) {
            return gulp.src(config.files.sources.electronSources)
                .pipe(tasks.electron({
                    version: '0.36.4',
                    platform: 'linux',
                    companyName: tasks.package.companyName,
                    copyright: tasks.package.copyright
                }))
                .pipe(tasks.symdest(config.folders.dist.electron.linux));
        });

        gulp.task('private:build-osx-app', function (done) {
            return gulp.src(config.files.sources.electronSources)
                .pipe(tasks.electron({
                    version: '0.36.4',
                    platform: 'darwin',
                    companyName: tasks.package.companyName,
                    copyright: tasks.package.copyright
                }))
                .pipe(tasks.symdest(config.folders.dist.electron.osx));
        });

        gulp.task('build-desktop', function (done) {
            return tasks.runSequence('private:clear-electron', 'private:collect-app-sources', 'private:install-app-dependencies', 'private:package-app', ['private:build-windows-app', 'private:build-osx-app', 'private:build-linux-app'], done);
        });
    }

    module.exports = {
        init: RegisterTasks,
        docs: [{
            name: 'build-desktop',
            description: 'builds the app for windows, osx and linux'
        }]
    };
}(module);
