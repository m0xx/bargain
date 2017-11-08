const Store = require('./store');

class InMemoryStore extends Store {
    constructor(dbLocation) {
        super();

        this._store = {};
    }
    get(key) {
        return Promise.resolve(this._store[key] || null);
    }
    put(key, value) {
        this._store[key] = value;

        return Promise.resolve();
    }
}

module.exports = InMemoryStore;
