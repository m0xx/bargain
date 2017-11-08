const test = require('tape');
const { Readable } = require('stream');

const FilterStream = require('./filter');

test('should create stream', t => {
    const stream = new FilterStream({ predicate: () => true });

    t.ok(stream);
    t.ok(stream.on);
    t.end();
});

test('should filter item', t => {
    const predicate = content => {
        return content.toString().indexOf('a') === 0;
    };

    const inStream = new Readable();
    const stream = inStream.pipe(new FilterStream({ predicate }));

    inStream.push('abc');
    inStream.push('abcde');
    inStream.push('abcdefg');
    inStream.push('bcdefg');
    inStream.push(null);

    const items = [];
    stream.on('data', function(content) {
        items.push(content);
    });

    stream.on('end', function() {
        t.equal(items.length, 3);
        t.deepEqual(items.map(content => content.toString()), [
            'abc',
            'abcde',
            'abcdefg'
        ]);

        t.end();
    });
});
