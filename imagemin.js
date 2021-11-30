const imagemin = require('imagemin-keep-folder');
const imageminJpeg = require('imagemin-jpeg-recompress');
const imageminPng = require('imagemin-pngquant');
const imageminSvg = require('imagemin-svgo');
const imageminGif = require("imagemin-gifsicle");

imagemin(['src/images/**/*.*'], {
    plugins: [
        imageminJpeg({
            progressive: true,
            max: 90,
            min: 80
        }),
        imageminPng({
            quality: [0.7, 0.9],
            strip: true,
        }),
        imageminSvg({
            removeViewBox: true,
            removeXMLProcInst: true,
            removeTitle: true,
            removeDesc: true,
            removeUselessDefs: true,
            convertTransform: true,
            collapseGroups: true,
            cleanupIDs: true,
            removeUnusedNS: true,
        }),
        imageminGif({
            interlaced: true
        })
    ],
    replaceOutputDir: output => {
        return output.replace(/src\/images\//, 'build/images/')
    },
});