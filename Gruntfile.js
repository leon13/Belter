module.exports = function(grunt){
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */'
			},
			build: {
				files: {
					'app/static/build/css/<%= pkg.name %>.css': ['app/static/scss/styles.scss']
				},
				options: {
					trace: false,
					style: 'compressed',
					noCache: true
				}
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			build: {
				files: {
					'app/static/build/js/<%= pkg.name %>.js': [
						'app/static/js/core.js', 'app/static/js/core.*.js'
					],
					'app/static/build/js/<%= pkg.name %>.third-party.js': [
						'app/static/js/third-party/**/*.js',
					]
				}
			}
		},

		copy: {
			build: {
				files: [
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [
							'app/static/js/uncompiled/*',
							'!app/static/js/uncompiled/modernizr-dev.js'
						],
						dest: 'app/static/build/js/'
					},
					{
						expand: true,
						flatten: true,
						filter: 'isFile',
						src: [
							'app/static/fonts/**/*',
						],
						dest: 'app/static/build/fonts/'
					},
				]
			}
		},

		modernizr: {
				"devFile" : "app/static/js/third-party/uncompiled/modernizr-dev.js",
				"outputFile" : "app/static/build/js/modernizr-custom.js",
				"extra" : [
					"setClasses",
					"addTest",
					"html5printshiv",
					"load",
					"testProp",
					"fnBind"
				],
				"uglify" : true,
				"tests" : [],
				"crawl" : true,
				"files" : [
					"**/*.{js,css,scss}",
					"!node_modules/**/*",
					"!{Gruntfile,grunt}.js"
				],
				"customTests" : []
		},

		watch: {
			js: {
				files: ['app/static/js/**/*.js'],
				tasks: ['uglify']
			},
			css: {
				files: ['app/static/scss/**/*.scss'],
				tasks: ['sass'],
				options: {
					livereload: true,
					// <script src="//localhost:35729/livereload.js"></script>
				},
			},
			copy: {
				files: [
					'app/static/js/uncompiled/*',
					'!app/static/js/uncompiled/modernizr-dev.js'
				],
				tasks: ['copy'],
				options: {
					event: ['added', 'changed'],
				}
			},
		}
	});

	grunt.loadNpmTasks("grunt-modernizr");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks('grunt-notify');
	grunt.registerTask('default', []);
};