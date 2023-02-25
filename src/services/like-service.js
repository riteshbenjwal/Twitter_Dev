import { LikeRepository, TweetRepository } from "../repository/index.js";
import Tweet from "../models/tweet.js";

class LikeService {
  constructor() {
    this.likeRepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    console.log(modelId, modelType, userId);
    if (modelType == "Tweet") {
      console.log("Inside");
      var likeable = await this.tweetRepository.find(modelId);
      console.log("likeable", likeable);
    } else if (modelType == "Comment") {
      // TODO
    } else {
      throw new Error("unknown model type");
    }
    const exists = await this.likeRepository.findByUserAndLikeable({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });
    console.log("exists", exists);
    if (exists) {
      console.log("I am likeble", likeable);
      likeable.likes.pull(exists.id);
      await likeable.save();
      await exists.remove();
      var isAdded = false;
    } else {
      const newLike = await this.likeRepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await likeable.save();

      var isAdded = true;
    }
    return isAdded;
  }
}

export default LikeService;
