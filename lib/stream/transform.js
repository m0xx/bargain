const { Transform } = require('stream');

class TransformStream extends Transform {
    constructor({ transform, objectMode }) {
        super({objectMode });

        this._map = transform;
    }
    _transform(chunk, encoding, callback) {
        try {
            this.push(this._map(chunk));
            callback();
        }
        catch(err) {
            callback(err);
        }
    }
}

module.exports = TransformStream;
