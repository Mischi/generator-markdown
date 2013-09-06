module.exports = function(grunt) {

    var mdFiles = ['**/*.md', '!node_modules/**/*.md'];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        markdown: {
            all: {
                files: [
                    {
                        expand: true,
                        src: mdFiles,
                        dest: 'html/',
                        ext: '.html'
                    }
                ]
            }
        },

        open: {
            default: {
                path: 'html/<%= defaultHtmlFile %>'
            }
        },

        watch: {
            markdown: {
                files: mdFiles,
                tasks: ['markdown'],
            },
            livereload: {
                options: { livereload: true },
                files: ['html/**/*']
            }
        }
    });

    grunt.loadNpmTasks('grunt-markdown');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['markdown']);
    grunt.registerTask('dev', ['markdown', 'open', 'watch']);
};
