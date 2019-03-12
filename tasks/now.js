"use strict";

function isDev(env) {
  return env !== "production" && env !== "staging";
}

module.exports = function(grunt) {
  grunt.registerTask("nowjson", "Build now.json file", function() {
    const options = this.options({
      ci: false,
      input: "now.json",
      output: "./public/now.json",
      prod_alias: process.env.NOW_PROD_ALIAS,
      stage_alias: process.env.NOW_STAGE_ALIAS,
      env: process.env.NODE_ENV
    });

    if (options.ci) {
      if (!options.prod_alias) {
        grunt.fail.fatal("prod_alias must be set for all CI builds");
      }

      options.prod_alias = options.prod_alias.split(",");

      if (options.stage_alias) {
        options.stage_alias = options.stage_alias.split(",");
      } else {
        options.stage_alias = [];
      }

      const nowTemplate = grunt.file.readJSON(options.input);

      if (
        isDev(options.env) &&
        (options.prod_alias.includes(nowTemplate.alias) ||
          options.stage_alias.includes(nowTemplate.alias))
      ) {
        grunt.fail.fatal(
          "now.json file is trying to deploy non-development domain to development environment"
        );
      }

      if (!isDev(options.env) && nowTemplate.alias) {
        grunt.fail.fatal(
          "alias can not be set in now.json in non-development environment"
        );
      }

      if (options.env === "staging" && options.stage_alias.length > 0) {
        nowTemplate.alias = option.stage_alias;
      }

      if (process.env.NODE_ENV === "production") {
        nowTemplate.alias = options.prod_alias;
      }

      grunt.file.write(options.output, JSON.stringify(nowTemplate, null, " "));
    } else {
      grunt.log.write("Skipping now.json copying in non-CI environment");
    }
  });
};
