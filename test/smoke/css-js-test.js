const path = require('path');
const glob = require('glob-all');

describe('Checking generated css js files', () => {
    it('Should generate css js files', (done) => {
        // console.log(glob.sync('../template'));
        console.log(process.cwd());
        const files = glob.sync([
            path.resolve(process.cwd(), 'test/smoke/template/dist/js/index_*.js'),
            path.resolve(process.cwd(), 'test/smoke/template/dist/css/index_*.css'),
            path.resolve(process.cwd(), 'test/smoke/template/dist/js/search_*.js'),
            path.resolve(process.cwd(), 'test/smoke/template/dist/css/search_*.css'),
            // '../template/dist/js/index_*.js',
            // '../templatedist/css/index_*.css',
            // '../templatedist/js/search_*.js',
            // '../templatedist/css/search_*.css',
        ]);
        if (files.length > 0) {
            done();
        } else {
            throw new Error('no css js files generatesdc');
        }
    });
});
