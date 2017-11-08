const test = require('tape');
const { Readable } = require('stream');

const TransformStream = require('./transform');

test('should create stream', t => {
    const stream = new TransformStream({ transform: content => content });

    t.ok(stream);
    t.ok(stream.on);
    t.end();
});

test('should transform Buffer item', t => {
    const inStream = new Readable();
    const transformStream = new TransformStream({
        objectMode: false,
        transform(content) {
            return Buffer.from(content.toString().toUpperCase());
        }
    });

    inStream.pipe(transformStream);

    inStream.push('abc');
    inStream.push(null);

    transformStream.on('data', content => {
        t.equal('ABC', content.toString());
        t.end();
    });
});

test('should transform Object item', t => {
    const inStream = new Readable({objectMode: true});
    const transformStream = new TransformStream({
        objectMode: true,
        transform(content) {
            return {
                count: content.count + 1
            }
        }
    });

    inStream.pipe(transformStream);

    inStream.push({count: 0});
    inStream.push(null);

    transformStream.on('data', content => {
        t.equal(1, content.count);
        t.end();
    });
});