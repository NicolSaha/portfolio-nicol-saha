module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
        defaultLineHeights: true,
        standardFontWeights: true
    },
    purge: {
        enabled: true,
        content: [
            './assets/styles/*.html',
            './assets/js/*.js'
        ],
},
    theme: {
        extend: {
            colors: {
            }
        }
    },
    variants: {},
    plugins: []
};
