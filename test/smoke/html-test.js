const path = require('path');
const glob = require('glob-all');

describe('Checking generated html files', () => {
    it('Should generate html files', (done) => {
        const files = glob.sync([
            path.resolve(process.cwd(), 'test/smoke/template/dist/index.html'),
            path.resolve(process.cwd(), 'test/smoke/template/dist/search.html'),
        ]);
        if (files.length > 0) {
            console.log(`generate ${files.length} html`);
            done();
        } else {
            throw new Error('no html files generatesd');
        }
    });
});
