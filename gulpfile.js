var gulp = require("gulp"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify"),
	gzip = require("gulp-gzip");

gulp.task("minify", function() {
	gulp.src("src/tinyrequire.js")
		.pipe(uglify())
		.pipe(gzip())
		.pipe(rename("tinyrequire.min.js"))
		.pipe(gulp.dest("src/"));
});