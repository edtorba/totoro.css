const { watch, src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const webserver = require('gulp-webserver');

function css() {
  return src('../totoro.scss')
    .pipe(sass.sync({
      includePaths: ['../node_modules']
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('build'));
}

function server() {
  return src('../tests')
    .pipe(webserver({
      livereload: true
    }));
}

function watcher() {
  const stalker = watch(['../*.scss', '../scss/**/*.scss']);

  stalker.on('change', css);
}

exports.css = css;
exports.server = server;
exports.watcher = watcher;
exports.default = parallel(css, watcher, server);
