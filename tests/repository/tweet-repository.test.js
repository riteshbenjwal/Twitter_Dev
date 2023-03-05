import TweetRepository from "../../src/repository/tweet-repository";
import Tweet from "../../src/models/tweet.js";

jest.mock("../../src/models/tweet.js");

describe("Tweet Repository", () => {
  test("Create tweet tests", async () => {
    const data = {
      content: "Hello World",
    };
    const spy = jest.spyOn(Tweet, "create").mockImplementation(() => {
      return { ...data, createdAt: new Date(), updatedAt: new Date() };
    });
    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.create(data);
    expect(spy).toHaveBeenCalled();
    expect(tweet.content).toBe(data.content);
    expect(tweet.createdAt).toBeDefined();
  });

  test("should not create a tweet and throw exception", async () => {
    const spy = jest.spyOn(Tweet, "create").mockImplementation(() => {
      throw new Error("something went wrong");
    });
    const tweetRepository = new TweetRepository();
    const tweet = await tweetRepository.create({}).catch((err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe("something went wrong");
    });
  });
});

describe("Get all tweet tests", () => {
  test("testing limit for get all", async () => {
    const data = {
      content: "Testing tweet",
    };
    const tweetsArray = [
      { ...data, createdAt: new Date(), updatedAt: new Date() },
      { ...data, createdAt: new Date(), updatedAt: new Date() },
    ];

    const findResponse = {
      tweetsArray,
    };
    findResponse.limit = jest.fn((limit) =>
      findResponse.tweetsArray.slice(0, limit)
    );
    findResponse.skip = jest.fn((offset) => findResponse);

    const spy = jest.spyOn(Tweet, "find").mockImplementation(() => {
      return findResponse;
    });
    const tweetRepository = new TweetRepository();
    const tweets = await tweetRepository.getAll(0, 2);
    expect(spy).toHaveBeenCalled();
    expect(tweets).toHaveLength(2);
  });
});
