const gulp = require('gulp');
const prefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rev = require('gulp-rev');

const sassOpts = {
    sourceComments: 'none',

}

gulp.task('sass', function () {
    return gulp.src('./_sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(sassOpts).on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('min', function () {
    return gulp.src('./css/main.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./css/'));
});

gulp.task('rev', function () {
    return gulp.src('./css/main.css')
        .pipe(rev())
        .pipe(gulp.dest('./css'))
        .pipe(rev.manifest({
            merge: true,
            path: 'rev_manifest.json'
        }))
        .pipe(gulp.dest('_data/'))

});


gulp.task('min-a-rev', function () {
    return gulp.src('./css/main-4ed922575d.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function () {
    gulp.watch('./_sass/**/*.scss', ['sass']);
});

gulp.task('build', ['sass', 'min', 'rev'])
