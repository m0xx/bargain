const { Transform } = require('stream');

class FilterStream extends Transform {
    constructor({ predicate }) {
        super({objectMode: true});

        this._predicate = predicate;
    }
    _transform(chunk, encoding, callback) {
        try {
            if(this._predicate(chunk)) {
                this.push(chunk);
            }

            callback();
        }
        catch(err) {
            callback(err);
        }
    }
}

module.exports = FilterStream;
