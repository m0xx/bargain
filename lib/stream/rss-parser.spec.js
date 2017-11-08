const test = require('tape');
const fs = require('fs');

const { getFixturePath } = require('./../../test/utils');

const RssParserStream = require('./rss-parser');

test('should create stream', t => {
    const stream = new RssParserStream({ transform: content => content });

    t.ok(stream);
    t.ok(stream.on);
    t.end();
});


test('should return parsed rss items', (t) => {
    const stream = fs.createReadStream(getFixturePath('rss.xml')).pipe(new RssParserStream());

    const items = [];
    stream.on('data', function(item) {
        items.push(item);
    });

    stream.on('end', function() {
        t.equals(items.length, 4)
        t.equals(items[0].title, 'Star City')
        t.end();
    });
})
