const { Transform } = require('stream');

class MergeStream extends Transform {
    constructor({ streams, objectMode }) {
        super({ objectMode });

        this.setMaxListeners(0);

        let endCount = 0;
        streams.forEach(stream => {
            stream.pipe(this, { end: false });

            stream.on('end', () => {
                endCount++;

                if (endCount === streams.length) {
                    this.emit('end');
                }
            });
        });
    }
    _transform(chunk, encoding, callback) {
        this.push(chunk);
        callback();
    }
}

module.exports = MergeStream;
