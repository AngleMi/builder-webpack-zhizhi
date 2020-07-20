const assert = require('assert');

describe('webpack.base.js test case', () => {
    const baseConfig = require('../../lib/webpack.base.js');
    console.log(baseConfig);
    it('entry', () => {
        assert.equal(baseConfig.entry.index, '/Users/tal/Desktop/geektime-webpack-learning/my-project/builder-webpack/test/template/src/index/index.js');
        assert.equal(baseConfig.entry.search, '/Users/tal/Desktop/geektime-webpack-learning/my-project/builder-webpack/test/template/src/search/index.js');
    });
});
