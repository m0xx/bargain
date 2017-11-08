const path = require('path');

function getFixturePath(file) {
    return path.join(__dirname, 'fixtures', file);
}

module.exports = {
    getFixturePath
}