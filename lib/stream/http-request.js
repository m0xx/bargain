const request = require('request');
const { Readable, Transform } = require('stream');

class HttpRequestStream extends Transform {
    constructor({ url}) {
        super();

        this._url = url;

        const createRequest = this.createRequest.bind(this);

        createRequest();
    }
    createRequest() {
        const req = request(this._url);
        const self = this;

        req.on('error', function(error) {
            console.log(error);
        });

        req.on('response', function(res) {
            if (res.statusCode !== 200) {
                req.emit('error', new Error('Bad status code'));
            } else {
                req.pipe(self, { end: false });
            }
        });

        req.on('end', () => {
            req.destroy();
            this.end();
        })
    }
    _transform(chunk, encoding, callback) {
        this.push(chunk);
        callback();
    }
}

module.exports = HttpRequestStream;
