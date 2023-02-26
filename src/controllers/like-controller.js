import LikeService from "../services/like-service.js";

const likeService = new LikeService();

export const toggleLike = async (req, res) => {
  try {
    console.log(req.params);
    const response = await likeService.toggleLike(
      req.query.modelId,
      req.query.modelType,
      req.body.userId
    );
    res.status(200).json({
      success: true,
      data: response,
      message: "Like toggled successfully",
      err: {},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: error,
    });
  }
};
