module.exports = function (config) {
    config.set({
        frameworks: ['jasmine', 'browserify'],

        files: [
            'test.js'
        ],

        preprocessors: {
            "test.js": ['browserify']
        },

        reporters: ['dots'],

        browsers: ['Chrome'],
        autoWatch: true,
        singleRun: false,

        browserify: {
            debug: true
        }
    });
};
