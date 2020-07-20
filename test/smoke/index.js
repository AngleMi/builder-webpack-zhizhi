const path = require('path');
const process = require('process');
const webpack = require('webpack');
const rimraf = require('rimraf');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000',
});
// console.log(process.chdir(path.join(__dirname, 'template')));

// console.log(path.resolve(__dirname));
rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod.js');
    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.log(err);
            process.exit(2);
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
        }));
        console.log('Webpack build success, begin run test');
        mocha.addFile(path.resolve(__dirname, 'html-test.js'));
        mocha.addFile(path.resolve(__dirname, 'css-js-test.js'));
        mocha.run();
    });
});
