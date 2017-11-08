const { Transform } = require('stream');

class IntervalStream extends Transform {
    constructor({ interval, createStream }) {
        super();

        this._createStream = createStream;
        this._intervalDuration = interval;

        this.createStream = this.createStream.bind(this);

        this.start();
    }
    _transform(chunk, encoding, callback) {
        this.push(chunk);
        callback();
    }
    createStream() {
        const stream = this._createStream();

        stream.on('end', () => {
            stream.unpipe(this);
        })

        stream.pipe(this);
    }
    start() {
        if(!this.isRunning()) {
            this._interval = setInterval(this.createStream, this._intervalDuration)
        }
    }
    stop() {
        if(this.isRunning()) {
            clearInterval(this._interval);
        }
    }
    isRunning() {
        return this._interval !== undefined;
    }
}

module.exports = IntervalStream;
