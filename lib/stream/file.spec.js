const test = require('tape');

const FileStream = require('./file');
const { getFixturePath } = require('./../../test/utils');

const filePath = getFixturePath('file.txt');

test('should create stream from file', t => {
    const stream = new FileStream({ file: filePath });

    t.ok(stream);
    t.ok(stream.on);
    t.end();
});

test('should return an input stream', t => {
    const stream = new FileStream({ file: filePath });

    stream.on('data', function(content) {
        t.ok(content);
        t.equals(content.toString(), 'Hello');
    });

    stream.on('end', function() {
        t.end();
    });
});
