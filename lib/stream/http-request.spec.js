const test = require('tape');
const { Readable } = require('stream');
const nock = require('nock');

const HttpRequestStream = require('./http-request');

test('should create stream', t => {

    var scope = nock('http://example.com')
        .get('/')
        .reply(200, {});

    const stream = new HttpRequestStream({url: "http://example.com/"});

    t.ok(stream);
    t.ok(stream.on);

    t.end();
});


test('should stream response', t => {
    var scope = nock('http://example.com')
        .get('/')
        .reply(200, "Hello");

    const stream = new HttpRequestStream({url: "http://example.com/"});

    stream.on('data', (chunk) => {
        console.log(chunk.toString(), stream.eventNames(),  stream.listenerCount('data'))
        t.ok(stream);
        t.ok(stream.on);
    })

    t.end();
});