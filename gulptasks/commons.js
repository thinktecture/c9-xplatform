!function (module) {
    'use strict';

    function RegisterTasks(gulp, config, tasks) {
        gulp.task('clean', function (done) {
            tasks.del.sync(config.files.allDistFiles, {
                force: true
            });
            done();
        });
    }

    module.exports = {
        init: RegisterTasks,
        docs: []
    };
}(module);
