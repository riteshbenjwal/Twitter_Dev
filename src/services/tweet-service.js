const TweetRepository = require("../repository/index");

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
  }

  create(data) {
    const content = data.content;
    const tags = content
      .match(/#[a-zA-Z0-9_]+/g)
      .map((tag) => tag.substring(1).toLowerCase());
    const tweet = this.tweetRepository.create(data);
    return tweet;
  }
}

module.exports = TweetService;
