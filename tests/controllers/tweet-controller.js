import TweetController, {
  getTweet,
} from "../../src/controllers/tweet-controller.js";
import { mockRequest, mockResponse } from "../mocker.js";

jest.mock("../../src/services/tweet-service.js");

test("should return tweets", async () => {
  const req = mockRequest;
  const res = mockResponse;

  const response = [
    {
      content: "Tweet 1",
    },
    {
      content: "Tweet 1",
    },
  ];

  TweetService.prototype.get.mockReturnValue(response);
  await getTweet(req, res);
  expect(res.json).toHaveBeenCalledWith({
    success: true,
    data: response,
    message: "Successfully fetched tweets",
    err: {},
  });
});
