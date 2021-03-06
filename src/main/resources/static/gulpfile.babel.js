import gulp from 'gulp';
import less from 'gulp-less';
import gutil from 'gulp-util';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import tsify from 'tsify';

gulp.task('browserify', () => {
    return browserify({
        entries: 'source/Oauth2App.ts',
        debug: true
    })
    .plugin(tsify, {
        target: 'es5',
        experimentalDecorators: true
    })
    .bundle()
    .on('error', function(err){
        gutil.log(gutil.colors.red.bold('[browserify error]'));
        gutil.log(err.message);
        this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('less', () => {
    return gulp.src('./source/less/styles.less')
        .pipe(less())
        .on('error', function(err) {
            // Handle less errors, but do not stop watch task
            gutil.log(gutil.colors.red.bold('[Less error]'));
            gutil.log(gutil.colors.bgRed('filename:') +' '+ err.filename);
            gutil.log(gutil.colors.bgRed('lineNumber:') +' '+ err.lineNumber);
            gutil.log(gutil.colors.bgRed('extract:') +' '+ err.extract.join(' '));
            this.emit('end');
        })
        .pipe(gulp.dest('./dist/css'))
});

gulp.task('watch', () => {
    gulp.watch('./source/**/*.ts', ['browserify']);
    gulp.watch('./source/less/*.less', ['less']);
});

gulp.task('build', ['browserify', 'less']);
gulp.task('start', ['build', 'watch']);