const { Transform } = require('stream');
const FeedParser = require('feedparser');

class Feed extends Transform {
    constructor() {
        super({objectMode: true});
    }
    handleFeedParserError(err) {
        console.log('Parse error', err);
    }
    handleFeedParserReadable(feedParser) {
        var item;

        while ((item = feedParser.read())) {
            this.push(item);
        }
    }
    _transform(chunk, encoding, callback) {
        const feedParser = new FeedParser();

        feedParser.on('error', this.handleFeedParserError.bind(this));
        feedParser.on('readable', this.handleFeedParserReadable.bind(this, feedParser));

        feedParser.write(chunk);
        callback();
    }
}

module.exports = Feed;
