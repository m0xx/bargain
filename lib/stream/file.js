const fs = require('fs');
const { Transform } = require('stream');

class FileStream extends Transform {
    constructor({ file }) {
        super();

        this._file = file;

        const stream = fs.createReadStream(this._file);
        stream.pipe(this);
    }
    _transform(chunk, encoding, callback) {
        this.push(chunk);
        callback();
    }
}

module.exports = FileStream;
