var gulp = require("gulp"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify");

gulp.task("minify", function() {
	gulp.src("src/tinyrequire.js")
		.pipe(uglify())
		.pipe(rename("tinyrequire.min.js"))
		.pipe(gulp.dest("src/"));
});