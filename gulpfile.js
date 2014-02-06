var gulp = require("gulp"),
	uglify = require("gulp-uglify");

gulp.task("minify", function() {
	gulp.src("src/tinyrequire.js")
		.pipe(uglify())
		.pipe(gulp.dest("src/tinyrequire.min.js"));
});