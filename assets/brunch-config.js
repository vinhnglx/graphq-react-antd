exports.config = {
  // See http://brunch.io/#documentation for docs.
  files: {
    javascripts: {
      // joinTo: 'js/app.js',
      entryPoints: {
        'js/app.js': 'js/app.js',
      },

      // To use a separate vendor.js bundle, specify two files path
      // http://brunch.io/docs/config#-files-
      // joinTo: {
      //   'js/app.js': 'js/app.js',
      //   'js/admin.js': 'js/admin.js',
      // },
      //
      // To change the order of concatenation of files, explicitly mention here
      // order: {
      //   before: [
      //     "vendor/js/jquery-2.1.1.js",
      //     "vendor/js/bootstrap.min.js"
      //   ]
      // }
    },
    stylesheets: {
      joinTo: 'css/app.css',
    },
    // templates: {
    //   joinTo: 'js/app.js'
    // }
  },

  conventions: {
    // This option sets where we should place non-css and non-js assets in.
    // By default, we set this to "/assets/static". Files in this directory
    // will be copied to `paths.public`, which is "priv/static" by default.
    assets: /^(static)/,
  },

  // Phoenix paths configuration
  paths: {
    // Dependencies and current project directories to watch
    watched: ['static', 'css', 'js', 'vendor'],
    // Where to compile files to
    public: '../priv/static',
  },

  // Configure your plugins
  plugins: {
    babel: {
      // Do not use ES6 compiler in vendor code
      presets: ['es2015', 'react', 'stage-1'],
      ignore: [/vendor/],
    },
    sass: {
      options: {
        includePaths: ['node_modules/antd/dist'], // tell sass-brunch where to look for files to @import
        precision: 8, // minimum precision required by bootstrap
      },
    },
  },

  modules: {
    autoRequire: {
      'js/app.js': ['js/app'],
    },
  },

  npm: {
    enabled: true,
  },
};