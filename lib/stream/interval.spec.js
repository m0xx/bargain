const test = require('tape');
const { Readable } = require('stream');

const IntervalStream = require('./interval');

test('should create stream', t => {
    const createStream = () => {
        return new Readable({
            read(size) {
                this.push(null);
            }
        });
    };

    const stream = new IntervalStream({ createStream, interval: 5000 });

    stream.stop();
    t.ok(stream);
    t.ok(stream.on);

    t.end();
});

test('should create stream on each interval', t => {
    t.timeoutAfter(250);
    let count = 0;
    const createStream = () => {
        count++;
        return new Readable({
            read(size) {
                this.push(null);
            }
        });
    };

    const stream = new IntervalStream({ createStream, interval: 1 });

    setTimeout(() => {
        stream.stop();
        stream.end();
        t.ok(count > 1);
        t.end();
    }, 20);
});
