const test = require('tape');
const { Readable } = require('stream');

const MergeStream = require('./merge');

test('should create stream', t => {
    const stream = new MergeStream({ streams: [], objectMode: false });

    t.ok(stream);
    t.ok(stream.on);
    t.end();
});

test('should merge multiple streams', t => {
    const inStream1 = new Readable();
    const inStream2 = new Readable();

    const mergeStream = new MergeStream({
        objectMode: false,
        streams: [inStream1, inStream2]
    });

    inStream1.push('abc-1');
    inStream1.push(null);

    inStream2.push('abc-2');
    inStream2.push(null);

    const items = [];
    mergeStream.on('data', content => {
        items.push(content);
    });

    mergeStream.on('end', () => {
        t.deepEquals(['abc-1', 'abc-2'], items.map((item) => (item.toString())));
        t.end();
    })
});