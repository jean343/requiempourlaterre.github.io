module.exports = function( grunt ){
	grunt.initConfig( {
		pkg: grunt.file.readJSON( "package.json" ),
		watch: {
			options: {
				livereload: true
			},
			jade: {
				tasks: ["jade:debug"],
				files: ["**/*.jade", "**/*.md", "!layouts/*.jade"]
			}
		},
		jade: {
			options: {
				pretty: true,
				files: {
					"*": ["**/*.jade", "!layouts/*.jade"]
				}
			},
			debug: {
				options: {
					locals: {
						livereload: true
					}
				}
			},
			publish: {
				options: {
					locals: {
						livereload: false
					}
				}
			}
		},
		web: {
			options: {
				port: 8001
			}
		}
	} );

	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-jade-tasks" );

	grunt.registerTask( "default", ["jade:debug", "web"] );
	grunt.registerTask( "publish", ["jade:publish"] );

	grunt.registerTask( "web", "Start web server...", function(){
		const options = this.options();
		const connect = require( "connect" );
		const serveStatic = require( "serve-static" );

		const app = connect();
		app.use( serveStatic( __dirname ) );
		app.listen( options.port );
		console.log( "http://localhost:%s", options.port );

		grunt.task.run( ["watch:jade"] );
	} );

};