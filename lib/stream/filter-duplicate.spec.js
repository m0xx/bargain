const test = require('tape');
const { Readable } = require('stream');

const InMemoryStore = require('./../store/in-memory');
const FilterDuplicateStream = require('./filter-duplicate');

test('should create stream', t => {
    const stream = new FilterDuplicateStream({ predicate: () => true });

    t.ok(stream);
    t.ok(stream.on);
    t.end();
});

test('should filter String item', t => {
    const inStream = new Readable();
    const stream = inStream.pipe(new FilterDuplicateStream({ store: new InMemoryStore(), getKey: (content) => (content) }));

    inStream.push('abc');
    inStream.push('abcde');
    inStream.push('abcdefg');
    inStream.push('abc');
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

test('should filter Object item', t => {
    const inStream = new Readable({objectMode: true});
    const stream = inStream.pipe(new FilterDuplicateStream({ store: new InMemoryStore(), getKey: (content) => (content.id) }));

    inStream.push({id: '1', content: 'abc'});
    inStream.push({id: '2', content: 'abc'});
    inStream.push({id: '3', content: 'abc'});
    inStream.push({id: '1', content: 'abcde'});
    inStream.push(null);

    const items = [];
    stream.on('data', function(content) {
        items.push(content);
    });

    stream.on('end', function() {
        t.equal(items.length, 3);
        t.deepEqual(items, [
            {id: '1', content: 'abc'},
            {id: '2', content: 'abc'},
            {id: '3', content: 'abc'}
        ]);

        t.end();
    });
});
