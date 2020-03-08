var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var version = require('../package.json').version;
var pkg = require('../npm/package');
var fs = require('fs');

function modVersion() {
    var conetnt = fs.readFileSync('./src/index.js', 'utf8');
    conetnt = conetnt.replace('__VERSION__', version);
    fs.writeFileSync('./npm/index.js', conetnt, 'utf8', err => {
        if (err) throw err;
    });
    pkg.version = version;
    fs.writeFileSync(
        './npm/package.json',
        JSON.stringify(pkg, null, 4),
        'utf8'
    );
}

function main() {
    modVersion();
    gulp.src('npm/index.js')
        .pipe(uglify())
        .pipe(gulp.dest('npm'))
        .pipe(
            rename(function(path) {
                path.basename = `copyutil.${version}.min`;
                return path;
            })
        )
        .pipe(gulp.dest('cdn'))
        .pipe(
            rename(function(path) {
                path.basename = `copyutil.latest.min`;
                return path;
            })
        )
        .pipe(gulp.dest('cdn'));

    gulp.src(['src/index.d.ts', 'README.md', 'LICENSE']).pipe(gulp.dest('npm'));
}

main();
