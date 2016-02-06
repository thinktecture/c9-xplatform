!function (module) {
    'use strict';

    var path = require('path');

    module.exports = {
        folders: {
            dist: {
                root: path.join('dist', 'frontend'),
                styles: path.join('dist', 'frontend', 'styles'),
                fonts: path.join('dist', 'frontend', 'fonts'),
                scripts: path.join('dist', 'frontend', 'scripts'),
                app: path.join('dist', 'frontend', 'app'),
                images: path.join('dist', 'frontend', 'images'),
                electron: {
                    root: path.join('dist', 'electron'),
                    win: path.join('dist', 'electron', 'win'),
                    osx: path.join('dist', 'electron', 'osx'),
                    linux: path.join('dist', 'electron', 'linux')
                }
            },
            temp: {
                root: '.temp',
                electron: path.join('.temp', 'electron')
            },
            gulptasks: path.join('.', 'gulptasks')
        },
        fileNames: {
            vendorCss: 'vendor.min.css',
            appCss: 'app.min.css',
            vendorJs: 'vendor.min.js',
            appJs: 'app.min.js',
            asarPackage: 'app.asar'

        },
        files: {
            electronDistFiles: path.join('dist', 'electron', '**', '*'),
            tempElectronManifest: path.join('.temp', 'electron', 'package.json'),
            injectables: [
                path.join('dist', 'frontend', 'styles', 'vendor.min.css'),
                path.join('dist', 'frontend', 'styles', 'app.min.css'),
                path.join('dist', 'frontend', 'scripts', 'jquery.min.js'),
                path.join('dist', 'frontend', 'scripts', 'bootstrap.min.js'),
                path.join('dist', 'frontend', 'scripts', 'system.src.js'),
                path.join('dist', 'frontend', 'scripts', 'reflect.js'),
                path.join('dist', 'frontend', 'scripts', 'zone.min.js'),
                path.join('dist', 'frontend', 'scripts', 'angular2.polyfills.js'),
                path.join('dist', 'frontend', 'scripts', 'Rx.js'),
                path.join('dist', 'frontend', 'scripts', 'angular2.dev.js'),
                path.join('dist', 'frontend', 'scripts', 'http.dev.js'),
                path.join('dist', 'frontend', 'scripts', 'router.dev.js'),
                path.join('dist', 'frontend', 'scripts', 'dashboard.js'),
                path.join('dist', 'frontend', 'scripts', 'fastclick.js')
            ],
            allDistFiles: path.join('dist', '**', '*'),
            sources: {
                asarFiles: [path.join('.temp', 'electron', '**', '*'), '!.temp/electron/package.json'],
                prebuildAppFiles: path.join('dist', 'frontend', '**', '*'),
                electronSourceFiles: path.join('src', 'electron', '**', '*'),
                electronSources: [
                    path.join('.temp', 'electron', 'app.asar'),
                    path.join('.temp', 'electron', 'package.json')
                ],
                imageFiles: path.join('src', 'frontend', 'assets', '**', '*'),
                htmlFiles: [
                    path.join('src', 'frontend', 'index.html')
                ],
                vendorJsFiles: [
                    path.join('node_modules', 'fastclick', 'lib', 'fastclick.js'),
                    path.join('node_modules', 'jquery', 'dist', 'jquery.min.js'),
                    path.join('node_modules', 'bootstrap', 'dist', 'js', 'bootstrap.min.js'),
                    path.join('node_modules', 'angular2', 'bundles', 'angular2-polyfills.js'),
                    path.join('node_modules', 'systemjs', 'dist', 'system.src.js'),
                    path.join('node_modules', 'rxjs', 'bundles', 'Rx.js'),
                    path.join('node_modules', 'angular2', 'bundles', 'angular2.dev.js'),
                    path.join('node_modules', 'angular2', 'bundles', 'http.dev.js'),
                    path.join('node_modules', 'angular2', 'bundles', 'router.dev.js'),
                    path.join('node_modules', 'reflect-metadata', 'reflect.js'),
                    path.join('node_modules', 'zone.js', 'dist', 'zone.min.js'),
                    path.join('src', 'frontend', 'dashboard.js')
                ],
                vendorCssFiles: [
                    path.join('src', 'frontend', 'css', 'vendor.css')
                ],
                vendorFontFiles: path.join('node_modules', 'font-awesome', 'fonts', '**', '*'),
                appCssFiles: [
                    path.join('src', 'frontend', 'css', 'main.css'),
                    path.join('src', 'frontend', 'css', 'custom.css')
                ],
                appJsFiles: [path.join('src', 'frontend', 'app', '**', '*.ts')],
                typescriptProjectFile: 'tsconfig.json',
                appTemplateFiles: path.join('src', 'frontend', 'app', '**', '*.html')
            }
        }
    };
}(module);
