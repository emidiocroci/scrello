module.exports = function(config){
    config.set({
    basePath : '../../',

    files : [
      'js/lib/angular/angular.js',
      'js/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'js/**/*.js',
      'test/unit/**/*.js'
    ],

    exclude : [
      'js/lib/angular/angular-loader.js',
      'js/lib/angular/*.min.js',
      'js/lib/angular/angular-scenario.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
