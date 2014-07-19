
module.exports  = function(grunt) {

	// ===========================================================================
	// CONFIGURE GRUNT ===========================================================
  	// ===========================================================================
	grunt.initConfig({
 		pkg: grunt.file.readJSON('package.json'),
 		banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',

		// configure jshint to validate js files
		jshint: {
      		options: {
        		reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      		},
	  		// when this task is run, lint the Gruntfile and all js files in src
      		build: ['Gruntfile.js', 'src/**/*.js']
    	},

	    requirejs: {
	      	compile: {
	      		options: {
	      			baseUrl: "src/js",
	      			mainConfigFile: 'src/js/main.js',
	      			name: "main",
	      			include: 'lib/almond',
	      			out: 'dist/js/main.min.js'
	      		}
	      	}
	    },

		// compile less stylesheets to css -----------------------------------------
	    less: {
	      build: {
	        files: {
	          'src/css/main.css': 'src/css/less/main.less'
	        }
	      }
	    },


    	// configure cssmin to minify css files ------------------------------------
    	cssmin: {
    		// options: {
    		// 	banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
    		// },
    		build: {
    			files: {
    				'dist/css/bootstrap.min.css': 'src/css/bootstrap.css',
    				'dist/css/main.min.css': 'src/css/main.css',
    				'dist/css/icomoon.min.css': 'src/css/icomoon.css',
    				'dist/css/animate-custom.min.css': 'src/css/animate-custom.css'
    			}
    		}
    	},

		// configure watch to auto update ------------------------------------------
		watch: {
		    // for stylesheets, watch css and less files
		    // only run less and cssmin
		    stylesheets: {
		    	files: ['src/**/*.css', 'src/**/*.less'],
		      	tasks: ['less', 'cssmin']
		    },

		    // for scripts, run jshint and uglify
		    scripts: {
		    	files: 'src/**/*.js',
		    	tasks: ['jshint', 'requirejs']
		    }
	  	}
	});
	
  	// ===========================================================================
  	// LOAD GRUNT PLUGINS ========================================================
	// ===========================================================================
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint','requirejs','less','cssmin']);
};