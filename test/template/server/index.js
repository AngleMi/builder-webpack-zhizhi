if(typeof window === 'undefined') {
    global.window = {}
}
const fs = require('fs');
const path = require('path');
const express = require('express');
const { renderToString } = require('react-dom/server');
const SSR = require('../dist/js/search-server');
const template = fs.readFileSync(path.resolve(__dirname, '../dist/search.html'), 'utf-8')
const data = require('./data.json');

const server = (port) => {
    const app = express();
    app.use(express.static('dist'));
    app.get('/search', (req, res) => {
        const html = renderMakup(renderToString(SSR))
        res.status(200).send(html)
    });
    app.listen(port, () => {
        console.log('Server is running on port' + port)
    })
};
server(process.env.PORT || 3000);
const renderMakup = (str) => {
    const dataStr = JSON.stringify(data)
    return template.replace('<!-- HTML_PlLACEHOLDER -->', str)
.replace('<!-- INITIAL_DATA_PLACEHOLDER -->', `<script>window.__inital_data = ${dataStr}</script>`);
}