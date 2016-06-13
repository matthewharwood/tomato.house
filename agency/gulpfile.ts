/**
 * Created by matthewharwood on 5/21/2016.
 */
import {Gulpclass, Task, SequenceTask} from "gulpclass/Decorators";


let gulp = require('gulp');
let del = require('del');
let ts = require('gulp-typescript');
let browserSync = require('browser-sync').create();
let reload = browserSync.reload;
let pug = require('gulp-pug');

@Gulpclass()
export class Gulpfile {
  private dist: string;
  private src: string;
  private indexDist: string;

  constructor(){
    this.dist = './dist/';
    this.src = './src/';
    this.indexDist = './dist/client/app/'
  }

  @Task()
  clean(cb: Function) {
    return del([`${this.dist}**`], cb);
  }

  @Task('sync')
  sync() {
    browserSync.init(null, {
      proxy: 'http://localhost:1337',
      files: [`${this.dist}/client/**/*.{html,css,js}`],
      browser: 'google chrome',
      port: 7002
    });
  }

  @Task('copy-source-files')
  copySourceFiles() {
    return gulp.src([`${this.src}**/*.{png,gif,jpg,html,css}`])
        .pipe(gulp.dest(`${this.dist}`));
  }

  @Task('file-source-watcher')
  watcher() {
    gulp.watch(`${this.src}/**/*.{png,gif,jpg,html,pug,js,ts,css}`, ['run']);
  }

  @Task('pug')
  pug() {
    var options = {
      pretty: true
    };

    return gulp.src(`${this.src}client/app/index.pug`)
        .pipe(pug(options))
        .pipe(gulp.dest(this.indexDist));
  }

  @Task('tsd')
  compileServer() {
    return gulp.src(`${this.src}**/*.ts`)
        .pipe(ts({
          noImplicitAny: true,
          'outDir': "build/es5",
          'target': "es5",
          'module': "commonjs",
          'moduleResolution': "node",
          'emitDecoratorMetadata': true,
          'experimentalDecorators': true,
          'sourceMap': true,
          'declaration': true,
          outDir: this.dist
        }))
        .pipe(gulp.dest(this.dist));
  }

  @SequenceTask('run')
  build() {
    return ['copy-source-files', 'pug', 'tsd'];
  }

}