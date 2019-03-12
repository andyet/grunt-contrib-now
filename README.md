@andyet/grunt-contrib-now

This is the grunt plugin for &yet's ziet/now builds
It copies over the now.json from the project root into the build
directory and does some cursory checking of the alias(es) to prevent
clobbering of production domains in staging/development.  Because of
this it only copies the file over if CI is set to true, where we can be
at least a little more sure we have things set properly every time.

Mostly what this file does now is adds production and staging aliases to
the now.json file. It can do more in the future if we want.


## usage

Load:
```javascript
grunt.loadNpmTasks('@andyet/grunt-contrib-now');
```

Configure:
```javascript
grunt.initConfig({
  nowjson: {
    options: {
      ci: (process.env.DRONE === 'true')
    }
  }
});
```

This plugin is now available as `nowjson`. To add it to an existing
build for example:

```javascript
grunt.registerTask('build' [
  'clean',
  'browserify',
  'nowjson'
]);
```


### Options

- `ci`: Indicates CI environments. Defaults to `false`.
- `input`: Location of the input now.json file. Defaults to `now.json`.
- `output`: Location of the output now.json file. Defaults to `./public/now.json`
- `prod_alias`: Production alias (aka domain). Must be set. If more than one, comma separate them.
- `stage_alias`: Optional Staging alias (aka domain).
- `env`: Build environment, for example `production` or `staging`.  Defaults to `NODE_ENV` from the local environment.
