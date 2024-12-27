const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(
            __dirname,
            '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
        ),
        ...createGlobPatternsForDependencies(__dirname),
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    corePlugins: {
        preflight: false,
    },
    plugins: [nextui()],
};