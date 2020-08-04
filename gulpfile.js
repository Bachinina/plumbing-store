"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var del = require("del");
var run = require("run-sequence");

gulp.task("style", function () {
  gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("style-css", function () {
  gulp.src("source/css/*.css")
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", function () {
  return gulp.src([
    "source/*.html"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("copy", function () {
  return gulp.src([
    "source/img/**",
    "source/js/**",
    "source/*.html"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", ["style"]).on("change", server.reload);
  gulp.watch("source/*.html", ["html"]).on("change", server.reload);
  gulp.watch("source/*.html", ["html"]).on("add", server.reload);
  gulp.watch("source/img/*.{img, png}", ["copy"]).on("change", server.reload);
  gulp.watch("source/img/*.{img, png}", ["copy"]).on("add", server.reload);
  gulp.watch("source/js/*.js", ["copy"]).on("change", server.reload);
  gulp.watch("source/css/*.css", ["style-css"]).on("change", server.reload);
});

gulp.task("build", function (done) {
  run(
    "clean",
    "style",
    "style-css",
    "copy",
    done
  );
});
