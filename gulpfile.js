/* 调用node 模块儿*/
let gulp = require('gulp'),
  sass = require('gulp-sass'),
  assem = require('./assem.js'),
  sourcemaps = require('gulp-sourcemaps');

let config = {
  sassDir: 'sass', //sass文件所在根目录
  link: 'link',
  output: 'style', //总文件入口
  /* 模块儿所在目录 */
  dirs: [
    'module',
    'public',
  ]
};
let { sassDir, link, output, dirs } = config;


gulp.task('assem', assem(config));
gulp.task('sass', () => {
  gulp.src([`./${sassDir}/${output}/*.scss`,
      '!./${sassDir}/${output}/*.css'
    ])
    .pipe(sourcemaps.init())
    .pipe(sass()
      .on('error', sass.logError))
    .pipe(sourcemaps.write(`.`))
    .pipe(gulp.dest(`./${sassDir}/${output}`));
});

gulp.task('watch', () => {
  gulp.watch(`${sassDir}/**/*.scss`, ['assem', 'sass'],
    (event) => {
      console.log('File ' +
        event.path +
        ' was ' +
        event.type +
        ', running tasks...'
      );
    });
});
gulp.task('default', ['assem', 'watch']);
