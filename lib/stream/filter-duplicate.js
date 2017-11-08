const { Transform } = require('stream');

class FilterDuplicateStream extends Transform {
    constructor({ store, getKey }) {
        super({objectMode: true});

        this._store = store;
        this._getKey = getKey;
    }
    _transform(chunk, encoding, callback) {
        const key = this._getKey(chunk);

        if(key === undefined) {
            return callback('Invalid key')
        }

        this._store
            .get(key)
            .then(value => {
                if (value !== null) {
                    throw 'item_exists';
                }

                return this._store.put(key, JSON.stringify(chunk));
            })
            .then(() => {
                this.push(chunk);
                callback();
            })
            .catch(err => {
                if (err !== 'item_exists') {
                    return callback(err);
                }

                return callback();
            });
    }
}

module.exports = FilterDuplicateStream;
