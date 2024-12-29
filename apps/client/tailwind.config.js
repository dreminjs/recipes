const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(
            __dirname,
            '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
        ),

    ],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    corePlugins: {
        preflight: false,
    },
    plugins: [],
};