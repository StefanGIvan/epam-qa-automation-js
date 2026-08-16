module.exports = {
    default: {
        paths: ['features/**/*.feature'],
        require: ['support/**/*.js', 'step-definitions/**/*.js'],
        format: ['progress'],
        publishQuiet: true,
    },
};
