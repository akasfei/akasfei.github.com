/* jshint node: true */

module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    target: 'dist',
    banner: '/**\n' +
              '* <%= pkg.name %> v<%= pkg.version %>\n' +
              '* Web-Essentials development package by <%= pkg.author %>\n' +
              '*/\n',
    jqueryCheck: 'if (!jQuery) { throw new Error(\"jQuery is required\") }\n\n',

    assemble: {
      // Task-level options
      options: {
        prettify: {indent: 2},
        marked: {sanitize: false},
        production: grunt.file.readJSON('package.json').production,
        data: '_data/*.{json,yml}',
        layout: '_layouts/index.html',
        partials: ['_includes/*.html'],
      },
      site: {
        src: '_includes/index.html', 
        dest: './index.html'
      }
    },

    jshint: {
      options: {
        jshintrc: 'js/.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      src: {
        src: ['js/application.js', 'js/app-*.js']
      }
    },

    concat: {
      options: {
        banner: '<%= banner %><%= jqueryCheck %>',
        stripBanners: false
      },
      application: {
        src: [
          'js/app-*.js'
        ],
        dest: 'js/application-all.js'
      }
    },

    uglify: {
      application: {
        files: {
          'js/application.min.js': 'js/application.js',
          'js/application-all.min.js': 'js/application-all.js'
        }
      }
    },

    less: {
      options: {
        compile: true
      },
      style: {
        files: {
          'css/style.css' : 'less/style.less'
        }
      },
      style_min: {
        options: {
          yuicompress: true
        },
        files: {
          'css/style.min.css' : 'less/style.less'
        }
      }
    },

    watch: {
      src: {
        files: '<%= jshint.src.src %>',
        tasks: ['jshint:src', 'concat', 'uglify']
      },
      less: {
        files: ['less/*.less'],
        tasks: ['less']
      }
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('build', ['less', 'concat', 'uglify']);

  grunt.registerTask('default', ['jshint', 'build', 'assemble']);

  grunt.registerTask('dev', ['default', 'watch']);

  grunt.registerTask('test', ['default']); // Add other framework tasks when they are available
};