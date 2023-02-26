import TweetService from "../services/tweet-service.js";

const tweetService = new TweetService();

import upload from "../config/file-upload-s3-config.js";
const singleUploader = upload.single("image");

export const createTweet = async (req, res) => {
  try {
    singleUploader(req, res, async function (err) {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Internal server error",
          data: {},
          err: err,
        });
      }
      const payload = { ...req.body };
      payload.image = req.file.location;
      const response = await tweetService.create(payload);
      return res.status(201).json({
        success: true,
        message: "Tweet created successfully",
        data: response,
        err: {},
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {},
      err: error,
    });
  }
};

export const getTweet = async (req, res) => {
  try {
    const response = await tweetService.get(req.params.id);
    return res.status(201).json({
      success: true,
      message: "Tweet fetched successfully",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: {},
      err: error,
    });
  }
};
