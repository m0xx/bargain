const levelup = require('levelup');
const leveldown = require('leveldown');

const Store = require('./store');

class LevelUpStore extends Store {
    constructor(dbLocation) {
        super();

        if (!dbLocation) {
            throw new Error('dbLocation must be defined.');
        }

        this._db = levelup(leveldown(dbLocation));
    }
    get(key) {
        return new Promise((resolve, reject) => {
            this._db.get(key, function(err, value) {
                if (err) {
                    if (err.type === 'NotFoundError') {
                        return resolve(null);
                    }

                    return reject(err);
                }

                return resolve(value);
            });
        });
    }
    put(key, value) {
        return new Promise((resolve, reject) => {
            this._db.put(key, value, function(err) {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }
}

module.exports = LevelUpStore;
