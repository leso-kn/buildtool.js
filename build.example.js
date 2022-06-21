/*
 *  Example buildtool.js configuration
 */

const { tasks, log, debug } = require('./buildtool');
const fs = require('fs');

let sass = require('sass');

tasks
({
    // SCSS
    'hash:src/(**).scss': [ 'dist/$1.css', async (src, dest) =>
    {
        log('scss', dest);

        fs.writeFileSync(dest,
            sass.renderSync(
            {
                file: src,
                outFile: dest,
                sourceMap: debug,
                sourceMapEmbed: true
            }).css);
    }],
});
